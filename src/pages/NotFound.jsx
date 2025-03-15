import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <div className="my-8">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto" />
        <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
        <p className="my-4">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-blue-500 hover:underline"
        >
          <FaArrowLeft /> Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
