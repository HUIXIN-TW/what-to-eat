"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const LunchIdeaCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  // Using the useSession hook from next-auth/react to access the current session data, if available.
  const { data: session } = useSession();

  // Using usePathname hook from next/navigation to get the current path name of the router.
  const pathName = usePathname();

  // Using useRouter hook from next/navigation to access the router object for navigation purposes.
  const router = useRouter();

  // State to keep track of which post's lunch idea has been copied to the clipboard.
  const [copyWordId, setCopyWordId] = useState(null);

  // State to keep track of which post's lunch idea has been copied to the user's profile.
  const [copyPostId, setCopyPostId] = useState(null);

  // Boolean value to determine if the current user can edit or delete the post.
  // This is true if the user is the creator of the post and they are currently viewing their profile page.
  const canEditOrDelete =
    session?.user.id === post.creator._id && pathName === "/profile";

  // Function to handle clicks on the profile section of the card.
  // If the current user is the creator of the post, navigate to the user's profile.
  // Otherwise, navigate to the profile of the post's creator with their ID and username in the query parameters.
  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // Asynchronous function to handle the action of copying the lunch idea text to the clipboard.
  // On success, it sets the copyWordId state to the current post's ID, then resets it after 3 seconds.
  // If the copy action fails, it logs the error to the console. Optionally, you can implement user feedback here.
  const handleCopyWordClick = async () => {
    try {
      await navigator.clipboard.writeText(post.lunchIdea); // Note: Ensure the field name matches your post object structure
      setCopyWordId(post._id);
      setTimeout(() => setCopyWordId(null), 3000); // Reset copyWordId after 3 seconds
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const handleCopyPostClick = async () => {
    // Navigate to the copy-lunch-idea page with parameters
    try {
      setCopyPostId(post._id);
      setTimeout(() => setCopyPostId(null), 3000); // Reset copyPostId after 3 seconds
      router.push(`/copy-lunch-idea?id=${post._id}`);
    } catch (error) {
      console.error("Navigation to copy failed", error);
    }
  };

  // Function to open the cafe location in Google Maps
  const handleLocationClick = () => {
    if (post.cafeLocation) {
      const encodedLocation = encodeURIComponent(post.cafeLocation);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Function to open the cafe website URL
  const handleUrlClick = () => {
    if (
      post.cafeWebsite &&
      (post.cafeWebsite.startsWith("http://") ||
        post.cafeWebsite.startsWith("https://"))
    ) {
      window.open(post.cafeWebsite, "_blank", "noopener,noreferrer");
    } else if (post.cafeWebsite) {
      // Add 'http://' prefix if missing
      window.open(
        `http://${post.cafeWebsite}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  // Function to truncate a URL to a specified length and add an ellipsis if it exceeds the length.
  const truncateUrl = (url, maxLength) => {
    if (typeof url !== "string" || maxLength < 3) {
      return url; // Return the original URL if it's not a string or maxLength is less than 3
    }

    if (url.length <= maxLength) {
      return url;
    }

    // Truncate and add ellipsis
    return `${url.substring(0, maxLength - 3)}...`;
  };

  return (
    <div className="idea_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {/* Lunch Idea with Image Display */}
          <Image
            src={
              post.creator.image || "/assets/images/lunch-box-blue-yellow.webp"
            }
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onClick={handleProfileClick}
            priority
          />

          {/* Lunch Idea with Image Display */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 text-lg">
              {post.lunchIdea}
            </h3>
          </div>
        </div>

        <div>
          {/* Copy Button */}
          <div
            className="copy_btn"
            onClick={handleCopyWordClick}
            role="button"
            tabIndex={0}
            aria-label="Copy lunch idea"
            onKeyDown={(e) => e.key === "Enter" && handleCopyWordClick()}
          >
            <Image
              src={
                copyWordId === post._id
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copyWordId === post._id ? "tick_icon" : "copy_icon"}
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* Add Button */}
        <div
          className="copy_btn"
          onClick={handleCopyPostClick}
          role="button"
          tabIndex={0}
          aria-label="Add lunch idea to my profile"
          onKeyDown={(e) => e.key === "Enter" && handleCopyPostClick}
        >
          <Image
            src={
              copyPostId === post._id
                ? "/assets/icons/tick.svg"
                : "/assets/icons/add.svg"
            }
            alt={copyPostId === post._id ? "tick_icon" : "add_icon"}
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* Lunch Information */}
      <p className="font-inter font-semibold text-sm text-gray-700 mt-2">
        Budget: <span className="font-normal">{post.lunchBudget || "N/A"}</span>
      </p>
      <p className="font-inter font-semibold text-sm text-gray-700">
        Walking Time:{" "}
        <span className="font-normal">
          {post.walkingTime ? `${post.walkingTime} mins` : "N/A"}
        </span>
      </p>
      <p className="font-inter font-semibold text-sm text-gray-700 mt-2">
        Café: <span className="font-normal">{post.cafeName || "N/A"}</span>
      </p>
      <p className="font-inter font-semibold text-sm text-gray-700">
        Location:{" "}
        <span
          className="font-normal cursor-pointer"
          onClick={handleLocationClick}
          title={post.cafeLocation} // Shows the full location on hover
        >
          {post.cafeLocation || "N/A"}
        </span>
      </p>
      <p className="font-inter font-semibold text-sm text-gray-700">
        URL:{" "}
        <span
          className="font-normal cursor-pointer"
          onClick={handleUrlClick}
          title={post.cafeWebsite} // Shows the full URL on hover
        >
          {post.cafeWebsite ? truncateUrl(post.cafeWebsite, 30) : "N/A"}
        </span>
      </p>

      <p className="font-inter text-sm text-gray-500 mt-2">
        Posted by: {post.creator.username}
      </p>

      {/* Tags Zone */}
      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="font-inter text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full cursor-pointer hover:bg-green-300"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Owner Zone */}
      {canEditOrDelete && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default LunchIdeaCard;
