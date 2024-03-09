import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <img
        src="/assets/task.png"
        alt="Homepage Image"
        className="homepage-image"
      />

      <div className="homepage-links">
        <Link to="/todolist" className="homepage-link">
          Todo List
        </Link>
        <Link to="/login" className="homepage-link">
          Sign in
        </Link>
        <Link to="/generateroutine" className="homepage-link">
          Generate Routine
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
