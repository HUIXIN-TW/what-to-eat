from pathlib import Path

from pymongo import MongoClient


SEED_TAG = "#seeded"
DATABASE_NAME = "what-to-eat"
TARGET_COUNT = 30
LUNCH_IDEAS = [
    {
        "lunchIdea": "Chicken Shawarma Plate",
        "lunchBudget": "$17",
        "cafeName": "Saffron Street Eatery",
        "cafeLocation": "Murray Street, Perth",
        "cafeWebsite": "https://example.com/saffron-street-eatery",
        "walkingTime": "12",
        "tags": ["#middleeastern", "#chicken", "#rice", SEED_TAG],
    },
    {
        "lunchIdea": "Spicy Pork Ramen",
        "lunchBudget": "$18",
        "cafeName": "Broth District",
        "cafeLocation": "Barrack Street, Perth",
        "cafeWebsite": "https://example.com/broth-district",
        "walkingTime": "15",
        "tags": ["#ramen", "#japanese", "#spicy", SEED_TAG],
    },
    {
        "lunchIdea": "Roasted Pumpkin Feta Salad",
        "lunchBudget": "$14",
        "cafeName": "Garden Bowl Co",
        "cafeLocation": "St Georges Terrace, Perth",
        "cafeWebsite": "https://example.com/garden-bowl-co",
        "walkingTime": "8",
        "tags": ["#salad", "#vegetarian", "#healthy", SEED_TAG],
    },
    {
        "lunchIdea": "BBQ Beef Brisket Burger",
        "lunchBudget": "$19",
        "cafeName": "Iron Grill House",
        "cafeLocation": "William Street, Perth",
        "cafeWebsite": "https://example.com/iron-grill-house",
        "walkingTime": "18",
        "tags": ["#burger", "#beef", "#american", SEED_TAG],
    },
    {
        "lunchIdea": "Chicken Pesto Panini",
        "lunchBudget": "$14",
        "cafeName": "Pressed Pantry",
        "cafeLocation": "King Street, Perth",
        "cafeWebsite": "https://example.com/pressed-pantry",
        "walkingTime": "10",
        "tags": ["#panini", "#chicken", "#quickbite", SEED_TAG],
    },
    {
        "lunchIdea": "Mushroom Swiss Toastie",
        "lunchBudget": "$13",
        "cafeName": "Toast Theory",
        "cafeLocation": "Hay Street, Perth",
        "cafeWebsite": "https://example.com/toast-theory",
        "walkingTime": "6",
        "tags": ["#toastie", "#vegetarian", "#comfortfood", SEED_TAG],
    },
    {
        "lunchIdea": "Lemongrass Chicken Vermicelli",
        "lunchBudget": "$16",
        "cafeName": "Saigon Alley Bowl",
        "cafeLocation": "Pier Street, Perth",
        "cafeWebsite": "https://example.com/saigon-alley-bowl",
        "walkingTime": "14",
        "tags": ["#vietnamese", "#noodles", "#chicken", SEED_TAG],
    },
    {
        "lunchIdea": "Cajun Chicken Burrito Bowl",
        "lunchBudget": "$17",
        "cafeName": "Mesa Kitchen",
        "cafeLocation": "Wellington Street, Perth",
        "cafeWebsite": "https://example.com/mesa-kitchen",
        "walkingTime": "16",
        "tags": ["#mexican", "#bowl", "#chicken", SEED_TAG],
    },
    {
        "lunchIdea": "Margherita Pizza Slice Set",
        "lunchBudget": "$15",
        "cafeName": "Stone Slice Bar",
        "cafeLocation": "Wolf Lane, Perth",
        "cafeWebsite": "https://example.com/stone-slice-bar",
        "walkingTime": "9",
        "tags": ["#pizza", "#italian", "#vegetarian", SEED_TAG],
    },
    {
        "lunchIdea": "Korean Fried Chicken Box",
        "lunchBudget": "$17",
        "cafeName": "Seoul Crunch",
        "cafeLocation": "Lake Street, Perth",
        "cafeWebsite": "https://example.com/seoul-crunch",
        "walkingTime": "13",
        "tags": ["#korean", "#chicken", "#crispy", SEED_TAG],
    },
    {
        "lunchIdea": "Tandoori Chicken Rice Bowl",
        "lunchBudget": "$16",
        "cafeName": "Spice Yard Kitchen",
        "cafeLocation": "Adelaide Terrace, Perth",
        "cafeWebsite": "https://example.com/spice-yard-kitchen",
        "walkingTime": "15",
        "tags": ["#indian", "#chicken", "#rice", SEED_TAG],
    },
    {
        "lunchIdea": "Eggplant Parmigiana Roll",
        "lunchBudget": "$14",
        "cafeName": "Roma Corner Deli",
        "cafeLocation": "Howard Street, Perth",
        "cafeWebsite": "https://example.com/roma-corner-deli",
        "walkingTime": "7",
        "tags": ["#italian", "#vegetarian", "#roll", SEED_TAG],
    },
    {
        "lunchIdea": "Grilled Chicken Soba Salad",
        "lunchBudget": "$15",
        "cafeName": "Nori Market",
        "cafeLocation": "Queen Street, Perth",
        "cafeWebsite": "https://example.com/nori-market",
        "walkingTime": "11",
        "tags": ["#japanese", "#salad", "#healthy", SEED_TAG],
    },
    {
        "lunchIdea": "Beef Meatball Sub",
        "lunchBudget": "$16",
        "cafeName": "Sub Station Perth",
        "cafeLocation": "Roe Street, Perth",
        "cafeWebsite": "https://example.com/sub-station-perth",
        "walkingTime": "17",
        "tags": ["#sandwich", "#beef", "#comfortfood", SEED_TAG],
    },
    {
        "lunchIdea": "Chilli Basil Tofu Noodles",
        "lunchBudget": "$14",
        "cafeName": "Wok Bloom",
        "cafeLocation": "James Street, Perth",
        "cafeWebsite": "https://example.com/wok-bloom",
        "walkingTime": "19",
        "tags": ["#tofu", "#noodles", "#spicy", SEED_TAG],
    },
    {
        "lunchIdea": "Turkey Cranberry Wrap",
        "lunchBudget": "$13",
        "cafeName": "Wrap Lab",
        "cafeLocation": "Milligan Street, Perth",
        "cafeWebsite": "https://example.com/wrap-lab",
        "walkingTime": "8",
        "tags": ["#wrap", "#turkey", "#lightlunch", SEED_TAG],
    },
    {
        "lunchIdea": "Chorizo Paella Bowl",
        "lunchBudget": "$18",
        "cafeName": "Iberian Table",
        "cafeLocation": "Spring Street, Perth",
        "cafeWebsite": "https://example.com/iberian-table",
        "walkingTime": "18",
        "tags": ["#spanish", "#rice", "#chorizo", SEED_TAG],
    },
    {
        "lunchIdea": "Crumbed Fish Taco Duo",
        "lunchBudget": "$16",
        "cafeName": "Baja Bite Co",
        "cafeLocation": "Cloisters Arcade, Perth",
        "cafeWebsite": "https://example.com/baja-bite-co",
        "walkingTime": "6",
        "tags": ["#mexican", "#seafood", "#tacos", SEED_TAG],
    },
    {
        "lunchIdea": "Spinach Ricotta Ravioli",
        "lunchBudget": "$18",
        "cafeName": "Pasta Assembly",
        "cafeLocation": "West Perth",
        "cafeWebsite": "https://example.com/pasta-assembly",
        "walkingTime": "20",
        "tags": ["#pasta", "#vegetarian", "#italian", SEED_TAG],
    },
    {
        "lunchIdea": "Chicken Satay Rice Box",
        "lunchBudget": "$15",
        "cafeName": "Satay Social",
        "cafeLocation": "East Perth",
        "cafeWebsite": "https://example.com/satay-social",
        "walkingTime": "22",
        "tags": ["#asian", "#chicken", "#rice", SEED_TAG],
    },
    {
        "lunchIdea": "Halloumi Couscous Bowl",
        "lunchBudget": "$14",
        "cafeName": "Sunny Grain",
        "cafeLocation": "Perth CBD",
        "cafeWebsite": "https://example.com/sunny-grain",
        "walkingTime": "9",
        "tags": ["#vegetarian", "#bowl", "#healthy", SEED_TAG],
    },
    {
        "lunchIdea": "Smoked Beef Reuben",
        "lunchBudget": "$17",
        "cafeName": "Deli Junction",
        "cafeLocation": "Barrack Street, Perth",
        "cafeWebsite": "https://example.com/deli-junction",
        "walkingTime": "14",
        "tags": ["#sandwich", "#beef", "#deli", SEED_TAG],
    },
    {
        "lunchIdea": "Prawn Mango Salad",
        "lunchBudget": "$17",
        "cafeName": "Coastline Greens",
        "cafeLocation": "Murray Street, Perth",
        "cafeWebsite": "https://example.com/coastline-greens",
        "walkingTime": "12",
        "tags": ["#seafood", "#salad", "#fresh", SEED_TAG],
    },
    {
        "lunchIdea": "Bulgogi Lettuce Wrap Set",
        "lunchBudget": "$18",
        "cafeName": "Han Table Express",
        "cafeLocation": "Wellington Street, Perth",
        "cafeWebsite": "https://example.com/han-table-express",
        "walkingTime": "16",
        "tags": ["#korean", "#beef", "#wrap", SEED_TAG],
    },
    {
        "lunchIdea": "Chicken Schnitzel Pasta",
        "lunchBudget": "$18",
        "cafeName": "Southern Fork Bistro",
        "cafeLocation": "Hay Street, Perth",
        "cafeWebsite": "https://example.com/southern-fork-bistro",
        "walkingTime": "18",
        "tags": ["#pasta", "#chicken", "#comfortfood", SEED_TAG],
    },
    {
        "lunchIdea": "Thai Green Curry Noodles",
        "lunchBudget": "$16",
        "cafeName": "Bangkok Bench",
        "cafeLocation": "King Street, Perth",
        "cafeWebsite": "https://example.com/bangkok-bench",
        "walkingTime": "11",
        "tags": ["#thai", "#noodles", "#spicy", SEED_TAG],
    },
    {
        "lunchIdea": "Roasted Veggie Focaccia",
        "lunchBudget": "$13",
        "cafeName": "Focaccia Fold",
        "cafeLocation": "St Georges Terrace, Perth",
        "cafeWebsite": "https://example.com/focaccia-fold",
        "walkingTime": "5",
        "tags": ["#vegetarian", "#sandwich", "#lightlunch", SEED_TAG],
    },
    {
        "lunchIdea": "Crispy Pork Rice Bowl",
        "lunchBudget": "$17",
        "cafeName": "Rice Theory",
        "cafeLocation": "William Street, Perth",
        "cafeWebsite": "https://example.com/rice-theory",
        "walkingTime": "13",
        "tags": ["#rice", "#pork", "#asian", SEED_TAG],
    },
    {
        "lunchIdea": "Buffalo Chicken Wrap",
        "lunchBudget": "$15",
        "cafeName": "City Wrap Co",
        "cafeLocation": "Pier Street, Perth",
        "cafeWebsite": "https://example.com/city-wrap-co",
        "walkingTime": "10",
        "tags": ["#wrap", "#chicken", "#spicy", SEED_TAG],
    },
    {
        "lunchIdea": "Mushroom Truffle Gnocchi",
        "lunchBudget": "$19",
        "cafeName": "Oak & Butter",
        "cafeLocation": "Riverside Drive, Perth",
        "cafeWebsite": "https://example.com/oak-and-butter",
        "walkingTime": "24",
        "tags": ["#gnocchi", "#italian", "#vegetarian", SEED_TAG],
    },
    {
        "lunchIdea": "Harissa Chicken Flatbread",
        "lunchBudget": "$16",
        "cafeName": "Ember Flatbread House",
        "cafeLocation": "Beaufort Street, Perth",
        "cafeWebsite": "https://example.com/ember-flatbread-house",
        "walkingTime": "25",
        "tags": ["#flatbread", "#chicken", "#middleeastern", SEED_TAG],
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
        # spread the seed ideas to all users
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
