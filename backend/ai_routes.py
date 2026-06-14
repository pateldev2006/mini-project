from datetime import datetime, timezone

from bson import ObjectId
from flask import Blueprint, jsonify, request
from pymongo.errors import PyMongoError

from ai_engine import (
    AIEngineError,
    financial_chatbot,
    investment_advisor,
    monthly_financial_report,
    savings_advisor,
)
from auth import token_required
from database import (
    budgets_collection,
    chat_history_collection,
    reports_collection,
    transactions_collection,
)
from security import is_prompt_suspicious, limiter, log_security_event


ai_bp = Blueprint("ai", __name__, url_prefix="/api/ai")

MAX_MESSAGE_LENGTH = 2000
MAX_GOALS = 10
VALID_RISK_PROFILES = {"conservative", "moderate", "aggressive"}


def get_json_payload():
    data = request.get_json(silent=True)
    return data if isinstance(data, dict) else {}


def make_json_safe(value):
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, datetime):
        return value.isoformat()
    if isinstance(value, list):
        return [make_json_safe(item) for item in value]
    if isinstance(value, dict):
        return {key: make_json_safe(item) for key, item in value.items()}
    return value


def validate_safe_text(value, field_name, required=False, max_length=MAX_MESSAGE_LENGTH):
    if value is None:
        if required:
            raise ValueError(f"{field_name} is required")
        return ""

    if not isinstance(value, str):
        raise ValueError(f"{field_name} must be text")

    text = value.strip()

    if required and not text:
        raise ValueError(f"{field_name} is required")

    if len(text) > max_length:
        raise ValueError(f"{field_name} is too long")

    if is_prompt_suspicious(text):
        raise ValueError(f"{field_name} contains unsafe prompt instructions")

    return text


def validate_month_year(data):
    errors = {}

    try:
        month = int(data.get("month"))
    except (TypeError, ValueError):
        errors["month"] = "Month must be a number from 1 to 12"
        month = None

    try:
        year = int(data.get("year"))
    except (TypeError, ValueError):
        errors["year"] = "Year must be a valid number"
        year = None

    if month is not None and (month < 1 or month > 12):
        errors["month"] = "Month must be between 1 and 12"

    if year is not None and (year < 2000 or year > 2100):
        errors["year"] = "Year must be between 2000 and 2100"

    return errors, month, year


def build_authorized_financial_context(user_id, month=None, year=None):
    transaction_filter = {"user_id": user_id}
    budget_filter = {"user_id": user_id}

    if month and year:
        budget_filter.update({"month": month, "year": year})

    transactions = list(
        transactions_collection.find(
            transaction_filter,
            {"user_id": 0, "source_hash": 0},
        )
        .sort("date", -1)
        .limit(100)
    )
    budgets = list(budgets_collection.find(budget_filter, {"user_id": 0}).limit(100))

    return make_json_safe(
        {
            "transactions": transactions,
            "budgets": budgets,
            "scope": {
                "user_id": str(user_id),
                "month": month,
                "year": year,
                "source": "server_authorized_records",
            },
        }
    )


def get_recent_chat_history(user_id, limit=6):
    try:
        cursor = (
            chat_history_collection.find({"user_id": user_id}, {"user_id": 0})
            .sort("created_at", -1)
            .limit(limit)
        )
        return make_json_safe(list(cursor))
    except PyMongoError:
        return []


@ai_bp.post("/chat")
@token_required
@limiter.limit("20 per hour")
def chat(current_user):
    data = get_json_payload()

    try:
        message = validate_safe_text(data.get("message"), "message", required=True)
        financial_context = build_authorized_financial_context(current_user["_id"])
        response = financial_chatbot(
            message=message,
            financial_context=financial_context,
            chat_history=get_recent_chat_history(current_user["_id"]),
        )

        chat_document = {
            "user_id": current_user["_id"],
            "message": message,
            "response": response,
            "created_at": datetime.now(timezone.utc),
        }
        chat_history_collection.insert_one(chat_document)

        return jsonify({"response": response}), 200
    except ValueError as exc:
        log_security_event("ai_request_rejected", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": str(exc)}), 400
    except AIEngineError:
        return jsonify({"error": "AI service is unavailable"}), 502
    except PyMongoError:
        return jsonify({"error": "Unable to save chat history"}), 500


@ai_bp.post("/investment-advice")
@token_required
@limiter.limit("10 per hour")
def investment_advice(current_user):
    data = get_json_payload()

    try:
        risk_profile = validate_safe_text(
            data.get("risk_profile", "moderate"),
            "risk_profile",
            max_length=32,
        ).lower()
        if risk_profile not in VALID_RISK_PROFILES:
            raise ValueError("risk_profile must be conservative, moderate, or aggressive")

        raw_goals = data.get("goals", [])
        if not isinstance(raw_goals, list) or len(raw_goals) > MAX_GOALS:
            raise ValueError("goals must be a list with 10 or fewer items")

        goals = [
            validate_safe_text(str(goal), "goals", max_length=200)
            for goal in raw_goals
        ]

        response = investment_advisor(
            financial_context=build_authorized_financial_context(current_user["_id"]),
            risk_profile=risk_profile,
            goals=goals,
        )
        return jsonify({"advice": response}), 200
    except ValueError as exc:
        log_security_event("ai_request_rejected", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": str(exc)}), 400
    except AIEngineError:
        return jsonify({"error": "AI service is unavailable"}), 502


@ai_bp.post("/savings-advice")
@token_required
@limiter.limit("10 per hour")
def savings_advice(current_user):
    data = get_json_payload()

    try:
        target_savings = data.get("target_savings")
        if target_savings is not None:
            target_savings = float(target_savings)
            if target_savings < 0:
                raise ValueError("target_savings must be zero or greater")

        response = savings_advisor(
            financial_context=build_authorized_financial_context(current_user["_id"]),
            target_savings=target_savings,
        )
        return jsonify({"advice": response}), 200
    except (TypeError, ValueError) as exc:
        log_security_event("ai_request_rejected", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": str(exc)}), 400
    except AIEngineError:
        return jsonify({"error": "AI service is unavailable"}), 502


@ai_bp.post("/monthly-report")
@token_required
@limiter.limit("6 per hour")
def monthly_report(current_user):
    data = get_json_payload()
    errors, month, year = validate_month_year(data)

    if errors:
        return jsonify({"error": "Validation failed", "fields": errors}), 400

    try:
        report = monthly_financial_report(
            financial_context=build_authorized_financial_context(
                current_user["_id"],
                month=month,
                year=year,
            ),
            month=month,
            year=year,
        )

        report_document = {
            "user_id": current_user["_id"],
            "month": month,
            "year": year,
            "report": report,
            "created_at": datetime.now(timezone.utc),
        }
        reports_collection.insert_one(report_document)

        return jsonify({"report": report, "month": month, "year": year}), 200
    except AIEngineError:
        return jsonify({"error": "AI service is unavailable"}), 502
    except PyMongoError:
        return jsonify({"error": "Unable to save monthly report"}), 500
