"use client";

import { useState, useEffect } from "react";

import LunchIdeaCard from "./LunchIdeaCard";

const LunchIdeaCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 idea_layout">
      {data.map((post, index) => (
        <LunchIdeaCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/lunch-idea");
      const data = await response.json();
      setAllPosts(data);
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  const filterLunchIdeas = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        item.tags.some((tag) => regex.test(tag.replace(/#/g, ""))) ||
        regex.test(item.lunchIdea) ||
        regex.test(item.cafeName) ||
        regex.test(item.walkingTime),
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterLunchIdeas(e.target.value);
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  const handleTagClick = (tagName) => {
    // Removes all occurrences of "#"
    const sanitizedTagName = tagName.replace(/#/g, "");

    setSearchText(sanitizedTagName);

    // Call filterLunchIdeas with the sanitized tag name
    const searchResult = filterLunchIdeas(sanitizedTagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          id="search_input"
          type="text"
          placeholder="Search for lunch ideas"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>

      {/* All LunchIdeas */}
      {searchText ? (
        (console.log(searchedResults),
        (
          <LunchIdeaCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <LunchIdeaCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
