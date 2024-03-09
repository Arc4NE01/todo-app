import React, { useState } from "react";
import Create from "../Create";
import Layout from "../Components/Layout";

const Todolists = () => {
  const [todos, setTodos] = useState([]);
  return (
    <Layout title={"Todo List"}>
      <div className="home">
        <h2>To Do List</h2>
        <Create />
        {todos.length === 0 ? (
          <div>
            <h2>No Record</h2>
          </div>
        ) : (
          todos.map((todo, index) => <div key={index}>{todo}</div>)
        )}
      </div>
    </Layout>
  );
};

export default Todolists;
