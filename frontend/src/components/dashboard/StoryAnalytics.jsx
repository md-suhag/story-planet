import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const StoryAnalytics = () => {
  const location = useLocation();
  const { storyId, storyTitle } = location.state;

  const { url, token } = useAuth();
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          `${url}/api/analytics/story/${storyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error.message);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="dark:text-white p-2">
      <h2 className="text-lg font-bold mb-4 ">
        Story Analytics of <span className="text-4xl">{storyTitle}</span>
      </h2>
      {analytics.length == "0" ? (
        <p>No data available</p>
      ) : (
        <ul>
          {analytics.map((item) => (
            <li key={item._id}>
              Option{" "}
              <span className="font-bold text-2xl border-2 px-2">
                {item.choiceTitle}
              </span>
              {"====>"}{" "}
              <span className="font-bold text-2xl text-sky-600">
                {item.count}
              </span>{" "}
              times selected this option.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoryAnalytics;
