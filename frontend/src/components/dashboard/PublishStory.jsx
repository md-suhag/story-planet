import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const PublishStory = () => {
  const { url, token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [choices, setChoices] = useState([
    { title: "", optionContent: "" },
    { title: "", optionContent: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, field, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index][field] = value;
    setChoices(updatedChoices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const storyData = {
      title,
      description,
      choices,
    };

    try {
      const response = await axios.post(`${url}/api/story/create`, storyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        toast.success("Story published successfully!");
      }
    } catch (error) {
      toast.error("Error creating the story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[70%] mx-auto p-4 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Publish a New Story</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded bg-transparent"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">
            Short Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded bg-transparent"
            rows="3"
          ></textarea>
        </div>
        <h2 className="text-xl font-semibold">Choices</h2>
        {choices.map((choice, index) => (
          <div key={index} className="space-y-4">
            <div>
              <label className="block text-lg font-semibold mb-2">
                Choice {index + 1} Title
              </label>
              <input
                type="text"
                value={choice.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                required
                className="w-full p-2 border border-gray-300 rounded bg-transparent"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">
                Choice {index + 1} Full Content
              </label>
              <textarea
                value={choice.optionContent}
                onChange={(e) =>
                  handleInputChange(index, "optionContent", e.target.value)
                }
                required
                className="w-full p-2 border border-gray-300 rounded bg-transparent"
                rows="4"
              ></textarea>
            </div>
          </div>
        ))}
        <div>
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Publishing..." : "Publish Story"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishStory;
