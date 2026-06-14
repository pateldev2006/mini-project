from datetime import datetime, timedelta, timezone
from functools import wraps
import re

import bcrypt
from bson import ObjectId
from bson.errors import InvalidId
from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
)
from pymongo.errors import DuplicateKeyError, PyMongoError

from config import config
from database import (
    budgets_collection,
    chat_history_collection,
    predictions_collection,
    reports_collection,
    token_blocklist_collection,
    transactions_collection,
    users_collection,
)
from security import limiter, log_security_event, utc_now


auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")
jwt = JWTManager()

EMAIL_PATTERN = re.compile(r"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$", re.IGNORECASE)
MIN_PASSWORD_LENGTH = 12
MAX_PASSWORD_BYTES = 72
PASSWORD_SPECIAL_PATTERN = re.compile(r"[^A-Za-z0-9]")


def init_jwt(app):
    app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = config.JWT_ACCESS_TOKEN_EXPIRES
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = config.JWT_REFRESH_TOKEN_EXPIRES
    jwt.init_app(app)
    register_jwt_error_handlers(jwt)
    return jwt


def register_jwt_error_handlers(jwt_manager):
    @jwt_manager.token_in_blocklist_loader
    def is_token_revoked(jwt_header, jwt_payload):
        jti = jwt_payload.get("jti")
        if not jti:
            return True
        if token_blocklist_collection.find_one({"jti": jti}) is not None:
            return True

        try:
            user = users_collection.find_one(
                {"_id": ObjectId(jwt_payload.get("sub")), "is_active": True},
                {"token_version": 1},
            )
        except (InvalidId, TypeError):
            return True

        if not user:
            return True

        return int(jwt_payload.get("token_version", 0)) != int(
            user.get("token_version", 0)
        )

    @jwt_manager.unauthorized_loader
    def handle_missing_token(message):
        return jsonify({"error": "Authorization token is required"}), 401

    @jwt_manager.invalid_token_loader
    def handle_invalid_token(message):
        return jsonify({"error": "Invalid authorization token"}), 422

    @jwt_manager.expired_token_loader
    def handle_expired_token(jwt_header, jwt_payload):
        return jsonify({"error": "Authorization token has expired"}), 401

    @jwt_manager.revoked_token_loader
    def handle_revoked_token(jwt_header, jwt_payload):
        return jsonify({"error": "Authorization token has been revoked"}), 401


def serialize_datetime(value):
    return value.isoformat() if isinstance(value, datetime) else value


def normalize_email(email):
    return email.strip().lower() if isinstance(email, str) else ""


def validate_password_strength(password):
    errors = []

    if not isinstance(password, str) or not password:
        return ["Password is required"]

    if len(password) < MIN_PASSWORD_LENGTH:
        errors.append(f"Password must be at least {MIN_PASSWORD_LENGTH} characters long")

    if len(password.encode("utf-8")) > MAX_PASSWORD_BYTES:
        errors.append("Password must be 72 bytes or fewer")

    if not any(char.islower() for char in password):
        errors.append("Password must include a lowercase letter")

    if not any(char.isupper() for char in password):
        errors.append("Password must include an uppercase letter")

    if not any(char.isdigit() for char in password):
        errors.append("Password must include a number")

    if not PASSWORD_SPECIAL_PATTERN.search(password):
        errors.append("Password must include a special character")

    return errors


def validate_registration_payload(data):
    if not isinstance(data, dict):
        return {"payload": "JSON request body is required"}, {}

    errors = {}
    name = str(data.get("name", "")).strip()
    email = normalize_email(data.get("email"))
    password = data.get("password", "")

    if not name:
        errors["name"] = "Name is required"
    elif len(name) > 100:
        errors["name"] = "Name must be 100 characters or fewer"

    if not email:
        errors["email"] = "Email is required"
    elif not EMAIL_PATTERN.match(email):
        errors["email"] = "Email address is invalid"

    password_errors = validate_password_strength(password)
    if password_errors:
        errors["password"] = password_errors

    return errors, {"name": name, "email": email, "password": password}


def validate_login_payload(data):
    if not isinstance(data, dict):
        return {"payload": "JSON request body is required"}, {}

    errors = {}
    email = normalize_email(data.get("email"))
    password = data.get("password", "")

    if not email:
        errors["email"] = "Email is required"
    elif not EMAIL_PATTERN.match(email):
        errors["email"] = "Email address is invalid"

    if not isinstance(password, str) or not password:
        errors["password"] = "Password is required"

    return errors, {"email": email, "password": password}


def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password, password_hash):
    if not password or not password_hash:
        return False

    try:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))
    except (TypeError, ValueError):
        return False


