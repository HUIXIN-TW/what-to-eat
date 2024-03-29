import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

function preprocessAndCleanTags(tags) {
  let tagsString = tags.toString();

  // Split by whitespace or commas
  const separators = /[\s,]+/;
  const rawTags = tagsString
    .split(separators)
    .filter((tag) => tag.startsWith("#"));

  const cleanedTags = rawTags.map((tag) => {
    // Remove initial '#' for cleaning
    let tagBody = tag.slice(1);

    // Remove any character that is not a letter, number, or Chinese character
    // This regex includes:
    // - \u3400-\u4DBF: CJK Unified Ideographs Extension A
    // - \u4E00-\u9FFF: CJK Unified Ideographs
    // - \uF900-\uFAFF: CJK Compatibility Ideographs
    // - Plus letters and numbers
    // If you need to include more ranges, add them here.
    let cleanedTagBody = tagBody.replace(
      /[^\w\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\-]+/gu,
      "",
    );

    // Re-add '#' and convert to lowercase
    return "#" + cleanedTagBody.toLowerCase();
  });

  return cleanedTags;
}

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
  try {
    await connectToDatabase();
    // Destructure the properties from the request's JSON body
    const {
      lunchIdea,
      lunchBudget,
      cafeName,
      cafeLocation,
      cafeWebsite,
      walkingTime,
      tags,
    } = await request.json();

    // Find the existing lunchIdea by ID
    const existingLunchIdea = await LunchIdea.findById(params.id);

    // If no lunch idea is found, return a 404 response
    if (!existingLunchIdea) {
      return new Response(JSON.stringify({ message: "LunchIdea not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cleanedTags = preprocessAndCleanTags(tags);

    // Update the lunchIdea with new data
    existingLunchIdea.lunchIdea = lunchIdea;
    existingLunchIdea.lunchBudget = lunchBudget;
    existingLunchIdea.tags = cleanedTags;
    existingLunchIdea.cafeName = cafeName;
    existingLunchIdea.cafeLocation = cafeLocation;
    existingLunchIdea.cafeWebsite = cafeWebsite;
    existingLunchIdea.walkingTime = walkingTime;

    await existingLunchIdea.save();

    return new Response(
      JSON.stringify({ message: "Successfully updated the LunchIdeas" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error Updating LunchIdea: " + error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

// Handles DELETE requests to remove a specific lunch idea by its ID
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();

    // Log the lunchIdea ID to the console and remove it
    console.log("Trying to remove Item ID: ", params.id);

    // Find the lunchIdea by ID and remove it
    await LunchIdea.deleteOne({ _id: params.id });

    // Return a success response
    return new Response("LunchIdea deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting lunchIdea: ", error.message);
    // Return an error response
    return new Response("Error deleting lunchIdea: " + error.message, {
      status: 500,
    });
  }
};
