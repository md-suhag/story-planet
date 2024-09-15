import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllStories = () => {
  const navigate = useNavigate();
  const { url, token } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleAnalytices = (storyId, storyTitle) => {
    navigate("/admin/dashboard/story-analytics", {
      state: { storyId, storyTitle },
    });
  };

  const handleDelete = async (storyId) => {
    try {
      const response = await axios.delete(
        `${url}/api/story/delete/${storyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchStories();
      } else {
        toast.error(response.data.message || "Failed to delete the story.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchStories = async () => {
    try {
      const response = await axios.get(`${url}/api/story/all-story`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStories();
  }, [token]);

  if (loading) {
    return <div>Loading stories...</div>;
  }

  return (
    <div className="container mx-auto w-full md:w-4/5 p-4 overflow-auto h-screen dark:text-white">
      <h1 className="text-3xl font-bold mb-4">All Stories</h1>
      {stories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        <ul className="list-disc pl-6">
          {stories.map((story) => (
            <li key={story._id}>
              <h2 className="text-xl font-semibold">
                {story.title}{" "}
                <span className="text-sm">
                  published by{" "}
                  <span className="text-sky-600">{story.author.name}</span>
                </span>
              </h2>
              <p>{story.description.slice(0, 100) + "..."}</p>
              <p>
                Published at:{" "}
                <span className="text-sky-600">
                  {new Date(story.createdAt).toLocaleString()}
                </span>
              </p>
              <p className="flex gap-2 items-center flex-wrap">
                <button
                  className="primary-btn"
                  onClick={() => handleAnalytices(story._id, story.title)}
                >
                  View Analytices
                </button>
                <button
                  className="primary-btn bg-red-700 hover:bg-red-800"
                  onClick={() => handleDelete(story._id)}
                >
                  Delete Story
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAllStories;
