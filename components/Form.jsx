import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} a Lunch Idea</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share your favorite lunch recipes or dining spots with the
        world for your next meal through the WhatToEat App.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Lunch Suggestion
          </span>

          <input
            id="lunchIdea"
            value={post.lunchIdea}
            onChange={(e) => setPost({ ...post, lunchIdea: e.target.value })}
            placeholder="Share a dish or a place, e.g., Avocado Toast, Mario's Deli"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">
            Cafe Name
          </span>
          <input
            id="cafeName"
            type="text"
            value={post.cafeName}
            onChange={(e) => setPost({ ...post, cafeName: e.target.value })}
            placeholder="e.g., Hemingway Cafe, Offshoot Coffee"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Walking Time From You
          </span>
          <span className="font-satoshi font-semibold text-gray-400 block text-xs ">
            Estimate walking time from your location to the spot
          </span>
        </label>
        <select
          id="walkingTime"
          name="walkingTime"
          value={post.walkingTime || ""} // Ensure the select reflects the current state
          onChange={(e) => setPost({ ...post, walkingTime: e.target.value })}
          className="block w-full pl-3 pr-10 py-3 h-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Any walking time</option>
          <option value="5">Up to 5 minutes</option>
          <option value="10">Up to 10 minutes</option>
          <option value="15">Up to 15 minutes</option>
          <option value="20">Up to 20 minutes</option>
          <option value="25">Up to 25 minutes</option>
          <option value="30">Up to 30 minutes</option>
        </select>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
            <span className="font-normal">
              {" "}
              (e.g., #Japanese #Vegetarian #Salads #Desserts #CoffeeLover
              #QuickBite)
            </span>
          </span>
          <input
            value={post.tags}
            onChange={(e) => setPost({ ...post, tags: e.target.value })}
            type="text"
            placeholder="Type # and tag name, press space to add"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : `${type} Suggestion`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
