import LunchIdea from "@models/lunchidea";
import { connectToDatabase } from "@utils/database";

function preprocessAndCleanTags(tagsString) {
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
      /[^\w\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]+/gu,
      "",
    );

    // Re-add '#' and convert to lowercase
    return "#" + cleanedTagBody.toLowerCase();
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
    lunchBudget,
    tags: tagsString,
    cafeName,
    cafeLocation,
    cafeWebsite,
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
      lunchBudget,
      tags: cleanedTags,
      cafeName: capitalizeEachWord(cafeName.trim()),
      cafeLocation,
      cafeWebsite,
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
