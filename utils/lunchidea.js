const MAX_LENGTH = {
  lunchIdea: 120,
  lunchBudget: 60,
  cafeName: 120,
  cafeLocation: 200,
  cafeWebsite: 2048,
};

const ALLOWED_WALKING_TIMES = new Set(["", "5", "10", "15", "20", "25", "30"]);

const normalizeString = (value) =>
  typeof value === "string" ? value.trim() : "";

export function preprocessAndCleanTags(tagsInput) {
  const tagsString = Array.isArray(tagsInput)
    ? tagsInput.join(" ")
    : typeof tagsInput === "string"
      ? tagsInput
      : "";

  const rawTags = tagsString
    .split(/[\s,]+/)
    .filter((tag) => tag.startsWith("#"));

  const uniqueTags = new Set();

  rawTags.forEach((tag) => {
    const cleanedTagBody = tag
      .slice(1)
      .replace(/[^\w\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\-]+/gu, "")
      .toLowerCase()
      .slice(0, 30);

    if (cleanedTagBody) {
      uniqueTags.add(`#${cleanedTagBody}`);
    }
  });

  return Array.from(uniqueTags);
}

export function capitalizeEachWord(string) {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeWebsite(url) {
  const trimmedUrl = normalizeString(url);

  if (!trimmedUrl) {
    return { error: null, value: "" };
  }

  const candidate = /^https?:\/\//i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`;

  try {
    const parsedUrl = new URL(candidate);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return {
        error: "Cafe website must use http or https.",
        value: "",
      };
    }

    return { error: null, value: parsedUrl.toString() };
  } catch {
    return {
      error: "Cafe website must be a valid URL.",
      value: "",
    };
  }
}

function validateLength(label, value, maxLength, errors) {
  if (value.length > maxLength) {
    errors.push(`${label} must be ${maxLength} characters or fewer.`);
  }
}

export function validateLunchIdeaPayload(payload) {
  const lunchIdea = normalizeString(payload?.lunchIdea);
  const lunchBudget = normalizeString(payload?.lunchBudget);
  const cafeName = normalizeString(payload?.cafeName);
  const cafeLocation = normalizeString(payload?.cafeLocation);
  const walkingTime = normalizeString(payload?.walkingTime);
  const tags = preprocessAndCleanTags(payload?.tags);

  const { error: websiteError, value: cafeWebsite } = normalizeWebsite(
    payload?.cafeWebsite,
  );

  const errors = [];

  if (!lunchIdea) {
    errors.push("Lunch idea is required.");
  }

  if (!cafeName) {
    errors.push("Cafe name is required.");
  }

  if (tags.length === 0) {
    errors.push("At least one valid tag is required.");
  }

  if (!ALLOWED_WALKING_TIMES.has(walkingTime)) {
    errors.push("Walking time must be one of 5, 10, 15, 20, 25, or 30.");
  }

  if (websiteError) {
    errors.push(websiteError);
  }

  validateLength("Lunch idea", lunchIdea, MAX_LENGTH.lunchIdea, errors);
  validateLength("Lunch budget", lunchBudget, MAX_LENGTH.lunchBudget, errors);
  validateLength("Cafe name", cafeName, MAX_LENGTH.cafeName, errors);
  validateLength("Cafe location", cafeLocation, MAX_LENGTH.cafeLocation, errors);
  validateLength("Cafe website", cafeWebsite, MAX_LENGTH.cafeWebsite, errors);

  return {
    data: {
      lunchIdea: capitalizeEachWord(lunchIdea),
      lunchBudget,
      tags,
      cafeName: capitalizeEachWord(cafeName),
      cafeLocation,
      cafeWebsite,
      walkingTime,
    },
    errors,
  };
}
