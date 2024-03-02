"use client";

import Feed from "@components/Feed";
import { useEffect, useState } from "react";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const cacheBuster = new Date().getTime();
        const response = await fetch(`/api/lunch-idea/all?_=${cacheBuster}`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

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
      {error && <p>Error: {error}</p>}
    </section>
  );
};

export default Home;
