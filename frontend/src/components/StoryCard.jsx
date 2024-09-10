import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StoryCard = ({ story }) => {
  return (
    <div
      key={story._id}
      className=" shadow-md rounded-lg overflow-hidden w-full dark:text-white dark:bg-slate-600"
    >
      <img
        src={story.imageUrl || "https://via.placeholder.com/150"} // Use placeholder if no image is provided
        alt={story.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold dark:text-white text-gray-800">
          {story.title}
        </h3>
        <p className="text-gray-600 dark:text-white mt-2">
          {story.description.slice(0, 50) + "..."}
        </p>
        <Link to={`/story/${story._id}`} className="primary-btn">
          View Full Story
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;
