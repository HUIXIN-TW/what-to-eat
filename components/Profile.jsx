import { useMemo, useState } from "react";
import LunchIdeaCard from "./LunchIdeaCard";
import SelectedLunchIdeaCard from "./SelectedLunchIdeaCard";
import SlotMachine from "./SlotMachine";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [showSlotMachine, setShowSlotMachine] = useState(false);

  // Function to toggle the visibility of SlotMachine
  const toggleSlotMachine = () => {
    setShowSlotMachine(!showSlotMachine);
  };

  const randomPostList = useMemo(() => {
    if (data.length === 0) {
      return null;
    }
    const seed = data.reduce((acc, post) => {
      const id = String(post?._id || "");
      for (let i = 0; i < id.length; i++) {
        acc += id.charCodeAt(i);
      }
      return acc;
    }, 0);

    const selectedPosts = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = (seed + i * 7) % data.length;
      selectedPosts.push(data[randomIndex]);
    }
    return selectedPosts;
  }, [data]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-5 flex flex-col gap-5 items-center justify-center">
        {/* Button to trigger random selection */}
        {/* 
        <div className="flex gap-5 items-center justify-center">
          <button className="outline_btn " onClick={handleRandomSelection}>
            What to Eat
          </button>
          {randomPost && (
            <button className="black_btn " onClick={handleClearRandomSelection}>
              Clear
            </button>
          )}
        </div> 
        {randomPost && <SelectedLunchIdeaCard post={randomPost} />}
        */}

        {/* Button to toggle SlotMachine visibility */}
        <button className="black_btn" onClick={toggleSlotMachine}>
          {showSlotMachine ? "Close" : "Quick Pick"}
        </button>

        {/* Conditionally render the SlotMachine component based on showSlotMachine state */}
        {showSlotMachine && randomPostList && (
          <SlotMachine posts={randomPostList} />
        )}
      </div>

      {/* List of lunch ideas */}
      <div className="mt-10 idea_layout">
        {data.map((post, index) => (
          <LunchIdeaCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
