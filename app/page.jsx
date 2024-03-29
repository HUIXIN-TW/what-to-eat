"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Feed from "@components/Feed";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State to hold all posts
  const [allPosts, setAllPosts] = useState([]);

  // Access the current session data using useSession hook from next-auth
  const { data: session } = useSession();

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching data...");
      // console.log("session", session?.user?.id);
      let response;
      if (session?.user?.id) {
        response = await fetch(`/api/users/${session.user.id}`);
      } else {
        response = await fetch(`/api/lunch-idea`);
      }
      const data = await response.json();

      // Update the state with the fetched posts
      setAllPosts(data);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch posts on initial render
  useEffect(() => {
    fetchPosts();
  }, [session]);

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
