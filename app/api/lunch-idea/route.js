import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

export const GET = async (request) => {
  try {
    // Connect to the database, and fetch all lunchideas
    await connectToDatabase();

    // Fetch all lunchideas
    const lunchideas = await LunchIdea.find({}).populate("creator");

    return Response.json(lunchideas, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch all lunchideas", error);

    return Response.json(
      { error: "Failed to fetch all lunchideas" },
      { status: 500 },
    );
  }
};
