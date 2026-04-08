import { getServerSession } from "next-auth";

import LunchIdea from "@models/lunchidea";
import { authOptions } from "@utils/auth";
import { connectToDatabase } from "@utils/database";
import { validateLunchIdeaPayload } from "@utils/lunchidea";

export const POST = async (request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = await request.json();
  const { data, errors } = validateLunchIdeaPayload(payload);

  if (errors.length > 0) {
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectToDatabase();
    const newLunchIdea = new LunchIdea({
      creator: session.user.id,
      ...data,
    });
    await newLunchIdea.save();

    return new Response(
      JSON.stringify({
        message: "Lunch Idea created successfully",
        id: newLunchIdea._id,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create a new lunch idea" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
