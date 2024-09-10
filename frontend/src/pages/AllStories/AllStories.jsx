import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryCard from "../../components/StoryCard";
import { useAuth } from "../../context/AuthContext";

const AllStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token } = useAuth();

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${url}/api/story/all-story`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 ">
      {loading && <p className="dark:text-white">Loading stories....</p>}
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </div>
  );
};

export default AllStories;
