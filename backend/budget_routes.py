from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, jsonify, request
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError, PyMongoError

from auth import token_required
from database import budgets_collection
from security import limiter, log_security_event


budgets_bp = Blueprint("budgets", __name__, url_prefix="/api/budgets")

MAX_CATEGORY_LENGTH = 100
MIN_YEAR = 2000
MAX_YEAR = 2100


def parse_object_id(value):
    try:
        return ObjectId(value)
    except (InvalidId, TypeError):
        return None


def serialize_datetime(value):
    return value.isoformat() if isinstance(value, datetime) else value


def serialize_budget(budget):
    return {
        "id": str(budget["_id"]),
        "category": budget.get("category", ""),
        "budget_amount": budget.get("budget_amount", 0),
        "month": budget.get("month"),
        "year": budget.get("year"),
        "created_at": serialize_datetime(budget.get("created_at")),
        "updated_at": serialize_datetime(budget.get("updated_at")),
    }


def validate_budget_payload(data, partial=False):
    errors = {}
    cleaned = {}

    if not isinstance(data, dict):
        return {"payload": "JSON request body is required"}, cleaned

    required_fields = ("category", "budget_amount", "month", "year")
    if not partial:
        for field in required_fields:
            if field not in data:
                errors[field] = f"{field.replace('_', ' ').title()} is required"

    if "category" in data:
        category = str(data.get("category", "")).strip()
        if not category:
            errors["category"] = "Category is required"
        elif len(category) > MAX_CATEGORY_LENGTH:
            errors["category"] = (
                f"Category must be {MAX_CATEGORY_LENGTH} characters or fewer"
            )
        else:
            cleaned["category"] = category

    if "budget_amount" in data:
        try:
            budget_amount = float(data.get("budget_amount"))
        except (TypeError, ValueError):
            errors["budget_amount"] = "Budget amount must be a number"
        else:
            if budget_amount <= 0:
                errors["budget_amount"] = "Budget amount must be greater than zero"
            else:
                cleaned["budget_amount"] = round(budget_amount, 2)

    if "month" in data:
        try:
            month = int(data.get("month"))
        except (TypeError, ValueError):
            errors["month"] = "Month must be a number from 1 to 12"
        else:
            if month < 1 or month > 12:
                errors["month"] = "Month must be between 1 and 12"
            else:
                cleaned["month"] = month

    if "year" in data:
        try:
            year = int(data.get("year"))
        except (TypeError, ValueError):
            errors["year"] = f"Year must be a number from {MIN_YEAR} to {MAX_YEAR}"
        else:
            if year < MIN_YEAR or year > MAX_YEAR:
                errors["year"] = f"Year must be between {MIN_YEAR} and {MAX_YEAR}"
            else:
                cleaned["year"] = year

    if partial and not cleaned and not errors:
        errors["payload"] = "At least one budget field is required"

    return errors, cleaned


def build_budget_filter(current_user, budget_id):
    object_id = parse_object_id(budget_id)

    if not object_id:
        return None

    return {"_id": object_id, "user_id": current_user["_id"]}


@budgets_bp.get("")
@token_required
@limiter.limit("120 per hour")
def get_budgets(current_user):
    try:
        budgets = budgets_collection.find({"user_id": current_user["_id"]}).sort(
            [("year", -1), ("month", -1), ("category", 1)]
        )
        return jsonify({"budgets": [serialize_budget(budget) for budget in budgets]}), 200
    except PyMongoError:
        return jsonify({"error": "Unable to fetch budgets"}), 500


@budgets_bp.post("")
@token_required
@limiter.limit("60 per hour")
def create_budget(current_user):
    data = request.get_json(silent=True) or {}
    errors, cleaned = validate_budget_payload(data)

    if errors:
        log_security_event("budget_validation_failed", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": "Validation failed", "fields": errors}), 400

    now = datetime.now(timezone.utc)
    budget = {
        **cleaned,
        "user_id": current_user["_id"],
        "created_at": now,
        "updated_at": now,
    }

    try:
        existing_budget = budgets_collection.find_one(
            {
                "user_id": current_user["_id"],
                "category": budget["category"],
                "month": budget["month"],
                "year": budget["year"],
            }
        )

        if existing_budget:
            return (
                jsonify(
                    {
                        "error": (
                            "A budget for this category, month, and year already exists"
                        )
                    }
                ),
                409,
            )

        result = budgets_collection.insert_one(budget)
        budget["_id"] = result.inserted_id

        return (
            jsonify(
                {
                    "message": "Budget created successfully",
                    "budget": serialize_budget(budget),
                }
            ),
            201,
        )
    except DuplicateKeyError:
        return jsonify({"error": "Budget already exists"}), 409
    except PyMongoError:
        return jsonify({"error": "Unable to create budget"}), 500


@budgets_bp.put("/<budget_id>")
@token_required
@limiter.limit("60 per hour")
def update_budget(current_user, budget_id):
    budget_filter = build_budget_filter(current_user, budget_id)

    if not budget_filter:
        log_security_event("invalid_budget_id", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": "Invalid budget id"}), 400

    data = request.get_json(silent=True) or {}
    errors, cleaned = validate_budget_payload(data, partial=True)

    if errors:
        log_security_event("budget_update_validation_failed", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": "Validation failed", "fields": errors}), 400

    cleaned["updated_at"] = datetime.now(timezone.utc)

    try:
        current_budget = budgets_collection.find_one(budget_filter)
        if not current_budget:
            log_security_event(
                "budget_update_not_found",
                user_id=current_user["_id"],
                severity="warning",
                budget_id=budget_id,
            )
            return jsonify({"error": "Budget not found"}), 404

        category = cleaned.get("category", current_budget.get("category"))
        month = cleaned.get("month", current_budget.get("month"))
        year = cleaned.get("year", current_budget.get("year"))

        duplicate_budget = budgets_collection.find_one(
            {
                "_id": {"$ne": current_budget["_id"]},
                "user_id": current_user["_id"],
                "category": category,
                "month": month,
                "year": year,
            }
        )

        if duplicate_budget:
            return (
                jsonify(
                    {
                        "error": (
                            "A budget for this category, month, and year already exists"
                        )
                    }
                ),
                409,
            )

        updated_budget = budgets_collection.find_one_and_update(
            budget_filter,
            {"$set": cleaned},
            return_document=ReturnDocument.AFTER,
        )

        return (
            jsonify(
                {
                    "message": "Budget updated successfully",
                    "budget": serialize_budget(updated_budget),
                }
            ),
            200,
        )
    except DuplicateKeyError:
        return jsonify({"error": "Budget already exists"}), 409
    except PyMongoError:
        return jsonify({"error": "Unable to update budget"}), 500


@budgets_bp.delete("/<budget_id>")
@token_required
@limiter.limit("40 per hour")
def delete_budget(current_user, budget_id):
    budget_filter = build_budget_filter(current_user, budget_id)

    if not budget_filter:
        log_security_event("invalid_budget_id", user_id=current_user["_id"], severity="warning")
        return jsonify({"error": "Invalid budget id"}), 400

    try:
        result = budgets_collection.delete_one(budget_filter)

        if result.deleted_count == 0:
            log_security_event(
                "budget_delete_not_found",
                user_id=current_user["_id"],
                severity="warning",
                budget_id=budget_id,
            )
            return jsonify({"error": "Budget not found"}), 404

        return jsonify({"message": "Budget deleted successfully"}), 200
    except PyMongoError:
        return jsonify({"error": "Unable to delete budget"}), 500
