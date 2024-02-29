import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

// Function to preprocess, split, and clean tags
function preprocessAndCleanTags(tagsString) {
  // Assuming tags are submitted as a single string, e.g., "#coffee #vegan"
  const separators = /[\s,]+/;
  const rawTags = tagsString
    .split(separators)
    .filter((tag) => tag.startsWith("#"));
  const cleanedTags = rawTags.map((tag) => {
    let cleanedTag =
      "#" +
      tag
        .slice(1)
        .match(/[a-zA-Z0-9]+/g)
        ?.join("");
    cleanedTag = cleanedTag.toLowerCase();
    return cleanedTag;
  });
  return cleanedTags;
}

// Function to capitalize the first letter of each word in a string
function capitalizeEachWord(string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const POST = async (request) => {
  const {
    userId,
    lunchIdea,
    tags: tagsString,
    cafeName,
    walkingTime,
  } = await request.json();

  const cleanedTags = preprocessAndCleanTags(tagsString);

  // Validate all required fields
  if (!userId || !lunchIdea || !tagsString || !cafeName) {
    return new Response(JSON.stringify({ error: "missing fields" }), {
      status: 400,
    });
  }

  try {
    await connectToDatabase();
    const newLunchIdea = new LunchIdea({
      creator: userId,
      lunchIdea: capitalizeEachWord(lunchIdea.trim()),
      tags: cleanedTags,
      cafeName: capitalizeEachWord(cafeName.trim()),
      walkingTime,
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
    return new Response("Failed to create a new Lunch Idea", {
      status: 500,
      statusText: error.message,
    });
  }
};
