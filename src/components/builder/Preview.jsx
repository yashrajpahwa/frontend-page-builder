import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaSync,
} from "react-icons/fa";

const Preview = ({ config, onClose }) => {
  const [viewMode, setViewMode] = useState("desktop");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    // Create a data URL from the config to avoid URL length limitations
    const blob = new Blob([JSON.stringify(config)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(`/dynamic?preview=blob&timestamp=${Date.now()}`);

    // Store the config in sessionStorage
    sessionStorage.setItem("previewConfig", JSON.stringify(config));

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [config]);

  const getFrameWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px]";
      case "tablet":
        return "w-[768px]";
      default:
        return "w-full";
    }
  };

  const refreshPreview = () => {
    setPreviewUrl(`/dynamic?preview=blob&timestamp=${Date.now()}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex flex-col">
      <div className="bg-gray-800 p-3 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode("desktop")}
            className={`p-2 rounded ${
              viewMode === "desktop"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Desktop view"
          >
            <FaDesktop />
          </button>
          <button
            onClick={() => setViewMode("tablet")}
            className={`p-2 rounded ${
              viewMode === "tablet"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Tablet view"
          >
            <FaTabletAlt />
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`p-2 rounded ${
              viewMode === "mobile"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Mobile view"
          >
            <FaMobileAlt />
          </button>
          <button
            onClick={refreshPreview}
            className="p-2 rounded text-gray-400 hover:text-white ml-4"
            title="Refresh Preview"
          >
            <FaSync />
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-2"
        >
          <FaTimes />
        </button>
      </div>

      <div className="flex-1 overflow-auto flex justify-center bg-gray-700 p-4">
        <div
          className={`h-full ${getFrameWidth()} bg-white rounded shadow overflow-hidden transition-all duration-300`}
        >
          {previewUrl && (
            <iframe
              src={previewUrl}
              className="w-full h-full border-none"
              title="Page Preview"
              sandbox="allow-same-origin allow-scripts"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
