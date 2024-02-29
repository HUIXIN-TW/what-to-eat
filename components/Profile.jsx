import { useState } from "react";
import LunchIdeaCard from "./LunchIdeaCard";
import SelectedLunchIdeaCard from "./SelectedLunchIdeaCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [randomPost, setRandomPost] = useState(null);

  // Function to handle random selection
  const handleRandomSelection = () => {
    if (data.length === 0) return;
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomPost(data[randomIndex]); // Update the state with the randomly selected post

    console.log("Randomly selected post:", randomPost);
  };

  // Function to clear random selection
  const handleClearRandomSelection = () => {
    setRandomPost(null);
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-5 flex flex-col gap-5 items-center justify-center">
        {/* Button to trigger random selection */}
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

        {/* Randomly selected lunch idea */}
        {randomPost && <SelectedLunchIdeaCard post={randomPost} />}
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
