"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

// UserProfile component receives `params` prop from its parent or router
const UserProfile = ({ params }) => {
  // Utilizing the useSearchParams hook from Next.js to work with query parameters
  const searchParams = useSearchParams();

  // Extracting the 'name' query parameter to use within the component
  const userName = searchParams.get("name");

  // State to hold the posts belonging to the user
  const [userPosts, setUserPosts] = useState([]);

  // useEffect hook to fetch user posts when the component mounts or `params.id` changes
  useEffect(() => {
    const fetchPosts = async () => {
      // Fetching posts from the backend API using the user ID from params
      const response = await fetch(`/api/users/${params?.id}/posts`);

      // Parsing the JSON response to get the data
      const data = await response.json();

      // Updating the userPosts state with the fetched data
      setUserPosts(data);
    };

    // Only fetch posts if there's a user ID in the params
    if (params?.id) fetchPosts();
  }, [params.id]); // Dependency array ensures this effect runs when `params.id` changes

  // Rendering the Profile component with props based on the fetched data and URL parameters

  return (
    <Profile
      name={userName}
      desc={`From ${userName}'s very first suggestion to latest discovery, ${userName}'s profile is where your food journey comes to life. Let's make every bite count! Happy Sharing, and Bon Appétit!`}
      data={userPosts}
    />
  );
};

export default UserProfile;
