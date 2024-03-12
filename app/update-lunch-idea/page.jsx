"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateLunchIdea = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();

  // Extracting the 'id' parameter which represents the prompt's ID
  const lunchIdeaId = searchParams.get("id");

  // State for storing the prompt details
  const [post, setPost] = useState({
    creator: "",
    lunchIdea: "",
    lunchBudget: "",
    tags: "",
    cafeName: "",
    cafeLocation: "",
    cafeWebsite: "",
    walkingTime: "",
  });

  // useEffect hook to fetch the prompt details when the component mounts or promptId changes
  useEffect(() => {
    const getLunchIdeaDetails = async () => {
      // Fetching prompt details from the server
      const response = await fetch(`/api/lunch-idea/${lunchIdeaId}`);
      const data = await response.json();

      // Setting the fetched prompt details to the post state
      setPost({
        creator: data.creator._id,
        cafeName: data.cafeName,
        cafeLocation: data.cafeLocation,
        cafeWebsite: data.cafeWebsite,
        walkingTime: data.walkingTime,
        lunchIdea: data.lunchIdea,
        lunchBudget: data.lunchBudget,
        tags: data.tags,
      });
    };

    // Only fetching prompt details if a promptId is present
    if (lunchIdeaId) getLunchIdeaDetails();
  }, [lunchIdeaId]); // Dependency array to re-run the effect if Id changes

  // Function to handle the form submission for updating the prompt
  const updateLunchIdea = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Set submitting state to true to indicate the start of form submission
    setIsSubmitting(true);

    // Early return if promptId is missing
    if (!lunchIdeaId) return alert("Missing LunchIdeaId!");

    if (post.creator !== session?.user.id)
      return alert("You are not the creator of this lunch idea!");

    // If the user is the creator, update the existing lunch idea
    try {
      // Sending the updated prompt details to the server
      const response = await fetch(`/api/lunch-idea/${lunchIdeaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lunchIdea: post.lunchIdea,
          lunchBudget: post.lunchBudget,
          cafeName: post.cafeName,
          cafeLocation: post.cafeLocation,
          cafeWebsite: post.cafeWebsite,
          walkingTime: post.walkingTime,
          tags: post.tags,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        // Handle server errors or validation errors
        const errorData = await response.json();
        console.error("Server responded with an error:", errorData.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateLunchIdea}
    />
  );
};

export default UpdateLunchIdea;
