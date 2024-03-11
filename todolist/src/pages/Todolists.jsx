import React, { useState } from "react";
import Create from "../Create";
import Layout from "../Components/Layout";
import { useAuth } from "../Context/context";

const Todolists = () => {
  const [todos, setTodos] = useState([]);
  const [auth, setAuth] = useAuth();
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
      <div>
        <pre>{JSON.stringify(auth.user, null, 4)}</pre>
      </div>
    </Layout>
  );
};

export default Todolists;
