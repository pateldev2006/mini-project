from datetime import datetime, timezone
from hashlib import sha256
import re

import pandas as pd
import pdfplumber
from pymongo.errors import PyMongoError

from database import transactions_collection


DATE_COLUMNS = ("date", "transaction_date", "posted_date", "value_date")
DESCRIPTION_COLUMNS = ("description", "details", "narration", "merchant", "memo")
AMOUNT_COLUMNS = ("amount", "transaction_amount")
DEBIT_COLUMNS = ("debit", "withdrawal", "withdrawals", "paid_out")
CREDIT_COLUMNS = ("credit", "deposit", "deposits", "paid_in")

PDF_TRANSACTION_PATTERN = re.compile(
    r"(?P<date>\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\s+"
    r"(?P<description>.+?)\s+"
    r"(?P<amount>-?\(?[\d,]+(?:\.\d{1,2})?\)?)$"
)

CATEGORY_KEYWORDS = {
    "Food": ("restaurant", "cafe", "coffee", "swiggy", "zomato", "food", "dining"),
    "Groceries": ("grocery", "supermarket", "mart", "bigbasket", "dmart"),
    "Transport": ("uber", "ola", "taxi", "fuel", "petrol", "diesel", "metro", "bus"),
    "Shopping": ("amazon", "flipkart", "myntra", "shopping", "store", "retail"),
    "Bills": ("electricity", "water", "gas", "internet", "broadband", "mobile", "bill"),
    "Rent": ("rent", "landlord", "lease"),
    "Healthcare": ("hospital", "clinic", "pharmacy", "medical", "doctor"),
    "Entertainment": ("netflix", "spotify", "movie", "cinema", "prime", "hotstar"),
    "Salary": ("salary", "payroll", "wages"),
    "Investment": ("mutual fund", "sip", "zerodha", "groww", "stocks", "dividend"),
}
FORMULA_PREFIXES = ("=", "+", "-", "@")


class StatementParserError(Exception):
    pass


def normalize_column_name(column):
    return str(column).strip().lower().replace(" ", "_")


def sanitize_text(value, max_length=300):
    text = str(value or "").strip()
    text = re.sub(r"[\x00-\x1f\x7f]", " ", text)
    text = re.sub(r"\s+", " ", text)[:max_length]

    if text.startswith(FORMULA_PREFIXES):
        text = "'" + text

    return text


def first_existing(row, columns):
    for column in columns:
        if column in row and pd.notna(row[column]):
            value = row[column]
            if str(value).strip():
                return value
    return None


def parse_amount(value):
    if value is None or pd.isna(value):
        return None

    text = str(value).strip()
    is_negative = text.startswith("-") or (text.startswith("(") and text.endswith(")"))
    cleaned = re.sub(r"[^\d.]", "", text)

    if not cleaned:
        return None

    amount = round(float(cleaned), 2)
    return -amount if is_negative else amount


def parse_date(value):
    if isinstance(value, datetime):
        parsed = value
    else:
        parsed = pd.to_datetime(value, errors="coerce", dayfirst=False)

    if pd.isna(parsed):
        parsed = pd.to_datetime(value, errors="coerce", dayfirst=True)

    if pd.isna(parsed):
        raise ValueError("Invalid transaction date")

    parsed = parsed.to_pydatetime() if hasattr(parsed, "to_pydatetime") else parsed

    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)

    return parsed.astimezone(timezone.utc)


def categorize_transaction(description):
    text = str(description or "").lower()

    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(keyword in text for keyword in keywords):
            return category

    return "Income" if any(word in text for word in ("credit", "deposit")) else "Other"


def build_source_hash(user_id, transaction):
    hash_input = "|".join(
        [
            str(user_id),
            transaction["date"].date().isoformat(),
            transaction["description"].lower(),
            f"{transaction['amount']:.2f}",
            transaction["type"],
        ]
    )
    return sha256(hash_input.encode("utf-8")).hexdigest()


def normalize_transaction(raw_transaction, user_id=None):
    amount = parse_amount(raw_transaction.get("amount"))

    if amount is None:
        debit = parse_amount(raw_transaction.get("debit"))
        credit = parse_amount(raw_transaction.get("credit"))

        if debit:
            amount = -abs(debit)
        elif credit:
            amount = abs(credit)

    if amount is None or amount == 0:
        raise ValueError("Transaction amount is required")

    description = sanitize_text(raw_transaction.get("description"))
    if not description:
        raise ValueError("Transaction description is required")

    transaction_type = "income" if amount > 0 else "expense"
    normalized = {
        "description": description,
        "amount": round(abs(amount), 2),
        "category": sanitize_text(
            raw_transaction.get("category") or categorize_transaction(description),
            max_length=100,
        ),
        "date": parse_date(raw_transaction.get("date")),
        "type": transaction_type,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }

    if user_id is not None:
        normalized["user_id"] = user_id
        normalized["source_hash"] = build_source_hash(user_id, normalized)

    return normalized


