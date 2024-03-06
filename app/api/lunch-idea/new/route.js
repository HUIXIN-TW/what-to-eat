import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

// Function to preprocess, split, and clean tags
function preprocessAndCleanTags(tagsString) {
  // Assuming tags are submitted as a single string, e.g., "#coffee #vegan"
  const separators = /[\s,]+/;
  const rawTags = tagsString
    .split(separators)
    .filter((tag) => tag.startsWith("#")); // Ensure tag starts with "#"
  let cleanedTags = rawTags
    .map((tag, index) => {
      // Use match to extract alphanumeric characters and join them back to a string
      const matchedParts = tag.slice(1).match(/[a-zA-Z0-9]+/g);
      if (!matchedParts) return ""; // Return empty string if no matches (avoids undefined)
      let cleanedTag = "#" + matchedParts.join("").toLowerCase(); // Join matched parts and convert to lowercase
      return cleanedTag;})
    .filter((tag) => tag !== "#"); // Filter out any tags that are just "#"

  // Remove duplicate tags
  cleanedTags = [...new Set(cleanedTags)];

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
    return new Response(
      JSON.stringify({
        error: "Missing required fields",
      }),
      {
        status: 400,
      },
    );
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
