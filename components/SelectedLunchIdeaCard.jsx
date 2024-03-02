"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const SelectedLunchIdeaCard = ({ post }) => {
  return (
    <div className="idea_card mint_gradient">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
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
