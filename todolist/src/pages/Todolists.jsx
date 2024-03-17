import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "../Create.jsx";
import Layout from "../Components/Layout";
import { useAuth } from "../Context/context";
import "../Styles/Todolist.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [filter, setFilter] = useState("priority");
  const [searchQuery, setSearchQuery] = useState("");
  const [auth] = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    sortTasks();
  }, [tasks, filter]);

  const fetchTasks = async () => {
    try {
      const userId = auth.user?.id;

      if (userId) {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/task/get-task?assignedTo=${userId}`
        );
        setTasks(response.data.tasks);
      } else {
        console.log("User ID not available");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const sortTasks = () => {
    const sorted = [...tasks];
    switch (filter) {
      case "priority":
        sorted.sort((a, b) => {
          const priorityOrder = { High: 1, Medium: 2, Low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        break;
      case "category":
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "startTime":
        sorted.sort(
          (a, b) =>
            new Date(a.estimatedStartDate) - new Date(b.estimatedStartDate)
        );
        break;
      default:
        break;
    }
    setSortedTasks(sorted);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearch = () => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedTasks(filteredTasks);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    sortTasks();
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to update task status
  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/task/update-task/${taskId}`,
        { status }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Function to update task progress
  const updateTaskProgress = async (taskId, progress) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/task/update-task/${taskId}`,
        { progress }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task progress:", error);
    }
  };

  // Function to delete a task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/task/delete-task/${taskId}`
      );
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Layout title={"Todo List"}>
      <div className="todo-list">
        <h2>To Do List</h2>
        <Create onTaskCreated={fetchTasks} />
        <div className="filter-container">
          <label htmlFor="filter" className="filter-label">
            Filter by:
          </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="priority">Priority</option>
            <option value="category">Category</option>
            <option value="startTime">Start Time</option>
          </select>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by task title"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          <button
            onClick={handleClearSearch}
            className="search-button clear-search-button"
          >
            Clear Search
          </button>
        </div>
        {sortedTasks.length === 0 ? (
          <div>
            <h3>No Tasks</h3>
          </div>
        ) : (
          <ul className="task-list">
            {sortedTasks.map((task) => (
              <li key={task._id} className={`task-item ${task.priority}`}>
                <h3>{task.title}</h3>
                <p>Description: {task.description}</p>
                <p>Category: {task.category}</p>
                <p>Start Date: {task.estimatedStartDate}</p>
                <p>End Date: {task.estimatedEndDate}</p>
                <p>
                  Status: <span className="task-status">{task.status}</span>
                  {task.status === "ongoing" && (
                    <span
                      role="img"
                      aria-label="Green Tick"
                      className="green-tick"
                    >
                      ✅
                    </span>
                  )}
                </p>
                <div>
                  <button
                    onClick={() => updateTaskStatus(task._id, "completed")}
                  >
                    Mark as Completed
                  </button>
                  <button onClick={() => updateTaskStatus(task._id, "pending")}>
                    Mark as Pending
                  </button>
                  <button onClick={() => updateTaskStatus(task._id, "ongoing")}>
                    Mark as Ongoing
                  </button>
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
                <div className="advanced-options">
                  <select className="advanced-options-dropdown">
                    <option value="subtasks">Subtasks</option>
                    <option value="progress">Progress</option>
                    <option value="status">Status</option>
                  </select>
                  {task.subtasks && (
                    <div className="advanced-option-content">
                      <h4>Subtasks:</h4>
                      <ul>
                        {task.subtasks.map((subtask, index) => (
                          <li key={index}>{subtask}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {task.progress !== undefined && (
                    <div className="advanced-option-content">
                      <h4>Progress:</h4>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={task.progress}
                        onChange={(e) =>
                          updateTaskProgress(task._id, e.target.value)
                        }
                      />
                    </div>
                  )}
                  {task.status && (
                    <div className="advanced-option-content">
                      <h4>Status:</h4>
                      <p>{task.status}</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default TodoList;
