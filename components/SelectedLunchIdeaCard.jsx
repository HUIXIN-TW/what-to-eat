"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const SelectedLunchIdeaCard = ({ post }) => {
  const [gradientClass, setGradientClass] = useState("");

  // Function to return a random gradient class name
  const randomGradient = () => {
    const gradients = [
      "orange_gradient",
      "mint_gradient",
      "blue_gradient",
      "purple_gradient",
      "red_gradient",
      "green_gradient",
      "sunrise_gradient",
      "deep_sea_gradient",
      "warm_sunset_gradient",
      "cool_blue_gradient",
      "lime_gradient",
      "indigo_gradient",
      "teal_gradient",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  useEffect(() => {
    // Update the gradient initially
    setGradientClass(randomGradient());

    // Set up an interval to update the gradient every 1 second
    const intervalId = setInterval(() => {
      setGradientClass(randomGradient());
    }, 4000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`idea_card ${gradientClass}`}>
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src="/assets/images/lunch-box-blue-yellow.webp"
            alt="user image"
            width={100}
            height={100}
            className="object-contain"
            priority
          />

          {/* Lunch Idea */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 text-lg">
              Lets EAT {post.lunchIdea}
            </h3>
          </div>
        </div>
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

      {/* Tags Zone */}
      <div className="mt-2 flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="font-inter text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full cursor-pointer hover:bg-green-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectedLunchIdeaCard;
