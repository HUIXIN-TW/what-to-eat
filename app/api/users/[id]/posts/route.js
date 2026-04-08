import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();
    const { id } = await params;

    // Fetch lunchIdeas created by user with id
    const lunchIdeas = await LunchIdea.find({ creator: id }).populate(
      "creator",
    );

    return new Response(JSON.stringify(lunchIdeas), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch lunchIdeas created by user", {
      status: 500,
    });
  }
};
