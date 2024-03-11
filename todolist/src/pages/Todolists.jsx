import React, { useState, useEffect } from "react";
import axios from "axios";
import Create from "../Create.jsx";
import Layout from "../Components/Layout";
import { useAuth } from "../Context/context";
import "../Styles/Todolist.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

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

  return (
    <Layout title={"Todo List"}>
      <div className="todo-list">
        <h2>To Do List</h2>
        <Create onTaskCreated={fetchTasks} />
        {tasks.length === 0 ? (
          <div>
            <h3>No Tasks</h3>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                <h3>{task.title}</h3>
                <p>Description: {task.description}</p>
                <p>Priority: {task.priority}</p>
                <p>Start Date: {task.estimatedStartDate}</p>
                <p>End Date: {task.estimatedEndDate}</p>
                {task.attachment && <p>Attachment: {task.attachment}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default TodoList;
