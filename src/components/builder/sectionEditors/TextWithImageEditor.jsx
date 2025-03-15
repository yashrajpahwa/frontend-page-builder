import React from "react";
import { FaImage } from "react-icons/fa";
import { stopPropagation } from "./utils";

const TextWithImageEditor = ({ section, onUpdate }) => {
  const {
    title,
    content,
    imageUrl,
    imagePosition = "right",
    buttonText,
    buttonLink,
  } = section.properties;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Text with Image Section</h2>

      <div className="p-4 bg-white rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={title || ""}
            onChange={(e) => onUpdate({ title: e.target.value })}
            onClick={stopPropagation}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={content || ""}
            onChange={(e) => onUpdate({ content: e.target.value })}
            onClick={stopPropagation}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Position
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="left"
                checked={imagePosition === "left"}
                onChange={() => onUpdate({ imagePosition: "left" })}
                onClick={stopPropagation}
                className="form-radio"
              />
              <span className="ml-2">Left</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="right"
                checked={imagePosition === "right"}
                onChange={() => onUpdate({ imagePosition: "right" })}
                onClick={stopPropagation}
                className="form-radio"
              />
              <span className="ml-2">Right</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <div className="flex">
            <input
              type="text"
              value={imageUrl || ""}
              onChange={(e) => onUpdate({ imageUrl: e.target.value })}
              onClick={stopPropagation}
              className="flex-1 p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              className="bg-gray-200 p-2 rounded-r border-t border-r border-b"
              onClick={(e) => {
                e.stopPropagation();
                // You could implement an image picker here
                alert("Image picker would open here");
              }}
            >
              <FaImage />
            </button>
          </div>
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
              onClick={stopPropagation}
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
              onClick={stopPropagation}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Preview</h3>
          <div className="p-4 border rounded bg-gray-50">
            <div
              className={`flex flex-col md:flex-row ${
                imagePosition === "right" ? "" : "md:flex-row-reverse"
              } gap-4`}
            >
              <div className="md:w-1/2 space-y-2">
                <h3 className="text-xl font-bold">
                  {title || "Section Title"}
                </h3>
                <p className="text-gray-600">
                  {content || "Content goes here"}
                </p>

                {buttonText && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    {buttonText}
                  </button>
                )}
              </div>
              <div className="md:w-1/2 flex justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title || "Section image"}
                    className="max-h-40 rounded shadow"
                  />
                ) : (
                  <div className="h-32 w-full bg-gray-200 flex items-center justify-center rounded">
                    <FaImage className="text-gray-400 text-2xl" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextWithImageEditor;
