import { AiOutlineRollback } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SingleStory = () => {
  const { url, token, user } = useAuth();
  const { storyId } = useParams();
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`${url}/api/story/${storyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    fetchStory();
  }, [storyId]);

  const handleChoiceSelect = async (linkedOptionId, choiceId, choiceTitle) => {
    try {
      const response = await axios.get(
        `${url}/api/story/options/${linkedOptionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedOption(response.data);

      await axios.post(
        `${url}/api/analytics/choice`,
        {
          storyId,
          choiceId,
          choiceTitle,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching option or logging choice:", error);
    }
  };

  if (!data) {
    return <div>Loading story...</div>;
  }

  return (
    <div className="container mx-auto p-2 min-h-screen">
      <h1 className="text-slate-700  dark:text-white text-4xl md:text-6xl  font-bold mb-2  mt-4">
        {data.story.title}
      </h1>
      <p className="italic text-sm md:text-base mb-10 dark:text-white">
        published by : {data.author.name}{" "}
        <span className="mr-2">({data.author.role})</span> published at :
        <span>
          {data.publishedAt.date} on {data.publishedAt.time}
        </span>
      </p>

      <p className="text-slate-600 dark:text-white mb-6">
        {data.story.description}
      </p>

      {/* If an option has been selected, show the full description */}
      {selectedOption ? (
        <div>
          <h2 className="font-bold text-2xl text-slate-700  dark:text-white">
            remaining Story
          </h2>
          <p className="text-slate-600 dark:text-white">
            {selectedOption.content}
          </p>
        </div>
      ) : (
        <div>
          <h2 className="dark:text-white">
            Choose a option for remaining part of stories
          </h2>
          <div className="flex gap-2">
            {data.story.choices.map((choice) => (
              <button
                className="primary-btn"
                key={choice._id}
                onClick={() =>
                  handleChoiceSelect(
                    choice.linkedOption._id,
                    choice._id,
                    choice.title
                  )
                }
              >
                {choice.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <Link
        to="/all-story"
        className="primary-btn mt-10 inline-flex items-center gap-1"
      >
        Back <AiOutlineRollback />
      </Link>
    </div>
  );
};

export default SingleStory;
