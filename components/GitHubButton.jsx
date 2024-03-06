"use client";

import { useState } from "react";

const GitHubButton = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      {text && (
        <a
          href="https://github.com/HUIXIN-TW/what-to-eat"
          className="black_btn" // Use hover state to toggle class names
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security for opening links in a new tab
        >
          <img
            src={
              isHovered
                ? "/assets/icons/github-mark.svg"
                : "/assets/icons/github-mark-white.svg"
            }
            alt="GitHub Logo"
            width={20}
            height={20}
          />
          <span className="ml-2">{text}</span>
        </a>
      )}
      {!text && (
        <a
          href="https://github.com/HUIXIN-TW/what-to-eat"
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security for opening links in a new tab
        >
          <img
            src="/assets/icons/github-mark.svg"
            alt="GitHub Logo"
            width={30}
            height={30}
          />
        </a>
      )}
    </div>
  );
};

export default GitHubButton;
