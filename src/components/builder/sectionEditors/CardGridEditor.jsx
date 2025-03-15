import React, { useState } from "react";
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

const CardGridEditor = ({ section, onUpdate }) => {
  const { title, cards = [], columns = 3 } = section.properties;
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    onUpdate({ cards: updatedCards });
  };

  const addCard = () => {
    const newCard = {
      title: "New Card",
      description: "Description for this card",
      icon: "FaStar",
    };
    onUpdate({ cards: [...cards, newCard] });
  };

  const removeCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    onUpdate({ cards: updatedCards });
    setActiveCardIndex(null);
  };

  const moveCard = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === cards.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(index, 1);
    updatedCards.splice(newIndex, 0, movedCard);

    onUpdate({ cards: updatedCards });
    setActiveCardIndex(newIndex);
  };

  const openIconPicker = (index) => {
    setSelectedCard(index);
    setShowIconPicker(true);
  };

  const selectIcon = (iconName) => {
    handleCardChange(selectedCard, "icon", iconName);
    setShowIconPicker(false);
  };

  // Get all Font Awesome icons
  const faIcons = Object.keys(FaIcons)
    .filter((key) => key.startsWith("Fa") && typeof FaIcons[key] === "function")
    .slice(0, 100); // Limit to first 100 icons for better performance

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Card Grid Section</h2>

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
            Columns
          </label>
          <select
            value={columns}
            onChange={(e) => onUpdate({ columns: parseInt(e.target.value) })}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={1}>1 Column</option>
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
            <option value={4}>4 Columns</option>
          </select>
        </div>

        {/* Cards List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Cards</h3>
            <button
              onClick={addCard}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <FaPlus className="mr-1" /> Add Card
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`p-3 border rounded cursor-pointer ${
                  activeCardIndex === index
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() =>
                  setActiveCardIndex(index === activeCardIndex ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {card.icon &&
                      FaIcons[card.icon] &&
                      React.createElement(FaIcons[card.icon], {
                        className: "mr-2 text-gray-500",
                      })}
                    <div className="font-medium">{card.title}</div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCard(index, "up");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === 0}
                    >
                      <FaArrowUp className={index === 0 ? "opacity-30" : ""} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCard(index, "down");
                      }}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      disabled={index === cards.length - 1}
                    >
                      <FaArrowDown
                        className={
                          index === cards.length - 1 ? "opacity-30" : ""
                        }
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCard(index);
                      }}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {activeCardIndex === index && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Card Title
                      </label>
                      <input
                        type="text"
                        value={card.title || ""}
                        onChange={(e) =>
                          handleCardChange(index, "title", e.target.value)
                        }
                        className="w-full p-2 text-sm border rounded"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={card.description || ""}
                        onChange={(e) =>
                          handleCardChange(index, "description", e.target.value)
                        }
                        className="w-full p-2 text-sm border rounded"
                        rows="2"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Icon
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={card.icon || ""}
                          onChange={(e) =>
                            handleCardChange(index, "icon", e.target.value)
                          }
                          className="flex-1 p-2 text-sm border rounded-l"
                          placeholder="FaIcon name (e.g. FaStar)"
                        />
                        <button
                          className="bg-gray-200 p-2 rounded-r border-t border-r border-b"
                          onClick={() => openIconPicker(index)}
                        >
                          Choose
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {cards.length === 0 && (
            <div className="text-center p-4 border border-dashed rounded">
              <p className="text-gray-500">
                No cards added yet. Click "Add Card" to create one.
              </p>
            </div>
          )}
        </div>

        {/* Icon Picker Modal */}
        {showIconPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Select an Icon</h2>
              <div className="grid grid-cols-8 gap-2">
                {faIcons.map((iconName) => {
                  const Icon = FaIcons[iconName];
                  return (
                    <button
                      key={iconName}
                      className="p-3 border rounded hover:bg-blue-100 flex items-center justify-center"
                      onClick={() => selectIcon(iconName)}
                    >
                      <Icon className="text-xl" />
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowIconPicker(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardGridEditor;