def parse_csv_statement(file_path, user_id=None):
    try:
        dataframe = pd.read_csv(file_path)
    except Exception as exc:
        raise StatementParserError("Unable to parse CSV statement") from exc

    dataframe.columns = [normalize_column_name(column) for column in dataframe.columns]
    transactions = []
    errors = []

    for index, row in dataframe.iterrows():
        row_data = row.to_dict()
        raw_transaction = {
            "date": first_existing(row_data, DATE_COLUMNS),
            "description": first_existing(row_data, DESCRIPTION_COLUMNS),
            "amount": first_existing(row_data, AMOUNT_COLUMNS),
            "debit": first_existing(row_data, DEBIT_COLUMNS),
            "credit": first_existing(row_data, CREDIT_COLUMNS),
        }

        try:
            transactions.append(normalize_transaction(raw_transaction, user_id=user_id))
        except (ValueError, TypeError) as exc:
            errors.append({"row": int(index) + 2, "error": str(exc)})

    return {"transactions": transactions, "errors": errors}


def parse_pdf_statement(file_path, user_id=None):
    transactions = []
    errors = []

    try:
        with pdfplumber.open(file_path) as pdf:
            for page_number, page in enumerate(pdf.pages, start=1):
                text = page.extract_text() or ""

                for line_number, line in enumerate(text.splitlines(), start=1):
                    match = PDF_TRANSACTION_PATTERN.search(line.strip())
                    if not match:
                        continue

                    raw_transaction = match.groupdict()

                    try:
                        transactions.append(
                            normalize_transaction(raw_transaction, user_id=user_id)
                        )
                    except (ValueError, TypeError) as exc:
                        errors.append(
                            {
                                "page": page_number,
                                "line": line_number,
                                "error": str(exc),
                            }
                        )
    except Exception as exc:
        raise StatementParserError("Unable to parse PDF statement") from exc

    return {"transactions": transactions, "errors": errors}


def detect_duplicates(transactions, user_id):
    source_hashes = [
        transaction.get("source_hash") or build_source_hash(user_id, transaction)
        for transaction in transactions
    ]
    existing_hashes = set()

    if source_hashes:
        cursor = transactions_collection.find(
            {"user_id": user_id, "source_hash": {"$in": source_hashes}},
            {"source_hash": 1},
        )
        existing_hashes = {item["source_hash"] for item in cursor}

    unique_transactions = []
    duplicates = []

    for transaction in transactions:
        source_hash = transaction.get("source_hash") or build_source_hash(
            user_id,
            transaction,
        )
        transaction["user_id"] = user_id
        transaction["source_hash"] = source_hash

        if source_hash in existing_hashes:
            duplicates.append(transaction)
        else:
            unique_transactions.append(transaction)

    return {"unique": unique_transactions, "duplicates": duplicates}


def insert_transactions(transactions, user_id, skip_duplicates=True):
    if not transactions:
        return {"inserted_count": 0, "inserted_ids": [], "duplicates": []}

    try:
        prepared = []
        for transaction in transactions:
            normalized = dict(transaction)
            normalized["user_id"] = user_id
            normalized["source_hash"] = normalized.get("source_hash") or build_source_hash(
                user_id,
                normalized,
            )
            prepared.append(normalized)

        duplicates = []
        if skip_duplicates:
            duplicate_result = detect_duplicates(prepared, user_id)
            prepared = duplicate_result["unique"]
            duplicates = duplicate_result["duplicates"]

        if not prepared:
            return {"inserted_count": 0, "inserted_ids": [], "duplicates": duplicates}

        result = transactions_collection.insert_many(prepared, ordered=False)
        return {
            "inserted_count": len(result.inserted_ids),
            "inserted_ids": [str(inserted_id) for inserted_id in result.inserted_ids],
            "duplicates": duplicates,
        }
    except PyMongoError as exc:
        raise StatementParserError("Unable to insert statement transactions") from exc


def parse_statement(file_path, file_type, user_id=None):
    normalized_type = str(file_type or "").strip().lower()

    if normalized_type == "csv":
        return parse_csv_statement(file_path, user_id=user_id)

    if normalized_type == "pdf":
        return parse_pdf_statement(file_path, user_id=user_id)

    raise ValueError("Unsupported statement file type")
