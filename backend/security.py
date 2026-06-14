import logging
import re
from datetime import datetime, timezone

from flask import has_request_context, request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


security_logger = logging.getLogger("finsight.security")
limiter = Limiter(key_func=get_remote_address)

SENSITIVE_KEYS = {
    "password",
    "password_hash",
    "token",
    "access_token",
    "refresh_token",
    "authorization",
    "api_key",
    "secret",
}

PROMPT_INJECTION_PATTERNS = [
    re.compile(pattern, re.IGNORECASE)
    for pattern in (
        r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions",
        r"reveal\s+(your\s+)?(system|developer)\s+(prompt|instructions)",
        r"print\s+(your\s+)?(system|developer)\s+(prompt|instructions)",
        r"show\s+(your\s+)?hidden\s+(prompt|instructions)",
        r"bypass\s+(safety|security|policy)",
        r"act\s+as\s+(?:an?\s+)?unrestricted",
        r"jailbreak",
    )
]


def utc_now():
    return datetime.now(timezone.utc)


def redact(value):
    if isinstance(value, dict):
        redacted = {}
        for key, item in value.items():
            if str(key).lower() in SENSITIVE_KEYS:
                redacted[key] = "[REDACTED]"
            else:
                redacted[key] = redact(item)
        return redacted

    if isinstance(value, list):
        return [redact(item) for item in value]

    return value


def log_security_event(event_type, user_id=None, severity="info", **metadata):
    has_request = has_request_context()
    payload = {
        "event": event_type,
        "severity": severity,
        "user_id": str(user_id) if user_id else None,
        "ip": request.headers.get("X-Forwarded-For", request.remote_addr)
        if has_request
        else None,
        "path": request.path if has_request else None,
        "metadata": redact(metadata),
    }

    log_method = getattr(security_logger, severity, security_logger.info)
    log_method("%s", payload)


def is_prompt_suspicious(text):
    if not isinstance(text, str):
        return False

    return any(pattern.search(text) for pattern in PROMPT_INJECTION_PATTERNS)


def validate_json_object(data):
    return isinstance(data, dict)


def client_ip():
    if not has_request_context():
        return None

    return request.headers.get("X-Forwarded-For", request.remote_addr)
