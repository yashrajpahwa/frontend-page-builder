import React, { useState } from "react";
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

const TimelineEditor = ({ section, onUpdate }) => {
  const {
    title,
    description,
    events = [],
    showLinks = true,
  } = section.properties;
  const [activeEventIndex, setActiveEventIndex] = useState(null);

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    onUpdate({ events: updatedEvents });
  };

  const addEvent = () => {
    const newEvent = {
      title: "New Event",
      date: new Date().toISOString().split("T")[0],
      time: "12:00:00",
      description: "Description of the event",
      type: "deadline",
      accentColor: "blue",
    };
    onUpdate({ events: [...events, newEvent] });
    setActiveEventIndex(events.length);
  };

  const removeEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    onUpdate({ events: updatedEvents });
    setActiveEventIndex(null);
  };

  const moveEvent = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === events.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedEvents = [...events];
    const [movedEvent] = updatedEvents.splice(index, 1);
    updatedEvents.splice(newIndex, 0, movedEvent);

    onUpdate({ events: updatedEvents });
    setActiveEventIndex(newIndex);
  };

  const addLink = (eventIndex) => {
    const updatedEvents = [...events];
    if (!updatedEvents[eventIndex].links) {
      updatedEvents[eventIndex].links = [];
    }
    updatedEvents[eventIndex].links.push({ label: "New Link", url: "#" });
    onUpdate({ events: updatedEvents });
  };

  const updateLink = (eventIndex, linkIndex, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].links[linkIndex] = {
      ...updatedEvents[eventIndex].links[linkIndex],
      [field]: value,
    };
    onUpdate({ events: updatedEvents });
  };

  const removeLink = (eventIndex, linkIndex) => {
    const updatedEvents = [...events];
    updatedEvents[eventIndex].links.splice(linkIndex, 1);
    onUpdate({ events: updatedEvents });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Timeline Section</h2>

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

        <div className="mb-4">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <input
              type="checkbox"
              checked={showLinks}
              onChange={(e) => onUpdate({ showLinks: e.target.checked })}
              className="mr-2"
            />
            Show Links
          </label>
        </div>

        {/* Events List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Timeline Events</h3>
            <button
              onClick={addEvent}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaPlus className="mr-1" /> Add Event
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {events.map((event, index) => (
              <div
                key={index}
                className={`p-3 border rounded cursor-pointer ${
                  activeEventIndex === index
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setActiveEventIndex(index === activeEventIndex ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                      {event.time && ` • ${event.time}`}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveEvent(index, "up");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <FaArrowUp className={index === 0 ? "opacity-30" : ""} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveEvent(index, "down");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === events.length - 1}
                    >
                      <FaArrowDown
                        className={
                          index === events.length - 1 ? "opacity-30" : ""
                        }
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEvent(index);
                      }}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {activeEventIndex === index && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Event Title
                        </label>
                        <input
                          type="text"
                          value={event.title || ""}
                          onChange={(e) =>
                            handleEventChange(index, "title", e.target.value)
                          }
                          className="w-full p-2 text-sm border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Event Type
                        </label>
                        <select
                          value={event.type || "deadline"}
                          onChange={(e) =>
                            handleEventChange(index, "type", e.target.value)
                          }
                          className="w-full p-2 text-sm border rounded"
                        >
                          <option value="deadline">Deadline</option>
                          <option value="presentation">Presentation</option>
                          <option value="meeting">Meeting</option>
                          <option value="submission">Submission</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={event.date || ""}
                          onChange={(e) =>
                            handleEventChange(index, "date", e.target.value)
                          }
                          className="w-full p-2 text-sm border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={event.time || ""}
                          onChange={(e) =>
                            handleEventChange(index, "time", e.target.value)
                          }
                          className="w-full p-2 text-sm border rounded"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={event.description || ""}
                        onChange={(e) =>
                          handleEventChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border rounded"
                        rows="2"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Accent Color
                      </label>
                      <select
                        value={event.accentColor || "blue"}
                        onChange={(e) =>
                          handleEventChange(
                            index,
                            "accentColor",
                            e.target.value
                          )
                        }
                        className="w-full p-2 text-sm border rounded"
                      >
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="indigo">Indigo</option>
                        <option value="teal">Teal</option>
                      </select>
                    </div>

                    {/* Event Links */}
                    {showLinks && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium text-gray-700">
                            Links
                          </h4>
                          <button
                            onClick={() => addLink(index)}
                            className="flex items-center px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            <FaPlus className="mr-1" /> Add Link
                          </button>
                        </div>

                        {event.links && event.links.length > 0 ? (
                          <div className="space-y-2">
                            {event.links.map((link, linkIndex) => (
                              <div
                                key={linkIndex}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="text"
                                  placeholder="Label"
                                  value={link.label || ""}
                                  onChange={(e) =>
                                    updateLink(
                                      index,
                                      linkIndex,
                                      "label",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 p-1 text-xs border rounded"
                                />
                                <input
                                  type="text"
                                  placeholder="URL"
                                  value={link.url || ""}
                                  onChange={(e) =>
                                    updateLink(
                                      index,
                                      linkIndex,
                                      "url",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 p-1 text-xs border rounded"
                                />
                                <button
                                  onClick={() => removeLink(index, linkIndex)}
                                  className="p-1 text-red-500 hover:text-red-700"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">
                            No links added yet
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center p-4 border border-dashed rounded">
              <p className="text-gray-500">
                No events added yet. Click "Add Event" to create one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineEditor;
