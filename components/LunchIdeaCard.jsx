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
        {post.creator._id !== session?.user.id && (
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
        )}
      </div>

      {/* Lunch Information */}
      <p className="font-inter font-semibold text-sm text-gray-700 mt-2">
        Café: <span className="font-normal">{post.cafeName || "N/A"}</span>
      </p>
      <p className="font-inter font-semibold text-sm text-gray-700">
        Walking Time:{" "}
        <span className="font-normal">
          {post.walkingTime ? `${post.walkingTime} mins` : "N/A"}
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
