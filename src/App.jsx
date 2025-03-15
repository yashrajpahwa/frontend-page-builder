import React from "react";
import { Routes, Route } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    // <div className="app-container">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    // </div>
  );
};

export default App;
