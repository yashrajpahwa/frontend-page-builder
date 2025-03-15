import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaImage,
} from "react-icons/fa";
import { stopPropagation } from "./utils";

const TestimonialsEditor = ({ section, onUpdate }) => {
  const { title, testimonials = [] } = section.properties;
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(null);

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value,
    };
    onUpdate({ testimonials: updatedTestimonials });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      quote: "This is a sample testimonial quote.",
      author: "John Doe",
      role: "Customer",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    };
    onUpdate({ testimonials: [...testimonials, newTestimonial] });
  };

  const removeTestimonial = (index) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials.splice(index, 1);
    onUpdate({ testimonials: updatedTestimonials });
    setActiveTestimonialIndex(null);
  };

  const moveTestimonial = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === testimonials.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedTestimonials = [...testimonials];
    const [movedTestimonial] = updatedTestimonials.splice(index, 1);
    updatedTestimonials.splice(newIndex, 0, movedTestimonial);

    onUpdate({ testimonials: updatedTestimonials });
    setActiveTestimonialIndex(newIndex);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Testimonials Section</h2>

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

        {/* Testimonials List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Testimonials</h3>
            <button
              onClick={addTestimonial}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaPlus className="mr-1" /> Add Testimonial
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-3 border rounded cursor-pointer ${
                  activeTestimonialIndex === index
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setActiveTestimonialIndex(
                    index === activeTestimonialIndex ? null : index
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {testimonial.avatarUrl && (
                      <img
                        src={testimonial.avatarUrl}
                        alt={testimonial.author}
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-xs text-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveTestimonial(index, "up");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <FaArrowUp className={index === 0 ? "opacity-30" : ""} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveTestimonial(index, "down");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === testimonials.length - 1}
                    >
                      <FaArrowDown
                        className={
                          index === testimonials.length - 1 ? "opacity-30" : ""
                        }
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTestimonial(index);
                      }}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {activeTestimonialIndex === index && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Quote
                      </label>
                      <textarea
                        value={testimonial.quote || ""}
                        onChange={(e) =>
                          handleTestimonialChange(
                            index,
                            "quote",
                            e.target.value
                          )
                        }
                        onClick={stopPropagation}
                        className="w-full p-2 text-sm border rounded"
                        rows="3"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={testimonial.author || ""}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              "author",
                              e.target.value
                            )
                          }
                          onClick={stopPropagation}
                          className="w-full p-2 text-sm border rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Role / Position
                        </label>
                        <input
                          type="text"
                          value={testimonial.role || ""}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              "role",
                              e.target.value
                            )
                          }
                          onClick={stopPropagation}
                          className="w-full p-2 text-sm border rounded"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Avatar URL
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={testimonial.avatarUrl || ""}
                          onChange={(e) =>
                            handleTestimonialChange(
                              index,
                              "avatarUrl",
                              e.target.value
                            )
                          }
                          onClick={stopPropagation}
                          className="flex-1 p-2 text-sm border rounded-l"
                        />
                        <button
                          className="bg-gray-200 p-2 rounded-r border-t border-r border-b"
                          onClick={() => {
                            // You could implement an image picker here
                            alert("Image picker would open here");
                          }}
                        >
                          <FaImage />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {testimonials.length === 0 && (
            <div className="text-center p-4 border border-dashed rounded">
              <p className="text-gray-500">
                No testimonials added yet. Click "Add Testimonial" to create
                one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsEditor;
