import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

export const GET = async (request) => {
  try {
    // Connect to the database, and fetch all lunchideas
    await connectToDatabase();

    // Fetch all lunchideas
    const lunchideas = await LunchIdea.find({}).populate("creator");

    return new Response(JSON.stringify(lunchideas), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all lunchideas", { status: 500 });
  }
};