def serialize_user(user):
    return {
        "id": str(user["_id"]),
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "created_at": serialize_datetime(user.get("created_at")),
        "updated_at": serialize_datetime(user.get("updated_at")),
        "last_login_at": serialize_datetime(user.get("last_login_at")),
    }


def get_current_user():
    user_id = get_jwt_identity()

    if not user_id:
        return None

    try:
        object_id = ObjectId(user_id)
    except (InvalidId, TypeError):
        return None

    return users_collection.find_one({"_id": object_id, "is_active": True})


def token_required(route_handler):
    @wraps(route_handler)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_current_user()

        if not current_user:
            log_security_event("authenticated_user_not_found", severity="warning")
            return jsonify({"error": "Authenticated user was not found"}), 401

        return route_handler(current_user, *args, **kwargs)

    return wrapper


def create_tokens(user_id):
    identity = str(user_id)
    user = users_collection.find_one({"_id": user_id}, {"token_version": 1}) or {}
    claims = {"token_version": int(user.get("token_version", 0))}
    return {
        "access_token": create_access_token(identity=identity, additional_claims=claims),
        "refresh_token": create_refresh_token(identity=identity, additional_claims=claims),
        "token_type": "Bearer",
    }


def is_account_locked(user):
    locked_until = user.get("locked_until")
    return isinstance(locked_until, datetime) and locked_until > utc_now()


def record_failed_login(user):
    failed_attempts = int(user.get("failed_login_attempts", 0)) + 1
    update = {
        "failed_login_attempts": failed_attempts,
        "last_failed_login_at": utc_now(),
    }

    if failed_attempts >= config.ACCOUNT_LOCKOUT_ATTEMPTS:
        update["locked_until"] = utc_now() + timedelta(
            minutes=config.ACCOUNT_LOCKOUT_MINUTES
        )
        log_security_event("account_locked", user_id=user["_id"], severity="warning")

    users_collection.update_one({"_id": user["_id"]}, {"$set": update})


def reset_login_failures(user_id):
    users_collection.update_one(
        {"_id": user_id},
        {
            "$set": {"failed_login_attempts": 0, "last_login_at": utc_now()},
            "$unset": {"locked_until": "", "last_failed_login_at": ""},
        },
    )


def revoke_current_token():
    payload = get_jwt()
    expires_at = datetime.fromtimestamp(payload["exp"], timezone.utc)
    token_blocklist_collection.update_one(
        {"jti": payload["jti"]},
        {
            "$set": {
                "jti": payload["jti"],
                "type": payload.get("type"),
                "user_id": payload.get("sub"),
                "revoked_at": utc_now(),
                "expires_at": expires_at,
            }
        },
        upsert=True,
    )


def export_user_data(user_id):
    projection = {"password_hash": 0, "failed_login_attempts": 0, "locked_until": 0}
    user = users_collection.find_one({"_id": user_id}, projection)

    return {
        "user": serialize_user(user) if user else None,
        "transactions": list(transactions_collection.find({"user_id": user_id}, {"user_id": 0})),
        "budgets": list(budgets_collection.find({"user_id": user_id}, {"user_id": 0})),
        "reports": list(reports_collection.find({"user_id": user_id}, {"user_id": 0})),
        "chat_history": list(
            chat_history_collection.find({"user_id": user_id}, {"user_id": 0})
        ),
        "predictions": list(
            predictions_collection.find({"user_id": user_id}, {"user_id": 0})
        ),
    }


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


@auth_bp.post("/register")
@limiter.limit("5 per hour")
def register():
    data = request.get_json(silent=True)
    errors, validated = validate_registration_payload(data if isinstance(data, dict) else {})

    if errors:
        log_security_event("registration_validation_failed", severity="warning")
        return jsonify({"error": "Validation failed", "fields": errors}), 400

    now = utc_now()
    user_document = {
        "name": validated["name"],
        "email": validated["email"],
        "password_hash": hash_password(validated["password"]),
        "is_active": True,
        "token_version": 0,
        "failed_login_attempts": 0,
        "created_at": now,
        "updated_at": now,
    }

    try:
        result = users_collection.insert_one(user_document)
        user_document["_id"] = result.inserted_id
    except DuplicateKeyError:
        log_security_event("registration_duplicate_email", severity="warning")
        return jsonify({"error": "An account with this email already exists"}), 409
    except PyMongoError:
        log_security_event("registration_database_error", severity="error")
        return jsonify({"error": "Unable to register user"}), 500

    tokens = create_tokens(user_document["_id"])
    log_security_event("user_registered", user_id=user_document["_id"])

    return (
        jsonify(
            {
                "message": "User registered successfully",
                **tokens,
                "user": serialize_user(user_document),
            }
        ),
        201,
    )


