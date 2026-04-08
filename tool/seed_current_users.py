from pathlib import Path

from pymongo import MongoClient


SEED_TAG = "#seeded"
DATABASE_NAME = "what-to-eat"
TARGET_COUNT = 24

LUNCH_IDEAS = [
    {
        "lunchIdea": "Chicken Katsu Curry",
        "lunchBudget": "$18",
        "cafeName": "Sora Bento",
        "cafeLocation": "Hay Street, Perth",
        "cafeWebsite": "https://example.com/sora-bento",
        "walkingTime": "10",
        "tags": ["#japanese", "#rice", "#comfortfood", SEED_TAG],
    },
    {
        "lunchIdea": "Beef Pho",
        "lunchBudget": "$17",
        "cafeName": "Little Saigon Kitchen",
        "cafeLocation": "Barrack Street, Perth",
        "cafeWebsite": "https://example.com/little-saigon-kitchen",
        "walkingTime": "15",
        "tags": ["#vietnamese", "#noodles", "#soup", SEED_TAG],
    },
    {
        "lunchIdea": "Grilled Salmon Bowl",
        "lunchBudget": "$19",
        "cafeName": "Blue Fin Bowl",
        "cafeLocation": "Murray Street, Perth",
        "cafeWebsite": "https://example.com/blue-fin-bowl",
        "walkingTime": "10",
        "tags": ["#healthy", "#bowl", "#seafood", SEED_TAG],
    },
    {
        "lunchIdea": "Pesto Chicken Pasta",
        "lunchBudget": "$16",
        "cafeName": "Olive Lane Pasta Bar",
        "cafeLocation": "William Street, Perth",
        "cafeWebsite": "https://example.com/olive-lane-pasta-bar",
        "walkingTime": "20",
        "tags": ["#italian", "#pasta", "#quickbite", SEED_TAG],
    },
    {
        "lunchIdea": "Spicy Tuna Sushi Set",
        "lunchBudget": "$15",
        "cafeName": "Maki Corner",
        "cafeLocation": "St Georges Terrace, Perth",
        "cafeWebsite": "https://example.com/maki-corner",
        "walkingTime": "5",
        "tags": ["#sushi", "#japanese", "#fresh", SEED_TAG],
    },
    {
        "lunchIdea": "Roast Pork Banh Mi",
        "lunchBudget": "$12",
        "cafeName": "Crusty Roll House",
        "cafeLocation": "Wellington Street, Perth",
        "cafeWebsite": "https://example.com/crusty-roll-house",
        "walkingTime": "10",
        "tags": ["#banhmi", "#sandwich", "#budget", SEED_TAG],
    },
    {
        "lunchIdea": "Teriyaki Tofu Rice Box",
        "lunchBudget": "$14",
        "cafeName": "Green Bento Lab",
        "cafeLocation": "King Street, Perth",
        "cafeWebsite": "https://example.com/green-bento-lab",
        "walkingTime": "15",
        "tags": ["#vegetarian", "#tofu", "#japanese", SEED_TAG],
    },
    {
        "lunchIdea": "Classic Cheeseburger",
        "lunchBudget": "$16",
        "cafeName": "Stack Burger Club",
        "cafeLocation": "Roe Street, Perth",
        "cafeWebsite": "https://example.com/stack-burger-club",
        "walkingTime": "20",
        "tags": ["#burger", "#american", "#comfortfood", SEED_TAG],
    },
    {
        "lunchIdea": "Falafel Wrap",
        "lunchBudget": "$13",
        "cafeName": "Cedars Wrap Bar",
        "cafeLocation": "Pier Street, Perth",
        "cafeWebsite": "https://example.com/cedars-wrap-bar",
        "walkingTime": "10",
        "tags": ["#middleeastern", "#vegetarian", "#wrap", SEED_TAG],
    },
    {
        "lunchIdea": "Miso Udon",
        "lunchBudget": "$15",
        "cafeName": "Udon Works",
        "cafeLocation": "Lake Street, Perth",
        "cafeWebsite": "https://example.com/udon-works",
        "walkingTime": "15",
        "tags": ["#udon", "#soup", "#japanese", SEED_TAG],
    },
    {
        "lunchIdea": "Crispy Chicken Caesar Salad",
        "lunchBudget": "$14",
        "cafeName": "Leaf & Lemon",
        "cafeLocation": "Howard Street, Perth",
        "cafeWebsite": "https://example.com/leaf-and-lemon",
        "walkingTime": "5",
        "tags": ["#salad", "#healthy", "#chicken", SEED_TAG],
    },
    {
        "lunchIdea": "Beef Rendang Rice",
        "lunchBudget": "$18",
        "cafeName": "Spice Dock",
        "cafeLocation": "Beaufort Street, Perth",
        "cafeWebsite": "https://example.com/spice-dock",
        "walkingTime": "25",
        "tags": ["#malaysian", "#rice", "#spicy", SEED_TAG],
    },
    {
        "lunchIdea": "Avocado Halloumi Toast",
        "lunchBudget": "$15",
        "cafeName": "Brunch Circuit",
        "cafeLocation": "Adelaide Terrace, Perth",
        "cafeWebsite": "https://example.com/brunch-circuit",
        "walkingTime": "10",
        "tags": ["#brunch", "#vegetarian", "#toast", SEED_TAG],
    },
    {
        "lunchIdea": "Kimchi Beef Bibimbap",
        "lunchBudget": "$17",
        "cafeName": "Seoul Lunch Spot",
        "cafeLocation": "Wellington Street, Perth",
        "cafeWebsite": "https://example.com/seoul-lunch-spot",
        "walkingTime": "20",
        "tags": ["#korean", "#rice", "#spicy", SEED_TAG],
    },
    {
        "lunchIdea": "Butter Chicken Wrap",
        "lunchBudget": "$14",
        "cafeName": "Curry Fold",
        "cafeLocation": "Cloisters Arcade, Perth",
        "cafeWebsite": "https://example.com/curry-fold",
        "walkingTime": "5",
        "tags": ["#indian", "#wrap", "#chicken", SEED_TAG],
    },
    {
        "lunchIdea": "Truffle Mushroom Risotto",
        "lunchBudget": "$19",
        "cafeName": "North Oak Bistro",
        "cafeLocation": "Milligan Street, Perth",
        "cafeWebsite": "https://example.com/north-oak-bistro",
        "walkingTime": "20",
        "tags": ["#risotto", "#vegetarian", "#italian", SEED_TAG],
    },
    {
        "lunchIdea": "Hot Honey Chicken Sandwich",
        "lunchBudget": "$16",
        "cafeName": "Golden Crumb",
        "cafeLocation": "Wolf Lane, Perth",
        "cafeWebsite": "https://example.com/golden-crumb",
        "walkingTime": "10",
        "tags": ["#sandwich", "#chicken", "#spicy", SEED_TAG],
    },
    {
        "lunchIdea": "Prawn Laksa",
        "lunchBudget": "$18",
        "cafeName": "Lantern Noodle Bar",
        "cafeLocation": "James Street, Perth",
        "cafeWebsite": "https://example.com/lantern-noodle-bar",
        "walkingTime": "25",
        "tags": ["#laksa", "#seafood", "#soup", SEED_TAG],
    },
    {
        "lunchIdea": "Mediterranean Grain Bowl",
        "lunchBudget": "$15",
        "cafeName": "Harvest Table",
        "cafeLocation": "Spring Street, Perth",
        "cafeWebsite": "https://example.com/harvest-table",
        "walkingTime": "15",
        "tags": ["#healthy", "#bowl", "#vegetarian", SEED_TAG],
    },
    {
        "lunchIdea": "Pulled Pork Burrito",
        "lunchBudget": "$16",
        "cafeName": "Southwest Parcel",
        "cafeLocation": "Queen Street, Perth",
        "cafeWebsite": "https://example.com/southwest-parcel",
        "walkingTime": "20",
        "tags": ["#mexican", "#burrito", "#pork", SEED_TAG],
    },
    {
        "lunchIdea": "Garlic Butter Prawn Pasta",
        "lunchBudget": "$20",
        "cafeName": "Dockside Pantry",
        "cafeLocation": "Riverside Drive, Perth",
        "cafeWebsite": "https://example.com/dockside-pantry",
        "walkingTime": "25",
        "tags": ["#pasta", "#seafood", "#italian", SEED_TAG],
    },
    {
        "lunchIdea": "Chicken Schnitzel Roll",
        "lunchBudget": "$14",
        "cafeName": "Roll Call Deli",
        "cafeLocation": "West Perth",
        "cafeWebsite": "https://example.com/roll-call-deli",
        "walkingTime": "15",
        "tags": ["#deli", "#chicken", "#quickbite", SEED_TAG],
    },
    {
        "lunchIdea": "Paneer Tikka Bowl",
        "lunchBudget": "$15",
        "cafeName": "Masala Bench",
        "cafeLocation": "East Perth",
        "cafeWebsite": "https://example.com/masala-bench",
        "walkingTime": "20",
        "tags": ["#indian", "#vegetarian", "#bowl", SEED_TAG],
    },
    {
        "lunchIdea": "Smoked Turkey Croissant",
        "lunchBudget": "$13",
        "cafeName": "Morning Fold",
        "cafeLocation": "Perth CBD",
        "cafeWebsite": "https://example.com/morning-fold",
        "walkingTime": "5",
        "tags": ["#croissant", "#turkey", "#lightlunch", SEED_TAG],
    },
]


