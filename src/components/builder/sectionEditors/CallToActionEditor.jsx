import React from "react";

const CallToActionEditor = ({ section, onUpdate }) => {
  const {
    title,
    description,
    buttonText,
    buttonLink,
    backgroundColor = "accent",
  } = section.properties;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Call to Action Section</h2>

      <div className="p-4 bg-white rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title || ""}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            rows="2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={buttonText || ""}
              onChange={(e) => onUpdate({ buttonText: e.target.value })}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Button Link
            </label>
            <input
              type="text"
              value={buttonLink || ""}
              onChange={(e) => onUpdate({ buttonLink: e.target.value })}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <select
            value={backgroundColor}
            onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="accent">Accent Color</option>
            <option value="primary">Primary Color</option>
            <option value="light">Light Gray</option>
          </select>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Preview</h3>
          <div
            className={`p-6 rounded text-center ${
              backgroundColor === "primary"
                ? "bg-blue-500 text-white"
                : backgroundColor === "accent"
                ? "bg-yellow-100"
                : "bg-gray-50"
            }`}
          >
            <h2 className="text-xl font-bold mb-2">{title || "CTA Title"}</h2>
            <p className="mb-4">{description || "CTA description goes here"}</p>
            {buttonText && (
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md">
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionEditor;
