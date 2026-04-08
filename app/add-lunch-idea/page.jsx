"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const AddLunchIdeaContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const sourceLunchIdeaId = searchParams.get("id");

  // Initially, set post state to empty values
  const [post, setPost] = useState({
    lunchIdea: "",
    lunchBudget: "",
    tags: "",
    cafeName: "",
    cafeLocation: "",
    cafeWebsite: "",
    walkingTime: "",
  });

  useEffect(() => {
    const preloadFromExistingIdea = async () => {
      const response = await fetch(`/api/lunch-idea/${sourceLunchIdeaId}`);
      if (!response.ok) return;

      const data = await response.json();
      setPost({
        lunchIdea: data.lunchIdea || "",
        lunchBudget: data.lunchBudget || "",
        tags: Array.isArray(data.tags) ? data.tags.join(" ") : data.tags || "",
        cafeName: data.cafeName || "",
        cafeLocation: data.cafeLocation || "",
        cafeWebsite: data.cafeWebsite || "",
        walkingTime: data.walkingTime || "",
      });
    };

    if (sourceLunchIdeaId) {
      preloadFromExistingIdea();
    }
  }, [sourceLunchIdeaId]);

  const addLunchIdea = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Set submitting state to true to indicate the start of form submission
    setIsSubmitting(true);

    try {
      // Send a POST request to the server
      const response = await fetch("/api/lunch-idea/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lunchIdea: post.lunchIdea,
          lunchBudget: post.lunchBudget,
          cafeName: post.cafeName,
          cafeLocation: post.cafeLocation,
          cafeWebsite: post.cafeWebsite,
          tags: post.tags,
          walkingTime: post.walkingTime,
        }),
      });

      // If the response is OK, redirect to the home page
      if (response.ok) {
        router.push("/profile");
      }
      // If there's an error, log it to the console
    } catch (error) {
      console.log(error);
      // Finally, set isSubmitting to false
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!session ? (
        <p className="desc">
          You need to login first before adding lunch ideas.
        </p>
      ) : (
        <Form
          type="Add"
          post={post}
          setPost={setPost}
          submitting={isSubmitting}
          handleSubmit={addLunchIdea}
        />
      )}
    </>
  );
};

const AddLunchIdea = () => (
  <Suspense fallback={<p className="desc">Loading lunch idea...</p>}>
    <AddLunchIdeaContent />
  </Suspense>
);

export default AddLunchIdea;
