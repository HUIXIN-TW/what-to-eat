"use client";

import { useState, useEffect } from "react";

import LunchIdeaCard from "./LunchIdeaCard";

const LunchIdeaCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 idea_layout">
      {data.map((post) => (
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

  // Fetch all ideas
  const fetchPosts = async () => {
    const response = await fetch("/api/lunch-idea");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterLunchIdeas = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
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
    setSearchText(tagName);

    const searchResult = filterLunchIdeas(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
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