@auth_bp.post("/login")
@limiter.limit("10 per minute")
def login():
    data = request.get_json(silent=True)
    errors, validated = validate_login_payload(data if isinstance(data, dict) else {})

    if errors:
        log_security_event("login_validation_failed", severity="warning")
        return jsonify({"error": "Invalid email or password"}), 401

    try:
        user = users_collection.find_one({"email": validated["email"], "is_active": True})
    except PyMongoError:
        log_security_event("login_database_error", severity="error")
        return jsonify({"error": "Unable to login user"}), 500

    if not user:
        log_security_event("login_unknown_account", severity="warning")
        return jsonify({"error": "Invalid email or password"}), 401

    if is_account_locked(user):
        log_security_event("login_locked_account", user_id=user["_id"], severity="warning")
        return jsonify({"error": "Account is temporarily locked"}), 423

    if not verify_password(validated["password"], user.get("password_hash")):
        record_failed_login(user)
        log_security_event("login_failed", user_id=user["_id"], severity="warning")
        return jsonify({"error": "Invalid email or password"}), 401

    reset_login_failures(user["_id"])
    tokens = create_tokens(user["_id"])
    user.update({"failed_login_attempts": 0, "last_login_at": utc_now()})
    log_security_event("login_success", user_id=user["_id"])

    return (
        jsonify(
            {
                "message": "Login successful",
                **tokens,
                "user": serialize_user(user),
            }
        ),
        200,
    )


@auth_bp.post("/refresh")
@jwt_required(refresh=True)
@limiter.limit("30 per hour")
def refresh_token():
    current_user = get_current_user()
    if not current_user:
        return jsonify({"error": "Authenticated user was not found"}), 401

    access_token = create_access_token(
        identity=str(current_user["_id"]),
        additional_claims={"token_version": int(current_user.get("token_version", 0))},
    )
    return jsonify({"access_token": access_token, "token_type": "Bearer"}), 200


@auth_bp.post("/logout")
@jwt_required(verify_type=False)
def logout():
    revoke_current_token()
    log_security_event("logout", user_id=get_jwt_identity())
    return jsonify({"message": "Logout successful"}), 200


@auth_bp.post("/logout-all")
@token_required
def logout_all(current_user):
    users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"token_version": int(current_user.get("token_version", 0)) + 1}},
    )
    revoke_current_token()
    log_security_event("logout_all", user_id=current_user["_id"])
    return jsonify({"message": "All sessions invalidated"}), 200


@auth_bp.get("/profile")
@token_required
def profile(current_user):
    return jsonify({"user": serialize_user(current_user)}), 200


@auth_bp.get("/validate-token")
@token_required
def validate_token(current_user):
    return jsonify({"valid": True, "user": serialize_user(current_user)}), 200


@auth_bp.get("/export")
@token_required
@limiter.limit("5 per hour")
def export_data(current_user):
    try:
        data = make_json_safe(export_user_data(current_user["_id"]))
        log_security_event("user_data_exported", user_id=current_user["_id"])
        return jsonify({"data": data}), 200
    except PyMongoError:
        log_security_event("user_data_export_failed", user_id=current_user["_id"], severity="error")
        return jsonify({"error": "Unable to export user data"}), 500


@auth_bp.delete("/profile")
@token_required
@limiter.limit("3 per hour")
def delete_profile(current_user):
    user_id = current_user["_id"]

    try:
        transactions_collection.delete_many({"user_id": user_id})
        budgets_collection.delete_many({"user_id": user_id})
        reports_collection.delete_many({"user_id": user_id})
        chat_history_collection.delete_many({"user_id": user_id})
        predictions_collection.delete_many({"user_id": user_id})
        users_collection.update_one(
            {"_id": user_id},
            {
                "$set": {
                    "is_active": False,
                    "email": f"deleted-{user_id}@deleted.local",
                    "name": "Deleted User",
                    "deleted_at": utc_now(),
                    "updated_at": utc_now(),
                },
                "$unset": {
                    "password_hash": "",
                    "failed_login_attempts": "",
                    "locked_until": "",
                },
            },
        )
        revoke_current_token()
        log_security_event("user_deleted", user_id=user_id)
        return jsonify({"message": "User data deleted successfully"}), 200
    except PyMongoError:
        log_security_event("user_delete_failed", user_id=user_id, severity="error")
        return jsonify({"error": "Unable to delete user data"}), 500
