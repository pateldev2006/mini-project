from datetime import datetime
import re

import yfinance as yf


DEFAULT_HISTORY_PERIOD = "6mo"
DEFAULT_HISTORY_INTERVAL = "1d"
SYMBOL_PATTERN = re.compile(r"^[A-Z0-9.^=-]{1,15}$")


class StockServiceError(Exception):
    pass


def normalize_symbol(symbol):
    if not isinstance(symbol, str) or not symbol.strip():
        raise ValueError("Stock symbol is required")

    normalized = symbol.strip().upper()

    if not SYMBOL_PATTERN.match(normalized):
        raise ValueError("Stock symbol is invalid")

    return normalized


def safe_number(value):
    if value is None:
        return None

    try:
        return round(float(value), 2)
    except (TypeError, ValueError):
        return None


def safe_int(value):
    if value is None:
        return None

    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def serialize_timestamp(value):
    if isinstance(value, datetime):
        return value.isoformat()

    return str(value)


def get_ticker(symbol):
    normalized_symbol = normalize_symbol(symbol)
    return yf.Ticker(normalized_symbol)


def get_live_stock_data(symbol):
    normalized_symbol = normalize_symbol(symbol)
    ticker = yf.Ticker(normalized_symbol)

    try:
        info = ticker.info or {}
        history = ticker.history(period="1d", interval="1m")
    except Exception as exc:
        raise StockServiceError("Unable to fetch live stock data") from exc

    latest_row = history.tail(1)
    latest_price = None
    latest_volume = None

    if not latest_row.empty:
        latest_price = safe_number(latest_row["Close"].iloc[0])
        latest_volume = safe_int(latest_row["Volume"].iloc[0])

    price = (
        latest_price
        or safe_number(info.get("currentPrice"))
        or safe_number(info.get("regularMarketPrice"))
        or safe_number(info.get("previousClose"))
    )

    volume = (
        latest_volume
        or safe_int(info.get("volume"))
        or safe_int(info.get("regularMarketVolume"))
    )

    if price is None:
        raise StockServiceError("No live price data found for this symbol")

    return {
        "symbol": normalized_symbol,
        "name": info.get("shortName") or info.get("longName") or normalized_symbol,
        "currency": info.get("currency"),
        "price": price,
        "volume": volume,
        "market_cap": safe_int(info.get("marketCap")),
        "pe_ratio": safe_number(info.get("trailingPE")),
        "fifty_two_week_high": safe_number(info.get("fiftyTwoWeekHigh")),
        "fifty_two_week_low": safe_number(info.get("fiftyTwoWeekLow")),
        "exchange": info.get("exchange"),
    }


def get_historical_data(
    symbol,
    period=DEFAULT_HISTORY_PERIOD,
    interval=DEFAULT_HISTORY_INTERVAL,
):
    normalized_symbol = normalize_symbol(symbol)
    ticker = yf.Ticker(normalized_symbol)

    try:
        history = ticker.history(period=period, interval=interval)
    except Exception as exc:
        raise StockServiceError("Unable to fetch historical stock data") from exc

    if history.empty:
        return {
            "symbol": normalized_symbol,
            "period": period,
            "interval": interval,
            "data": [],
        }

    rows = []

    for index, row in history.reset_index().iterrows():
        date_value = row.get("Datetime", row.get("Date"))
        rows.append(
            {
                "date": serialize_timestamp(date_value),
                "open": safe_number(row.get("Open")),
                "high": safe_number(row.get("High")),
                "low": safe_number(row.get("Low")),
                "close": safe_number(row.get("Close")),
                "volume": safe_int(row.get("Volume")),
            }
        )

    return {
        "symbol": normalized_symbol,
        "period": period,
        "interval": interval,
        "data": rows,
    }


def get_stock_summary(
    symbol,
    period=DEFAULT_HISTORY_PERIOD,
    interval=DEFAULT_HISTORY_INTERVAL,
):
    return {
        "live": get_live_stock_data(symbol),
        "historical": get_historical_data(symbol, period=period, interval=interval),
    }
