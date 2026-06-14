from datetime import datetime

from flask import Blueprint, jsonify
from pymongo.errors import PyMongoError

from auth import token_required
from database import budgets_collection, transactions_collection
from security import limiter


dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")

INVESTABLE_SURPLUS_RATE = 0.3
RECENT_TRANSACTION_LIMIT = 5
BUDGET_WARNING_THRESHOLD = 80


def serialize_datetime(value):
    return value.isoformat() if isinstance(value, datetime) else value


def money(value):
    return round(float(value or 0), 2)


def serialize_transaction(transaction):
    return {
        "id": str(transaction["_id"]),
        "description": transaction.get("description", ""),
        "amount": money(transaction.get("amount")),
        "category": transaction.get("category", ""),
        "date": serialize_datetime(transaction.get("date")),
        "type": transaction.get("type", ""),
    }


def aggregate_totals(user_id):
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {"_id": "$type", "total": {"$sum": "$amount"}}},
    ]

    totals = {"income": 0, "expense": 0}

    for row in transactions_collection.aggregate(pipeline):
        transaction_type = row.get("_id")
        if transaction_type in totals:
            totals[transaction_type] = money(row.get("total"))

    return totals


def aggregate_expenses_by_category(user_id):
    pipeline = [
        {"$match": {"user_id": user_id, "type": "expense"}},
        {"$group": {"_id": "$category", "amount": {"$sum": "$amount"}}},
        {"$sort": {"amount": -1}},
    ]

    return [
        {
            "category": row.get("_id") or "Uncategorized",
            "amount": money(row.get("amount")),
        }
        for row in transactions_collection.aggregate(pipeline)
    ]


def aggregate_expenses_by_category_month(user_id):
    pipeline = [
        {"$match": {"user_id": user_id, "type": "expense"}},
        {
            "$group": {
                "_id": {
                    "category": "$category",
                    "year": {"$year": "$date"},
                    "month": {"$month": "$date"},
                },
                "amount": {"$sum": "$amount"},
            }
        },
    ]

    expenses = {}

    for row in transactions_collection.aggregate(pipeline):
        key = (
            row["_id"].get("category") or "Uncategorized",
            row["_id"].get("year"),
            row["_id"].get("month"),
        )
        expenses[key] = money(row.get("amount"))

    return expenses


def aggregate_monthly_cashflow(user_id):
    pipeline = [
        {"$match": {"user_id": user_id}},
        {
            "$group": {
                "_id": {
                    "year": {"$year": "$date"},
                    "month": {"$month": "$date"},
                    "type": "$type",
                },
                "amount": {"$sum": "$amount"},
            }
        },
        {"$sort": {"_id.year": 1, "_id.month": 1}},
    ]

    months = {}

    for row in transactions_collection.aggregate(pipeline):
        key = f"{row['_id']['year']}-{row['_id']['month']:02d}"
        month_data = months.setdefault(key, {"month": key, "income": 0, "expenses": 0})

        if row["_id"]["type"] == "income":
            month_data["income"] = money(row.get("amount"))
        elif row["_id"]["type"] == "expense":
            month_data["expenses"] = money(row.get("amount"))

    return list(months.values())


def calculate_financial_health_score(total_income, total_expenses, current_balance):
    if total_income <= 0:
        return 0

    savings_rate = max((total_income - total_expenses) / total_income, 0)
    expense_ratio = min(total_expenses / total_income, 1)
    balance_bonus = 0.1 if current_balance > 0 else 0

    score = (savings_rate * 70) + ((1 - expense_ratio) * 20) + (balance_bonus * 100)
    return max(0, min(100, round(score)))


def build_budget_alerts(user_id):
    expenses_by_category_month = aggregate_expenses_by_category_month(user_id)
    alerts = []

    budgets = budgets_collection.find({"user_id": user_id}).sort(
        [("year", -1), ("month", -1), ("category", 1)]
    )

    for budget in budgets:
        category = budget.get("category", "")
        month = budget.get("month")
        year = budget.get("year")
        budget_amount = money(budget.get("budget_amount"))
        spent = money(expenses_by_category_month.get((category, year, month), 0))

        if budget_amount <= 0:
            continue

        usage_percent = round((spent / budget_amount) * 100, 2)

        if usage_percent >= BUDGET_WARNING_THRESHOLD:
            alerts.append(
                {
                    "budget_id": str(budget["_id"]),
                    "category": category,
                    "month": month,
                    "year": year,
                    "budget_amount": budget_amount,
                    "spent": spent,
                    "remaining": money(budget_amount - spent),
                    "usage_percent": usage_percent,
                    "status": "exceeded" if spent > budget_amount else "warning",
                }
            )

    return alerts


@dashboard_bp.get("")
@token_required
@limiter.limit("120 per hour")
def get_dashboard(current_user):
    user_id = current_user["_id"]

    try:
        totals = aggregate_totals(user_id)
        total_income = totals["income"]
        total_expenses = totals["expense"]
        current_balance = money(total_income - total_expenses)
        investable_surplus = money(max(current_balance, 0) * INVESTABLE_SURPLUS_RATE)
        financial_health_score = calculate_financial_health_score(
            total_income,
            total_expenses,
            current_balance,
        )

        recent_transactions = transactions_collection.find({"user_id": user_id}).sort(
            "date", -1
        ).limit(RECENT_TRANSACTION_LIMIT)

        expense_categories = aggregate_expenses_by_category(user_id)
        monthly_cashflow = aggregate_monthly_cashflow(user_id)
        budget_alerts = build_budget_alerts(user_id)

        return (
            jsonify(
                {
                    "cards": {
                        "total_income": total_income,
                        "total_expenses": total_expenses,
                        "current_balance": current_balance,
                        "investable_surplus": investable_surplus,
                        "financial_health_score": financial_health_score,
                    },
                    "charts": {
                        "expense_categories": expense_categories,
                        "monthly_cashflow": monthly_cashflow,
                    },
                    "recent_transactions": [
                        serialize_transaction(transaction)
                        for transaction in recent_transactions
                    ],
                    "budget_alerts": budget_alerts,
                }
            ),
            200,
        )
    except PyMongoError:
        return jsonify({"error": "Unable to fetch dashboard data"}), 500
