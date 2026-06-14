from datetime import datetime

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder


MIN_TRAINING_MONTHS = 2
DEFAULT_RANDOM_STATE = 42


class PredictorError(Exception):
    pass


def money(value):
    return round(float(value or 0), 2)


def to_dataframe(transactions):
    if not transactions:
        raise PredictorError("At least one transaction is required")

    dataframe = pd.DataFrame(transactions)

    required_columns = {"amount", "category", "date", "type"}
    missing_columns = required_columns - set(dataframe.columns)

    if missing_columns:
        raise PredictorError(
            "Missing transaction fields: " + ", ".join(sorted(missing_columns))
        )

    dataframe["date"] = pd.to_datetime(dataframe["date"], errors="coerce")
    dataframe["amount"] = pd.to_numeric(dataframe["amount"], errors="coerce")
    dataframe["category"] = dataframe["category"].fillna("Other").astype(str)
    dataframe["type"] = dataframe["type"].fillna("").astype(str).str.lower()
    dataframe = dataframe.dropna(subset=["date", "amount"])
    dataframe = dataframe[dataframe["type"] == "expense"]

    if dataframe.empty:
        raise PredictorError("No valid expense transactions found")

    dataframe["amount"] = dataframe["amount"].abs()
    dataframe["year"] = dataframe["date"].dt.year
    dataframe["month"] = dataframe["date"].dt.month
    dataframe["month_index"] = dataframe["year"] * 12 + dataframe["month"]

    return dataframe


def build_monthly_expense_data(transactions):
    dataframe = to_dataframe(transactions)
    monthly = (
        dataframe.groupby(["year", "month", "month_index"], as_index=False)["amount"]
        .sum()
        .sort_values("month_index")
    )
    monthly["expense"] = monthly["amount"].round(2)
    monthly["sequence"] = np.arange(len(monthly))

    return monthly


def build_category_expense_data(transactions):
    dataframe = to_dataframe(transactions)
    category_monthly = (
        dataframe.groupby(
            ["category", "year", "month", "month_index"],
            as_index=False,
        )["amount"]
        .sum()
        .sort_values(["category", "month_index"])
    )
    category_monthly["expense"] = category_monthly["amount"].round(2)

    return category_monthly


def next_month_from_month_index(month_index):
    next_index = int(month_index) + 1
    year = next_index // 12
    month = next_index % 12

    if month == 0:
        month = 12
        year -= 1

    return year, month, next_index


def predict_with_linear_regression(monthly):
    if len(monthly) < MIN_TRAINING_MONTHS:
        return money(monthly["expense"].mean())

    model = LinearRegression()
    x = monthly[["sequence"]]
    y = monthly["expense"]
    model.fit(x, y)

    next_sequence = [[int(monthly["sequence"].max()) + 1]]
    return max(0, money(model.predict(next_sequence)[0]))


def predict_with_random_forest(monthly):
    if len(monthly) < MIN_TRAINING_MONTHS:
        return money(monthly["expense"].mean())

    model = RandomForestRegressor(
        n_estimators=100,
        random_state=DEFAULT_RANDOM_STATE,
        min_samples_leaf=1,
    )
    x = monthly[["sequence", "month"]]
    y = monthly["expense"]
    model.fit(x, y)

    next_year, next_month, _ = next_month_from_month_index(monthly["month_index"].max())
    next_sequence = int(monthly["sequence"].max()) + 1
    return max(0, money(model.predict([[next_sequence, next_month]])[0]))


def predict_next_month_expenses(transactions):
    monthly = build_monthly_expense_data(transactions)
    next_year, next_month, _ = next_month_from_month_index(monthly["month_index"].max())

    linear_prediction = predict_with_linear_regression(monthly)
    random_forest_prediction = predict_with_random_forest(monthly)
    blended_prediction = money((linear_prediction + random_forest_prediction) / 2)

    return {
        "month": next_month,
        "year": next_year,
        "linear_regression": linear_prediction,
        "random_forest": random_forest_prediction,
        "predicted_expense": blended_prediction,
        "training_months": int(len(monthly)),
    }


def predict_category_wise_expenses(transactions):
    category_monthly = build_category_expense_data(transactions)
    predictions = []

    for category, group in category_monthly.groupby("category"):
        group = group.sort_values("month_index").copy()
        group["sequence"] = np.arange(len(group))

        next_year, next_month, _ = next_month_from_month_index(group["month_index"].max())
        linear_prediction = predict_with_linear_regression(group)
        random_forest_prediction = predict_with_random_forest(group)

        predictions.append(
            {
                "category": category,
                "month": next_month,
                "year": next_year,
                "linear_regression": linear_prediction,
                "random_forest": random_forest_prediction,
                "predicted_expense": money(
                    (linear_prediction + random_forest_prediction) / 2
                ),
                "training_months": int(len(group)),
            }
        )

    return sorted(predictions, key=lambda item: item["predicted_expense"], reverse=True)


def calculate_overspending_probability(predicted_expense, budget_amount):
    if not budget_amount or budget_amount <= 0:
        return None

    ratio = predicted_expense / budget_amount
    probability = 1 / (1 + np.exp(-8 * (ratio - 1)))

    return round(float(probability), 4)


def predict_overspending_probability(transactions, budgets=None):
    budgets = budgets or []
    category_predictions = predict_category_wise_expenses(transactions)
    budget_lookup = {
        str(budget.get("category", "")).lower(): float(budget.get("budget_amount", 0))
        for budget in budgets
    }

    results = []

    for prediction in category_predictions:
        category_key = prediction["category"].lower()
        budget_amount = budget_lookup.get(category_key)
        probability = calculate_overspending_probability(
            prediction["predicted_expense"],
            budget_amount,
        )

        results.append(
            {
                "category": prediction["category"],
                "predicted_expense": prediction["predicted_expense"],
                "budget_amount": money(budget_amount) if budget_amount else None,
                "overspending_probability": probability,
                "risk_level": classify_risk(probability),
            }
        )

    return results


def classify_risk(probability):
    if probability is None:
        return "unknown"

    if probability >= 0.75:
        return "high"

    if probability >= 0.45:
        return "medium"

    return "low"


def train_random_forest_category_model(transactions):
    dataframe = to_dataframe(transactions)
    label_encoder = LabelEncoder()
    dataframe["category_code"] = label_encoder.fit_transform(dataframe["category"])

    x = dataframe[["month_index", "month", "category_code"]]
    y = dataframe["amount"]

    model = RandomForestRegressor(
        n_estimators=150,
        random_state=DEFAULT_RANDOM_STATE,
    )
    model.fit(x, y)

    return model, label_encoder


def generate_expense_prediction(transactions, budgets=None):
    return {
        "next_month_expenses": predict_next_month_expenses(transactions),
        "category_wise_expenses": predict_category_wise_expenses(transactions),
        "overspending_probability": predict_overspending_probability(
            transactions,
            budgets=budgets,
        ),
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }
