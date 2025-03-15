import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import DynamicPage from "./components/dynamic/DynamicPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dynamic/:pageId?" element={<DynamicPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
