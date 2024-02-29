"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateLunchIdea = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extracting the 'id' parameter which represents the prompt's ID
  const lunchIdeaId = searchParams.get("id");

  // State for storing the prompt details
  const [post, setPost] = useState({
    lunchIdea: "",
    tags: "",
    cafeName: "",
    walkingTime: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  // useEffect hook to fetch the prompt details when the component mounts or promptId changes
  useEffect(() => {
    const getLunchIdeaDetails = async () => {
      // Fetching prompt details from the server
      const response = await fetch(`/api/lunch-idea/${lunchIdeaId}`);
      const data = await response.json();

      // Setting the fetched prompt details to the post state
      setPost({
        cafeName: data.cafeName,
        walkingTime: data.walkingTime,
        lunchIdea: data.lunchIdea,
        tags: data.tags,
      });
    };

    // Only fetching prompt details if a promptId is present
    if (lunchIdeaId) getLunchIdeaDetails();
  }, [lunchIdeaId]); // Dependency array to re-run the effect if promptId changes

  // Function to handle the form submission for updating the prompt
  const updateLunchIdea = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Set submitting state to true to indicate the start of form submission
    setIsSubmitting(true);

    // Early return if promptId is missing
    if (!lunchIdeaId) return alert("Missing LunchIdeaId!");

    try {
      // Sending the updated prompt details to the server
      const response = await fetch(`/api/lunch-idea/${lunchIdeaId}`, {
        method: "PATCH",
        body: JSON.stringify({
          lunchIdea: post.lunchIdea,
          cafeName: post.cafeName,
          walkingTime: post.walkingTime,
          tags: post.tags,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
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
