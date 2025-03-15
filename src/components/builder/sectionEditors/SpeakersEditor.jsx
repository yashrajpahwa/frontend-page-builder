import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaImage,
  FaLink,
} from "react-icons/fa";

const SpeakersEditor = ({ section, onUpdate }) => {
  const { title, description, speakers = [] } = section.properties;
  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(null);

  const handleSpeakerChange = (index, field, value) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index] = { ...updatedSpeakers[index], [field]: value };
    onUpdate({ speakers: updatedSpeakers });
  };

  const handleSocialLinkChange = (speakerIndex, platform, value) => {
    const updatedSpeakers = [...speakers];
    if (!updatedSpeakers[speakerIndex].socialLinks) {
      updatedSpeakers[speakerIndex].socialLinks = {};
    }
    updatedSpeakers[speakerIndex].socialLinks = {
      ...updatedSpeakers[speakerIndex].socialLinks,
      [platform]: value,
    };
    onUpdate({ speakers: updatedSpeakers });
  };

  const addSpeaker = () => {
    const newSpeaker = {
      name: "New Speaker",
      title: "Speaker Title",
      company: "Company Name",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Speaker bio goes here.",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    };
    onUpdate({ speakers: [...speakers, newSpeaker] });
    setActiveSpeakerIndex(speakers.length);
  };

  const removeSpeaker = (index) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers.splice(index, 1);
    onUpdate({ speakers: updatedSpeakers });
    setActiveSpeakerIndex(null);
  };

  const moveSpeaker = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === speakers.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedSpeakers = [...speakers];
    const [movedSpeaker] = updatedSpeakers.splice(index, 1);
    updatedSpeakers.splice(newIndex, 0, movedSpeaker);

    onUpdate({ speakers: updatedSpeakers });
    setActiveSpeakerIndex(newIndex);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Speakers Section</h2>

      <div className="p-4 bg-white rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Title
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

        {/* Speakers List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Speakers</h3>
            <button
              onClick={addSpeaker}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaPlus className="mr-1" /> Add Speaker
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className={`p-3 border rounded cursor-pointer ${
                  activeSpeakerIndex === index
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setActiveSpeakerIndex(
                    index === activeSpeakerIndex ? null : index
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {speaker.imageUrl && (
                      <img
                        src={speaker.imageUrl}
                        alt={speaker.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{speaker.name}</div>
                      <div className="text-xs text-gray-500">
                        {speaker.title}
                        {speaker.company ? `, ${speaker.company}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSpeaker(index, "up");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <FaArrowUp className={index === 0 ? "opacity-30" : ""} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSpeaker(index, "down");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === speakers.length - 1}
                    >
                      <FaArrowDown
                        className={
                          index === speakers.length - 1 ? "opacity-30" : ""
                        }
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSpeaker(index);
                      }}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {activeSpeakerIndex === index && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Speaker Name
                        </label>
                        <input
                          type="text"
                          value={speaker.name || ""}
                          onChange={(e) =>
                            handleSpeakerChange(index, "name", e.target.value)
                          }
                          className="w-full p-2 text-sm border rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Title / Role
                        </label>
                        <input
                          type="text"
                          value={speaker.title || ""}
                          onChange={(e) =>
                            handleSpeakerChange(index, "title", e.target.value)
                          }
                          className="w-full p-2 text-sm border rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={speaker.company || ""}
                          onChange={(e) =>
                            handleSpeakerChange(
                              index,
                              "company",
                              e.target.value
                            )
                          }
                          className="w-full p-2 text-sm border rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Company Logo URL
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={speaker.companyLogo || ""}
                            onChange={(e) =>
                              handleSpeakerChange(
                                index,
                                "companyLogo",
                                e.target.value
                              )
                            }
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
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Speaker Bio
                      </label>
                      <textarea
                        value={speaker.bio || ""}
                        onChange={(e) =>
                          handleSpeakerChange(index, "bio", e.target.value)
                        }
                        className="w-full p-2 text-sm border rounded"
                        rows="3"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Profile Image URL
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={speaker.imageUrl || ""}
                          onChange={(e) =>
                            handleSpeakerChange(
                              index,
                              "imageUrl",
                              e.target.value
                            )
                          }
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
                      <h4 className="text-xs font-medium text-gray-700 mb-2">
                        Social Links
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-20 text-xs font-medium">
                            LinkedIn:
                          </span>
                          <input
                            type="text"
                            value={
                              (speaker.socialLinks &&
                                speaker.socialLinks.linkedin) ||
                              ""
                            }
                            onChange={(e) =>
                              handleSocialLinkChange(
                                index,
                                "linkedin",
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 text-sm border rounded"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>

                        <div className="flex items-center">
                          <span className="w-20 text-xs font-medium">
                            Twitter:
                          </span>
                          <input
                            type="text"
                            value={
                              (speaker.socialLinks &&
                                speaker.socialLinks.twitter) ||
                              ""
                            }
                            onChange={(e) =>
                              handleSocialLinkChange(
                                index,
                                "twitter",
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 text-sm border rounded"
                            placeholder="https://twitter.com/username"
                          />
                        </div>

                        <div className="flex items-center">
                          <span className="w-20 text-xs font-medium">
                            Website:
                          </span>
                          <input
                            type="text"
                            value={
                              (speaker.socialLinks &&
                                speaker.socialLinks.website) ||
                              ""
                            }
                            onChange={(e) =>
                              handleSocialLinkChange(
                                index,
                                "website",
                                e.target.value
                              )
                            }
                            className="flex-1 p-2 text-sm border rounded"
                            placeholder="https://website.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {speakers.length === 0 && (
            <div className="text-center p-4 border border-dashed rounded">
              <p className="text-gray-500">
                No speakers added yet. Click "Add Speaker" to create one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakersEditor;
