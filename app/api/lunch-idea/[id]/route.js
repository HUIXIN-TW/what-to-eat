import { getServerSession } from "next-auth";

import LunchIdea from "@models/lunchidea";
import { authOptions } from "@utils/auth";
import { connectToDatabase } from "@utils/database";
import { validateLunchIdeaPayload } from "@utils/lunchidea";

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
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new Response(JSON.stringify({ message: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();
    const payload = await request.json();
    const { data, errors } = validateLunchIdeaPayload(payload);

    if (errors.length > 0) {
      return new Response(JSON.stringify({ message: "Validation failed", errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingLunchIdea = await LunchIdea.findById(params.id);

    if (!existingLunchIdea) {
      return new Response(JSON.stringify({ message: "LunchIdea not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (existingLunchIdea.creator.toString() !== session.user.id) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    existingLunchIdea.lunchIdea = data.lunchIdea;
    existingLunchIdea.lunchBudget = data.lunchBudget;
    existingLunchIdea.tags = data.tags;
    existingLunchIdea.cafeName = data.cafeName;
    existingLunchIdea.cafeLocation = data.cafeLocation;
    existingLunchIdea.cafeWebsite = data.cafeWebsite;
    existingLunchIdea.walkingTime = data.walkingTime;

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
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new Response(JSON.stringify({ message: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    const existingLunchIdea = await LunchIdea.findById(params.id);

    if (!existingLunchIdea) {
      return new Response(JSON.stringify({ message: "LunchIdea not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (existingLunchIdea.creator.toString() !== session.user.id) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    await LunchIdea.deleteOne({ _id: params.id });

    return new Response(
      JSON.stringify({ message: "LunchIdea deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error deleting lunchIdea: ", error.message);
    return new Response(JSON.stringify({ message: "Error deleting lunchIdea" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
