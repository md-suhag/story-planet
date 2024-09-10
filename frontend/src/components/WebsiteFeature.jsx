import React from "react";
import readImg from "../assets/read.svg";
import publishImg from "../assets/publish.svg";
const WebsiteFeature = () => {
  return (
    <div className="container mx-auto p-6 dark:text-white mt-10">
      <h2 className="text-3xl md:text-6xl text-center font-bold mb-16 text-slate-700 dark:text-white">
        Webstie Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
        <div className="order-1 md:order-0">
          <h3 className="text-3xl mb-4  font-bold text-slate-700 dark:text-white">
            Read Story
          </h3>
          <p>
            Discover a world of interactive stories tailored by our community of
            authors and admins. After logging in, dive into immersive tales
            where your choices shape the outcome. Explore a variety of genres
            and branching narratives that put you in control of the story. Every
            tale is just a click away, waiting for you to uncover its secrets.
          </p>
        </div>
        <div className="order-0 md:order-1">
          <img src={readImg} alt="" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
        <div>
          <img src={publishImg} alt="" />
        </div>
        <div>
          <h3 className="text-3xl mb-4  font-bold text-slate-700 dark:text-white">
            Publish your own Story
          </h3>
          <p>
            Share your creativity with the world! As an author, log in to
            publish your own stories with branching paths that captivate
            readers. Manage your stories through your personalized
            dashboard—create new tales, delete old ones, and track reader
            interactions, including detailed insights into which story options
            are most popular. Take control of your narrative and see how readers
            engage with your work.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFeature;
