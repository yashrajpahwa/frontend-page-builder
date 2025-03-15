import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaImage,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { stopPropagation } from "./utils";

const PartnersEditor = ({ section, onUpdate }) => {
  const {
    title,
    description,
    partners = [],
    type = "default",
  } = section.properties;
  const [activePartnerIndex, setActivePartnerIndex] = useState(null);

  const handlePartnerChange = (index, field, value) => {
    const updatedPartners = [...partners];
    updatedPartners[index] = { ...updatedPartners[index], [field]: value };
    onUpdate({ partners: updatedPartners });
  };

  const addPartner = () => {
    let newPartner;

    if (type === "media") {
      newPartner = {
        name: "New Media Partner",
        logoUrl: "https://placehold.co/200x100/2b6cb0/ffffff?text=MediaPartner",
        tagline: "Media partner tagline",
        url: "https://example.com",
      };
    } else {
      newPartner = {
        name: "New Partner",
        logoUrl: "https://placehold.co/200x80/4299e1/ffffff?text=Partner",
        bannerUrl:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        tagline: "Partner tagline",
        description: "Brief description of this partner and what they do.",
        url: "https://example.com",
      };
    }

    onUpdate({ partners: [...partners, newPartner] });
    setActivePartnerIndex(partners.length);
  };

  const removePartner = (index) => {
    const updatedPartners = [...partners];
    updatedPartners.splice(index, 1);
    onUpdate({ partners: updatedPartners });
    setActivePartnerIndex(null);
  };

  const movePartner = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === partners.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedPartners = [...partners];
    const [movedPartner] = updatedPartners.splice(index, 1);
    updatedPartners.splice(newIndex, 0, movedPartner);

    onUpdate({ partners: updatedPartners });
    setActivePartnerIndex(newIndex);
  };

  const togglePartnerType = () => {
    onUpdate({ type: type === "media" ? "default" : "media" });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Partners Section</h2>

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
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <input
              type="checkbox"
              checked={type === "media"}
              onChange={togglePartnerType}
              onClick={stopPropagation}
              className="mr-2"
            />
            Media Partners Layout (simplified)
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Use this for logos-only display with minimal information
          </p>
        </div>

        {/* Partners List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Partners</h3>
            <button
              onClick={addPartner}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaPlus className="mr-1" /> Add Partner
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {partners.map((partner, index) => (
              <div
                key={index}
                className={`p-3 border rounded cursor-pointer ${
                  activePartnerIndex === index
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setActivePartnerIndex(
                    index === activePartnerIndex ? null : index
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {partner.logoUrl && (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="h-8 w-auto max-w-[100px] mr-3 object-contain"
                      />
                    )}
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      {partner.tagline && (
                        <div className="text-xs text-gray-500">
                          {partner.tagline}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        movePartner(index, "up");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <FaArrowUp className={index === 0 ? "opacity-30" : ""} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        movePartner(index, "down");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === partners.length - 1}
                    >
                      <FaArrowDown
                        className={
                          index === partners.length - 1 ? "opacity-30" : ""
                        }
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePartner(index);
                      }}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {activePartnerIndex === index && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Partner Name
                      </label>
                      <input
                        type="text"
                        value={partner.name || ""}
                        onChange={(e) =>
                          handlePartnerChange(index, "name", e.target.value)
                        }
                        onClick={stopPropagation}
                        className="w-full p-2 text-sm border rounded"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Logo URL
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={partner.logoUrl || ""}
                          onChange={(e) =>
                            handlePartnerChange(
                              index,
                              "logoUrl",
                              e.target.value
                            )
                          }
                          onClick={stopPropagation}
                          className="flex-1 p-2 text-sm border rounded-l"
                        />
                        <button
                          className="bg-gray-200 p-2 rounded-r border-t border-r border-b"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert("Image picker would open here");
                          }}
                        >
                          <FaImage />
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={partner.tagline || ""}
                        onChange={(e) =>
                          handlePartnerChange(index, "tagline", e.target.value)
                        }
                        onClick={stopPropagation}
                        className="w-full p-2 text-sm border rounded"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Website URL
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={partner.url || ""}
                          onChange={(e) =>
                            handlePartnerChange(index, "url", e.target.value)
                          }
                          onClick={stopPropagation}
                          className="flex-1 p-2 text-sm border rounded-l"
                          placeholder="https://example.com"
                        />
                        {partner.url && (
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-200 p-2 rounded-r border-t border-r border-b"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt className="text-gray-600" />
                          </a>
                        )}
                      </div>
                    </div>

                    {type !== "media" && (
                      <>
                        <div className="mb-3">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={partner.description || ""}
                            onChange={(e) =>
                              handlePartnerChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            onClick={stopPropagation}
                            className="w-full p-2 text-sm border rounded"
                            rows="2"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Banner Image URL
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              value={partner.bannerUrl || ""}
                              onChange={(e) =>
                                handlePartnerChange(
                                  index,
                                  "bannerUrl",
                                  e.target.value
                                )
                              }
                              onClick={stopPropagation}
                              className="flex-1 p-2 text-sm border rounded-l"
                            />
                            <button
                              className="bg-gray-200 p-2 rounded-r border-t border-r border-b"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert("Image picker would open here");
                              }}
                            >
                              <FaImage />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {partners.length === 0 && (
            <div className="text-center p-4 border border-dashed rounded">
              <p className="text-gray-500">
                No partners added yet. Click "Add Partner" to create one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnersEditor;
