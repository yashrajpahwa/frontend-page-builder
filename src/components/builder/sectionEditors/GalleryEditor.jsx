import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaImage,
} from "react-icons/fa";
import { stopPropagation } from "./utils";

const GalleryEditor = ({ section, onUpdate }) => {
  const { title, description, images = [], columns = 3 } = section.properties;
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages[index], [field]: value };
    onUpdate({ images: updatedImages });
  };

  const addImage = () => {
    const newImage = {
      url: "https://placehold.co/800x600",
      caption: "Image caption",
    };
    onUpdate({ images: [...images, newImage] });
    setActiveImageIndex(images.length);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onUpdate({ images: updatedImages });
    setActiveImageIndex(null);
  };

  const moveImage = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === images.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(index, 1);
    updatedImages.splice(newIndex, 0, movedImage);

    onUpdate({ images: updatedImages });
    setActiveImageIndex(newIndex);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Gallery Section</h2>

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
            Description
          </label>
          <textarea
            value={description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            onClick={stopPropagation}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            rows="2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Columns
          </label>
          <select
            value={columns}
            onChange={(e) => onUpdate({ columns: parseInt(e.target.value) })}
            onClick={stopPropagation}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
            <option value={4}>4 Columns</option>
            <option value={5}>5 Columns</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Number of columns on larger screens. Will automatically adjust to
            fewer columns on smaller screens.
          </p>
        </div>

        {/* Gallery Images */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Gallery Images</h3>
            <button
              onClick={addImage}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaPlus className="mr-1" /> Add Image
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`border rounded overflow-hidden cursor-pointer ${
                  activeImageIndex === index
                    ? "ring-2 ring-blue-500"
                    : "hover:shadow-md"
                }`}
                onClick={() =>
                  setActiveImageIndex(index === activeImageIndex ? null : index)
                }
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={image.caption || `Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FaImage className="text-gray-400 text-2xl" />
                    </div>
                  )}
                </div>

                <div className="p-2 bg-white flex justify-between items-center">
                  <div className="text-sm truncate flex-1">
                    {image.caption || `Image ${index + 1}`}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveImage(index, "up");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <FaArrowUp className={index === 0 ? "opacity-30" : ""} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveImage(index, "down");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === images.length - 1}
                    >
                      <FaArrowDown
                        className={
                          index === images.length - 1 ? "opacity-30" : ""
                        }
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add image button for empty gallery */}
          {images.length === 0 && (
            <div
              className="border-2 border-dashed rounded p-8 text-center cursor-pointer hover:bg-gray-50"
              onClick={addImage}
            >
              <FaImage className="mx-auto text-3xl text-gray-400 mb-2" />
              <p className="text-gray-500">Click to add gallery images</p>
            </div>
          )}

          {/* Image Editor Panel */}
          {activeImageIndex !== null && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-3">Edit Image Details</h4>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={images[activeImageIndex].url || ""}
                    onChange={(e) =>
                      handleImageChange(activeImageIndex, "url", e.target.value)
                    }
                    onClick={stopPropagation}
                    className="flex-1 p-2 text-sm border rounded-l"
                  />
                  <button
                    className="bg-gray-200 p-2 rounded-r border-t border-r border-b"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Image picker would go here
                      alert("Image picker would open here");
                    }}
                  >
                    <FaImage />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  value={images[activeImageIndex].caption || ""}
                  onChange={(e) =>
                    handleImageChange(
                      activeImageIndex,
                      "caption",
                      e.target.value
                    )
                  }
                  onClick={stopPropagation}
                  className="w-full p-2 text-sm border rounded"
                  placeholder="Image caption"
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={images[activeImageIndex].alt || ""}
                  onChange={(e) =>
                    handleImageChange(activeImageIndex, "alt", e.target.value)
                  }
                  onClick={stopPropagation}
                  className="w-full p-2 text-sm border rounded"
                  placeholder="Alternative text for accessibility"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Describe the image for screen readers and accessibility
                </p>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Enlarge URL (Optional)
                </label>
                <input
                  type="text"
                  value={images[activeImageIndex].largeUrl || ""}
                  onChange={(e) =>
                    handleImageChange(
                      activeImageIndex,
                      "largeUrl",
                      e.target.value
                    )
                  }
                  onClick={stopPropagation}
                  className="w-full p-2 text-sm border rounded"
                  placeholder="URL for high-resolution version"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional larger version of the image to show when clicked
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;
