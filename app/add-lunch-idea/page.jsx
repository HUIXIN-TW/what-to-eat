"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const AddLunchIdea = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initially, set post state to empty values
  const [post, setPost] = useState({
    lunchIdea: "",
    tags: "",
    cafeName: "",
    walkingTime: "",
  });

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
          userId: session?.user.id,
          cafeName: post.cafeName,
          tags: post.tags,
          walkingTime: post.walkingTime,
        }),
      });

      // If the response is OK, redirect to the home page
      if (response.ok) {
        router.push("/");
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

export default AddLunchIdea;
