import logging
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter.errors import RateLimitExceeded
from pymongo.errors import PyMongoError
from werkzeug.exceptions import HTTPException, RequestEntityTooLarge

from auth import auth_bp, init_jwt
from ai_routes import ai_bp
from budget_routes import budgets_bp
from config import config
from dashboard_routes import dashboard_bp
from database import create_indexes, ping_database
from security import limiter, log_security_event
from transaction_routes import transactions_bp


load_dotenv()


def create_app():
    config.validate()

    app = Flask(__name__)

    configure_app(app)
    configure_logging(app)
    configure_cors(app)
    configure_rate_limiting(app)
    configure_jwt(app)
    connect_mongodb(app)
    register_routes(app)
    register_error_handlers(app)

    return app


def configure_app(app):
    app.config["SECRET_KEY"] = config.JWT_SECRET_KEY
    app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = config.JWT_ACCESS_TOKEN_EXPIRES
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = config.JWT_REFRESH_TOKEN_EXPIRES
    app.config["MAX_CONTENT_LENGTH"] = config.MAX_CONTENT_LENGTH
    app.config["JSON_SORT_KEYS"] = False


def configure_logging(app):
    log_level = os.getenv("LOG_LEVEL", "INFO").upper()
    logging.basicConfig(
        level=getattr(logging, log_level, logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )
    app.logger.setLevel(getattr(logging, log_level, logging.INFO))


def configure_cors(app):
    origins = [origin.strip() for origin in config.CORS_ORIGINS.split(",") if origin.strip()]

    CORS(
        app,
        resources={r"/api/*": {"origins": origins}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    )


def configure_rate_limiting(app):
    app.config["RATELIMIT_DEFAULT"] = [
        limit.strip() for limit in config.RATE_LIMIT_DEFAULT.split(",")
    ]
    app.config["RATELIMIT_STORAGE_URI"] = config.RATELIMIT_STORAGE_URI
    app.config["RATELIMIT_HEADERS_ENABLED"] = True
    limiter.init_app(app)


def configure_jwt(app):
    init_jwt(app)


def connect_mongodb(app):
    if os.getenv("AUTO_CREATE_INDEXES", "true").lower() not in {"1", "true", "yes"}:
        return

    try:
        ping_database()
        create_indexes()
        app.logger.info("MongoDB connection initialized")
    except PyMongoError as exc:
        app.logger.error("MongoDB initialization failed: %s", exc)


def register_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(transactions_bp)
    app.register_blueprint(budgets_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(ai_bp)

    @app.get("/")
    def root():
        return jsonify({"service": "FinSight AI API", "status": "running"}), 200

    @app.get("/api/health")
    @limiter.exempt
    def health_check():
        mongo_connected = ping_database()
        status_code = 200 if mongo_connected else 503

        return (
            jsonify(
                {
                    "service": "FinSight AI API",
                    "status": "healthy" if mongo_connected else "degraded",
                    "mongodb": "connected" if mongo_connected else "unavailable",
                }
            ),
            status_code,
        )


def register_error_handlers(app):
    @app.after_request
    def add_security_headers(response):
        if config.SECURITY_HEADERS_ENABLED:
            response.headers["X-Frame-Options"] = "DENY"
            response.headers["X-Content-Type-Options"] = "nosniff"
            response.headers["Referrer-Policy"] = "no-referrer"
            response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
            response.headers["Content-Security-Policy"] = (
                "default-src 'self'; "
                "object-src 'none'; "
                "frame-ancestors 'none'; "
                "base-uri 'self'"
            )
            response.headers["Strict-Transport-Security"] = (
                "max-age=31536000; includeSubDomains"
            )
        return response

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"error": "Bad request"}), 400

    @app.errorhandler(RateLimitExceeded)
    def rate_limit_exceeded(error):
        log_security_event("rate_limit_exceeded", severity="warning", limit=str(error))
        return jsonify({"error": "Too many requests"}), 429

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Route not found"}), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({"error": "Method not allowed"}), 405

    @app.errorhandler(RequestEntityTooLarge)
    def request_entity_too_large(error):
        return jsonify({"error": "Uploaded file is too large"}), 413

    @app.errorhandler(PyMongoError)
    def database_error(error):
        app.logger.exception("Database error")
        return jsonify({"error": "Database operation failed"}), 500

    @app.errorhandler(HTTPException)
    def http_exception(error):
        return jsonify({"error": error.description}), error.code

    @app.errorhandler(Exception)
    def unhandled_exception(error):
        log_security_event("unhandled_exception", severity="error", method=request.method)
        app.logger.exception("Unhandled error")
        return jsonify({"error": "Internal server error"}), 500


app = create_app()


if __name__ == "__main__":
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", "5000"))
    debug = os.getenv("FLASK_DEBUG", "false").lower() in {"1", "true", "yes"}

    app.run(host=host, port=port, debug=debug)
