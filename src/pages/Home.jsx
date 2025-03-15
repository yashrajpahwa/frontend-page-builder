import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaLayerGroup } from "react-icons/fa";
import { toast } from "react-toastify";

const Home = () => {
  const showToast = () => {
    toast.success("React Toastify is working!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl flex items-center gap-2">
        <FaHome className="text-blue-500" /> Home Page
      </h1>
      <p className="my-4">Welcome to the application!</p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button
          onClick={showToast}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Show Toast
        </button>
        <Link
          to="/dynamic"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-2"
        >
          <FaLayerGroup /> View Dynamic Page
        </Link>
      </div>
    </div>
  );
};

export default Home;
