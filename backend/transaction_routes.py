from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, jsonify, request
from pymongo import ReturnDocument
from pymongo.errors import PyMongoError

from auth import token_required
from database import transactions_collection
from security import limiter, log_security_event


transactions_bp = Blueprint("transactions", __name__, url_prefix="/api/transactions")

TRANSACTION_TYPES = {"income", "expense"}
MAX_TEXT_LENGTH = 200


def parse_object_id(value):
    try:
        return ObjectId(value)
    except (InvalidId, TypeError):
        return None


def parse_transaction_date(value):
    if isinstance(value, datetime):
        return value

    if not isinstance(value, str) or not value.strip():
        raise ValueError("Date is required")

    normalized = value.strip().replace("Z", "+00:00")

    try:
        parsed_date = datetime.fromisoformat(normalized)
    except ValueError as exc:
        raise ValueError("Date must be a valid ISO 8601 date") from exc

    if parsed_date.tzinfo is None:
        parsed_date = parsed_date.replace(tzinfo=timezone.utc)

    return parsed_date.astimezone(timezone.utc)


def serialize_transaction(transaction):
    return {
        "id": str(transaction["_id"]),
        "description": transaction.get("description", ""),
        "amount": transaction.get("amount", 0),
        "category": transaction.get("category", ""),
        "date": transaction.get("date").isoformat()
        if isinstance(transaction.get("date"), datetime)
        else transaction.get("date"),
        "type": transaction.get("type", ""),
        "created_at": transaction.get("created_at").isoformat()
        if isinstance(transaction.get("created_at"), datetime)
        else transaction.get("created_at"),
        "updated_at": transaction.get("updated_at").isoformat()
        if isinstance(transaction.get("updated_at"), datetime)
        else transaction.get("updated_at"),
    }


def validate_transaction_payload(data, partial=False):
    errors = {}
    cleaned = {}

    if not isinstance(data, dict):
        return {"payload": "JSON request body is required"}, cleaned

    required_fields = ("description", "amount", "category", "date", "type")

    if not partial:
        for field in required_fields:
            if field not in data:
                errors[field] = f"{field.replace('_', ' ').title()} is required"

    if "description" in data:
        description = str(data.get("description", "")).strip()
        if not description:
            errors["description"] = "Description is required"
        elif len(description) > MAX_TEXT_LENGTH:
            errors["description"] = (
                f"Description must be {MAX_TEXT_LENGTH} characters or fewer"
            )
        else:
            cleaned["description"] = description

    if "category" in data:
        category = str(data.get("category", "")).strip()
        if not category:
            errors["category"] = "Category is required"
        elif len(category) > MAX_TEXT_LENGTH:
            errors["category"] = f"Category must be {MAX_TEXT_LENGTH} characters or fewer"
        else:
            cleaned["category"] = category

    if "amount" in data:
        try:
            amount = float(data.get("amount"))
        except (TypeError, ValueError):
            errors["amount"] = "Amount must be a number"
        else:
            if amount <= 0:
                errors["amount"] = "Amount must be greater than zero"
            else:
                cleaned["amount"] = round(amount, 2)

    if "date" in data:
        try:
            cleaned["date"] = parse_transaction_date(data.get("date"))
        except ValueError as exc:
            errors["date"] = str(exc)

    if "type" in data:
        transaction_type = str(data.get("type", "")).strip().lower()
        if transaction_type not in TRANSACTION_TYPES:
            errors["type"] = "Type must be either income or expense"
        else:
            cleaned["type"] = transaction_type

    if partial and not cleaned and not errors:
        errors["payload"] = "At least one transaction field is required"

    return errors, cleaned


@transactions_bp.get("")
@token_required
@limiter.limit("120 per hour")
def get_transactions(current_user):
    user_id = current_user["_id"]

    try:
        transactions = transactions_collection.find({"user_id": user_id}).sort("date", -1)
        return (
            jsonify(
                {
                    "transactions": [
                        serialize_transaction(transaction)
                        for transaction in transactions
                    ]
                }
            ),
            200,
        )
    except PyMongoError:
        return jsonify({"error": "Unable to fetch transactions"}), 500


@transactions_bp.post("")
@token_required
@limiter.limit("60 per hour")
def add_transaction(current_user):
    data = request.get_json(silent=True) or {}
    errors, cleaned = validate_transaction_payload(data)

    if errors:
        log_security_event("transaction_validation_failed", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": "Validation failed", "fields": errors}), 400

    now = datetime.now(timezone.utc)
    transaction = {
        **cleaned,
        "user_id": current_user["_id"],
        "created_at": now,
        "updated_at": now,
    }

    try:
        result = transactions_collection.insert_one(transaction)
        transaction["_id"] = result.inserted_id
        return (
            jsonify(
                {
                    "message": "Transaction added successfully",
                    "transaction": serialize_transaction(transaction),
                }
            ),
            201,
        )
    except PyMongoError:
        return jsonify({"error": "Unable to add transaction"}), 500


@transactions_bp.put("/<transaction_id>")
@token_required
@limiter.limit("60 per hour")
def update_transaction(current_user, transaction_id):
    object_id = parse_object_id(transaction_id)

    if not object_id:
        log_security_event("invalid_transaction_id", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": "Invalid transaction id"}), 400

    data = request.get_json(silent=True) or {}
    errors, cleaned = validate_transaction_payload(data, partial=True)

    if errors:
        log_security_event("transaction_update_validation_failed", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": "Validation failed", "fields": errors}), 400

    cleaned["updated_at"] = datetime.now(timezone.utc)

    try:
        updated_transaction = transactions_collection.find_one_and_update(
            {"_id": object_id, "user_id": current_user["_id"]},
            {"$set": cleaned},
            return_document=ReturnDocument.AFTER,
        )

        if not updated_transaction:
            log_security_event(
                "transaction_update_not_found",
                user_id=current_user["_id"],
                severity="warning",
                transaction_id=transaction_id,
            )
            return jsonify({"error": "Transaction not found"}), 404

        return (
            jsonify(
                {
                    "message": "Transaction updated successfully",
                    "transaction": serialize_transaction(updated_transaction),
                }
            ),
            200,
        )
    except PyMongoError:
        return jsonify({"error": "Unable to update transaction"}), 500


@transactions_bp.delete("/<transaction_id>")
@token_required
@limiter.limit("40 per hour")
def delete_transaction(current_user, transaction_id):
    object_id = parse_object_id(transaction_id)

    if not object_id:
        log_security_event("invalid_transaction_id", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": "Invalid transaction id"}), 400

    try:
        result = transactions_collection.delete_one(
            {"_id": object_id, "user_id": current_user["_id"]}
        )

        if result.deleted_count == 0:
            log_security_event(
                "transaction_delete_not_found",
                user_id=current_user["_id"],
                severity="warning",
                transaction_id=transaction_id,
            )
            return jsonify({"error": "Transaction not found"}), 404

        return jsonify({"message": "Transaction deleted successfully"}), 200
    except PyMongoError:
        return jsonify({"error": "Unable to delete transaction"}), 500