def load_mongodb_uri():
    for filename in (".env.local", ".env"):
        path = Path(filename)
        if not path.exists():
            continue

        for line in path.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            if key.strip() == "MONGODB_URI":
                return value.strip().strip('"').strip("'")

    raise RuntimeError("Missing MONGODB_URI in .env.local or .env")


def build_seed_documents(users):
    documents = []

    for index, idea in enumerate(LUNCH_IDEAS[:TARGET_COUNT]):
        user = users[index % len(users)]
        documents.append(
            {
                "creator": user["_id"],
                "lunchIdea": idea["lunchIdea"],
                "lunchBudget": idea["lunchBudget"],
                "cafeName": idea["cafeName"],
                "cafeLocation": idea["cafeLocation"],
                "cafeWebsite": idea["cafeWebsite"],
                "walkingTime": idea["walkingTime"],
                "tags": idea["tags"],
            }
        )

    return documents


def main():
    uri = load_mongodb_uri()
    client = MongoClient(uri)

    try:
        db = client[DATABASE_NAME]
        users = list(db.users.find({}, {"_id": 1}).sort("_id", 1))

        if not users:
            raise RuntimeError("No users found. Sign in at least once before seeding.")

        deleted_count = db.lunchideas.delete_many({"tags": SEED_TAG}).deleted_count
        seed_documents = build_seed_documents(users)

        if not seed_documents:
            raise RuntimeError("No seed documents generated.")

        insert_result = db.lunchideas.insert_many(seed_documents)

        print(
            {
                "users": len(users),
                "deleted_seeded_docs": deleted_count,
                "inserted_lunchideas": len(insert_result.inserted_ids),
            }
        )
    finally:
        client.close()


if __name__ == "__main__":
    main()
