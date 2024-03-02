import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

export const GET = async (request) => {
  try {
    // Connect to the database, and fetch all lunchideas
    await connectToDatabase();

    // Fetch all lunchideas
    const lunchideas = await LunchIdea.find({}).populate("creator");

    // Create a new Response object with lunchideas and set Cache-Control header
    const responseBody = JSON.stringify(lunchideas);
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache", // Set Cache-Control header to disable caching
    };

    return new Response(responseBody, { status: 200, headers });
  } catch (error) {
    return new Response("Failed to fetch all lunchideas", { status: 500 });
  }
};
