"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const CopyLunchIdea = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();

  // Extracting the 'id' parameter which represents the prompt's ID
  const lunchIdeaId = searchParams.get("id");

  // State for storing the prompt details
  const [post, setPost] = useState({
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
        cafeName: data.cafeName,
        cafeLocation: data.cafeLocation,
        cafeWebsite: data.cafeWebsite,
        walkingTime: data.walkingTime,
        lunchIdea: data.lunchIdea,
        lunchBudget: data.lunchBudget,
        tags: data.tags,
      });
    };
    console.log("post", post);
    // Only fetching prompt details if a promptId is present
    if (lunchIdeaId) getLunchIdeaDetails();
  }, [lunchIdeaId]); // Dependency array to re-run the effect if Id changes

  // Function to handle the form submission for updating the prompt
  const copyLunchIdea = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Set submitting state to true to indicate the start of form submission
    setIsSubmitting(true);

    // Early return if promptId is missing
    if (!lunchIdeaId) return alert("Missing LunchIdeaId!");

    try {
      // Send a POST request to the server
      const response = await fetch("/api/lunch-idea/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lunchIdea: post.lunchIdea.toString(),
          lunchBudget: post.lunchBudget?.toString() || "",
          userId: session?.user.id,
          cafeName: post.cafeName.toString(),
          cafeLocation: post.cafeLocation?.toString() || "",
          cafeWebsite: post.cafeWebsite?.toString() || "",
          walkingTime: post.walkingTime.toString(),
          tags: post.tags.toString(),
        }),
      });

      if (response.ok) {
        router.push("/profile");
      } else {
        // Handle server errors or validation errors
        const errorData = await response.json();
        console.error("Server responded with an error:", errorData.message);
      }
      // If there's an error, log it to the console
    } catch (error) {
      console.error("Failed to submit the form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!session ? (
        <p className="desc">
          You need to login first before copying lunch ideas.
        </p>
      ) : (
        <Form
          type="Copy"
          post={post}
          setPost={setPost}
          submitting={isSubmitting}
          handleSubmit={copyLunchIdea}
        />
      )}
    </>
  );
};

export default CopyLunchIdea;
