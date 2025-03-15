import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSave, FaQuestionCircle } from "react-icons/fa";

const BuilderNavbar = ({ pageTitle, onSave, onHelp }) => {
  return (
    <div className="bg-white shadow-md py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="mr-4 text-gray-500 hover:text-gray-700">
          <FaHome size={18} />
        </Link>
        <h1 className="text-xl font-semibold">{pageTitle || "Page Builder"}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onHelp}
          className="text-gray-600 hover:text-gray-800"
          title="Help"
        >
          <FaQuestionCircle size={18} />
        </button>

        <button
          onClick={onSave}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
        >
          <FaSave className="mr-1" /> Save
        </button>
      </div>
    </div>
  );
};

export default BuilderNavbar;
