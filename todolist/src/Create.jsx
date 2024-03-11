import React, { useState } from "react";
import axios from "axios";
import "./Styles/CreateTask.css";

const CreateTask = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [estimatedStartDate, setEstimatedStartDate] = useState("");
  const [estimatedEndDate, setEstimatedEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/task/create-task`,
        {
          title,
          description,
          priority,
          estimatedStartDate,
          estimatedEndDate,
          category: customCategory || category,
        }
      );
      console.log("Task created:", response.data);
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setEstimatedStartDate("");
      setEstimatedEndDate("");
      setCategory("");
      setCustomCategory("");
      onTaskCreated();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  return (
    <div className="create-task">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} className="create-task-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Create Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="advanced-options">
          <button
            type="button"
            onClick={toggleAdvancedOptions}
            className="advanced-options-toggle"
          >
            {showAdvancedOptions
              ? "Hide Advanced Options"
              : "Show Advanced Options"}
          </button>
          {showAdvancedOptions && (
            <>
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="estimatedStartDate">
                  Estimated Start Date:
                </label>
                <input
                  type="date"
                  id="estimatedStartDate"
                  value={estimatedStartDate}
                  onChange={(e) => setEstimatedStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="estimatedEndDate">Estimated End Date:</label>
                <input
                  type="date"
                  id="estimatedEndDate"
                  value={estimatedEndDate}
                  onChange={(e) => setEstimatedEndDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (e.target.value !== "custom") {
                      setCustomCategory("");
                    }
                  }}
                >
                  <option value="">Select a category</option>
                  <option value="study">Study</option>
                  <option value="research">Research</option>
                  <option value="custom">Custom</option>
                </select>
                {category === "custom" && (
                  <input
                    type="text"
                    placeholder="Enter Custom Category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <button type="submit" className="create-task-btn">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
