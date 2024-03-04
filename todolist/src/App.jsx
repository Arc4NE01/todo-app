import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Todolists from "./pages/Todolists";
import Pagenotfound from "./pages/Pagenotfound";
import GenerateRoutine from "./pages/GenerateRoutine";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/todolist" element={<Todolists />} />
        <Route path="/generateroutine" element={<GenerateRoutine />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
