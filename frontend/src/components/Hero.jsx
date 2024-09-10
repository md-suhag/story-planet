import React from "react";
import bannerImg from "../assets/story.svg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container mx-auto p-6 md:py-16 flex flex-col-reverse md:flex-row gap-3 items-center">
      <div className="basis-full md:basis-1/2">
        <h1 className="text-4xl md:text-6xl font-bold  text-slate-700 mb-12 dark:text-white">
          Discover Stories That Evolve with Your Choices
        </h1>
        <p className="text-sm italic  dark:text-white mb-4">
          Explore immersive narratives, create your own branching stories, and
          experience endless possibilities based on your choices.{" "}
        </p>
        <Link to="/all-story" className="primary-btn">
          Read stories
        </Link>
      </div>
      <div className="basis-full md:basis-1/2">
        <img className="w-full " src={bannerImg} alt="" />
      </div>
    </div>
  );
};

export default Hero;
