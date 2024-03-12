"use client";

import { useState, useEffect, useRef } from "react";

const SlotMachine = ({ posts }) => {
  console.log("posts", posts);
  const [spinning, setSpinning] = useState(false);
  const doorsRefs = useRef([]);

  useEffect(() => {
    doorsRefs.current = doorsRefs.current.slice(0, 3);
    init(true, 1, 2); // Initialize the slot machine, showing "?" in the box
  }, []);

  const spin = async () => {
    setSpinning(true);
    init(false, 1, 2);
    for (const door of doorsRefs.current) {
      const boxes = door.querySelector(".boxes");
      const duration =
        parseFloat(getComputedStyle(boxes).transitionDuration) * 500; // Convert seconds to milliseconds
      boxes.style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration));
    }
    setSpinning(false);
  };

  const init = (firstInit = true, groups = 1, duration = 1) => {
    doorsRefs.current.forEach((door, index) => {
      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(true); // Clone all child nodes as well

      const pool = ["☕️🍵🧃🥛🧋🍱🍣🍔🌭🥯❓"];
      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(
            ...posts.map(
              (post) => `
              <div class="idea_card mint_gradient w-full">
                <h3 class="font-satoshi font-semibold text-gray-900 text-lg">
                  ${post.lunchIdea}
                </h3>
                <p class="font-inter font-semibold text-sm text-gray-700 mt-2">
                  Budget: <span class="font-normal">${
                    post.lunchBudget || "N/A"
                  }</span>
                  <p class="font-inter font-semibold text-sm text-gray-700">
                  Walking Time: 
                  <span class="font-normal">${
                    post.walkingTime ? `${post.walkingTime} mins` : "N/A"
                  }</span>
                </p>
                <p class="font-inter font-semibold text-sm text-gray-700 mt-2">
                  Café: <span class="font-normal">${
                    post.cafeName || "N/A"
                  }</span>
                </p>
                <p class="font-inter font-semibold text-sm text-gray-700">
                  Location: <span class="font-normal">${
                    post.cafeLocation || "N/A"
                  }</span>
                </p>
                <p class="font-inter font-semibold text-sm text-gray-700">
                  URL: <span class="font-normal">${
                    post.cafeWebsite || "N/A"
                  }</span>
                </p>

                <div class="mt-2 flex flex-wrap gap-2">
                  ${post.tags
                    .map(
                      (tag, index) => `
                    <span key="${index}" class="font-inter text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full cursor-pointer hover:bg-green-300">
                      ${tag}
                    </span>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `,
            ),
          );
        }

        pool.push(...shuffle(arr));
      }

      boxesClone.innerHTML = ""; // Clear the clone for new content
      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";

        const content = pool[i];

        box.innerHTML = content;
        boxesClone.appendChild(box);
      }

      boxesClone.style.transitionDuration = `${duration}s`;
      boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
    });
  };

  const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };

  const setDoorRef = (element, index) => {
    doorsRefs.current[index] = element;
  };

  return (
    <div>
      <div>
        {Array.from({ length: 1 }, (_, index) => (
          <div key={index} className="door" ref={(el) => setDoorRef(el, index)}>
            <div className="boxes"></div>
          </div>
        ))}
      </div>
      <div className="flex m-5 gap-5 items-center justify-center">
        <button className="outline_btn" onClick={spin} disabled={spinning}>
          Spin
        </button>
        <button
          className="black_btn"
          onClick={() => init(true, 1, 2)}
          disabled={spinning}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
