"use client";

import { useEffect, useState } from "react";

import Feed from "@components/Feed";

const PUBLIC_FEED_ERROR_MESSAGE =
  "Lunch ideas are temporarily unavailable. Please try again shortly.";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State to hold all posts
  const [allPosts, setAllPosts] = useState([]);

  // Fetch posts on initial render
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/lunch-idea", { cache: "no-store" });
        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          const message = await response.text();
          throw new Error(message || "Failed to fetch lunch ideas");
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch lunch ideas");
        }

        // Update the state with the fetched posts
        setAllPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
        setAllPosts([]);
        setError(PUBLIC_FEED_ERROR_MESSAGE);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-xs:hidden" />
        <span className="orange_gradient">Everyday Lunch Option</span>
      </h1>
      <p className="desc text-center">
        Embark on a culinary journey right from your screen. Explore a world
        where every lunch is an adventure, and your next favorite meal is just a
        click away. Join our community of food lovers in celebrating the joy of
        daily discoveries. Share your finds, savor new flavors, and transform
        your lunchtime into an exploration of taste
      </p>
      <Feed data={allPosts} />
      {isLoading && <p>Loading...</p>}
      {error && !isLoading && <p className="desc text-center mt-8">{error}</p>}
    </section>
  );
};

export default Home;
