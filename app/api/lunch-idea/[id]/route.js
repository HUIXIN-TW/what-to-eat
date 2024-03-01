import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

/**
 * Handles the GET request to fetch a specific LunchIdea by ID.
 *
 * @param {Request} request The incoming request object.
 * @param {Object} context Context object containing parameters and other request data.
 * @returns {Response} The response object with the lunch idea data or an error message.
 */
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    // Find the lunch idea by ID and populate the 'creator' field to include creator details
    const lunchIdea = await LunchIdea.findById(params.id).populate("creator");

    // If no lunch idea is found, return a 404 error
    if (!lunchIdea) return new Response("LunchIdea Not Found", { status: 404 });

    // Return the lunch idea as JSON
    return new Response(JSON.stringify(lunchIdea), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

/**
 * Handles the PATCH request to update a specific LunchIdea by ID.
 *
 * @param {Request} request The incoming request object containing the lunch idea and tag in its body.
 * @param {Object} context Context object containing parameters and other request data.
 * @returns {Response} The response object with a success or error message.
 */
export const PATCH = async (request, { params }) => {
  // Destructure the properties from the request's JSON body
  const { lunchIdea, cafeName, walkingTime, tags } = await request.json();

  try {
    await connectToDatabase();

    // Find the existing lunchIdea by ID
    const existingLunchIdea = await LunchIdea.findById(params.id);

    // If no lunch idea is found, return a 404 response
    if (!existingLunchIdea) {
      return new Response("LunchIdea not found", { status: 404 });
    }

    // Update the lunchIdea with new data
    existingLunchIdea.lunchIdea = lunchIdea;
    existingLunchIdea.tags = tags;
    existingLunchIdea.cafeName = cafeName;
    existingLunchIdea.walkingTime = walkingTime;

    await existingLunchIdea.save();

    return new Response("Successfully updated the LunchIdeas", { status: 200 });
  } catch (error) {
    return new Response("Error Updating LunchIdea", { status: 500 });
  }
};

// Handles DELETE requests to remove a specific lunch idea by its ID
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();

    // Log the lunchIdea ID to the console and remove it
    console.log("Trying to remove Item ID: ", params.id);

    // Find the lunchIdea by ID and remove it
    await LunchIdea.findOneAndDelete(params.id);

    return new Response("LunchIdea deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting lunchIdea: ", error.message);
    return new Response("Error deleting lunchIdea: " + error.message, {
      status: 500,
    });
  }
};
