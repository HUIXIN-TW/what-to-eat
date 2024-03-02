"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();

  // Access the current session data using useSession hook from next-auth
  const { data: session } = useSession();

  // State to hold the user's posts
  const [myPosts, setMyPosts] = useState([]);

  // Fetch the user's posts from the API when the component mounts or the user's session changes
  useEffect(() => {
    const fetchPosts = async () => {
      // Fetch posts belonging to the logged-in user using their session ID
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      // Update the state with the fetched posts
      setMyPosts(data);
    };

    // Only fetch posts if there's a logged-in user session
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  // Function to handle editing a post, navigates to the update page with the post ID as a query parameter
  const handleEdit = (post) => {
    router.push(`/update-lunch-idea?id=${post._id}`);
  };

  // Function to handle deleting a post
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this idea?");

    if (hasConfirmed) {
      try {
        // Send a DELETE request to the server for the selected post
        const response = await fetch(`/api/lunch-idea/${post._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Update the state to remove the deleted post
          const filteredPosts = myPosts.filter((item) => item._id !== post._id);

          setMyPosts(filteredPosts);
        } else {
          console.error(
            `Error deleting post with ID ${post._id}: ${response.statusText}`,
          );
        }
      } catch (error) {
        console.error(
          `Error deleting post with ID ${post._id}:`,
          error.message,
        );
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="From your very first suggestion to your latest discovery, your profile is where your food journey comes to life. Let's make every bite count! Happy Sharing, and Bon Appétit!"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
