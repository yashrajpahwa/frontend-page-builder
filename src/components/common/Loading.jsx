import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ size = "text-3xl", message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <FaSpinner className={`${size} animate-spin text-blue-500`} />
      <p className="mt-2">{message}</p>
    </div>
  );
};

export default Loading;
