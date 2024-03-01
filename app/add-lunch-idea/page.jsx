"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const AddLunchIdea = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setIsSubmitting] = useState(false);

  // If session doesn't exist, redirect to Home page
  if (!session) {
    alert("You need to sign in to add a lunch idea");
    router.push("/");
    return null;
  }

  // Initially, set post state to empty values
  const [post, setPost] = useState({
    lunchIdea: "",
    tags: "",
    cafeName: "",
    walkingTime: "",
  });

  const addLunchIdea = async (e) => {
    e.preventDefault();
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
    <Form
      type="Add"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={addLunchIdea}
    />
  );
};

export default AddLunchIdea;
