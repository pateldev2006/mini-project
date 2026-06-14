from pymongo import MongoClient
from pymongo.errors import PyMongoError

from config import config


config.validate()


client = MongoClient(
    config.MONGO_URI,
    serverSelectionTimeoutMS=5000,
    uuidRepresentation="standard",
)

db = client[config.DATABASE_NAME]

users_collection = db["users"]
transactions_collection = db["transactions"]
budgets_collection = db["budgets"]
reports_collection = db["reports"]
chat_history_collection = db["chat_history"]
predictions_collection = db["predictions"]
token_blocklist_collection = db["token_blocklist"]


def ping_database():
    try:
        client.admin.command("ping")
        return True
    except PyMongoError:
        return False


def create_indexes():
    users_collection.create_index("email", unique=True)
    users_collection.create_index("is_active")
    users_collection.create_index("locked_until")
    transactions_collection.create_index([("user_id", 1), ("date", -1)])

    reconcile_index(
        transactions_collection,
        "user_id_1_source_hash_1",
        [("user_id", 1), ("source_hash", 1)],
        {"unique": True, "sparse": True},
    )
    transactions_collection.create_index(
        [("user_id", 1), ("source_hash", 1)],
        unique=True,
        sparse=True,
    )

    reconcile_index(
        budgets_collection,
        "user_id_1_category_1",
        [("user_id", 1), ("category", 1), ("month", 1), ("year", 1)],
        {"unique": True},
    )
    budgets_collection.create_index(
        [("user_id", 1), ("category", 1), ("month", 1), ("year", 1)],
        unique=True,
    )
    reports_collection.create_index([("user_id", 1), ("year", -1), ("month", -1)])
    chat_history_collection.create_index([("user_id", 1), ("created_at", -1)])
    predictions_collection.create_index([("user_id", 1), ("created_at", -1)])
    token_blocklist_collection.create_index("jti", unique=True)
    token_blocklist_collection.create_index("expires_at", expireAfterSeconds=0)


def get_database():
    return db


def reconcile_index(collection, stale_index_name, expected_key, expected_options):
    indexes = collection.index_information()
    stale_index = indexes.get(stale_index_name)

    if not stale_index:
        return

    if stale_index.get("key") != expected_key:
        collection.drop_index(stale_index_name)
        return

    for option, expected_value in expected_options.items():
        if stale_index.get(option) != expected_value:
            collection.drop_index(stale_index_name)
            return
