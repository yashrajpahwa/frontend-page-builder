import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEye,
  FaCode,
  FaTrash,
  FaSave,
  FaPencilAlt,
  FaArrowUp,
  FaArrowDown,
  FaFileImport,
  FaUndo,
  FaRedo,
  FaQuestion,
  FaLayerGroup,
  FaHome,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import sectionEditors from "../components/builder/sectionEditors";
import defaultConfig from "../data/pageConfig.json";
import ImportModal from "../components/builder/ImportModal";
import WelcomeGuide from "../components/builder/WelcomeGuide";
import TemplateSelector from "../components/builder/TemplateSelector";
import Preview from "../components/builder/Preview";

const Builder = () => {
  const [pageConfig, setPageConfig] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [availableSectionTypes, setAvailableSectionTypes] = useState([]);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [previewConfig, setPreviewConfig] = useState(null);

  // Initialize page config
  useEffect(() => {
    // Check if it's the first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedBuilder");
    if (!hasVisitedBefore) {
      setFirstVisit(true);
      setShowTemplateSelector(true);
      localStorage.setItem("hasVisitedBuilder", "true");
    } else {
      setFirstVisit(false);
    }

    // Start with a minimal config
    const initialConfig = {
      pageId: "new-page",
      title: "New Page",
      theme: {
        primary: "blue",
        secondary: "gray",
        accent: "yellow",
        background: "light",
        fontFamily: "sans",
      },
      sections: [],
    };
    setPageConfig(initialConfig);
    // Initialize history with initial config
    setHistory([initialConfig]);
    setHistoryIndex(0);

    // Get available section types from the editors
    const sectionTypes = Object.keys(sectionEditors).map((type) => ({
      type,
      label:
        type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, " $1"),
    }));
    setAvailableSectionTypes(sectionTypes);
  }, []);

  // Handle template selection
  const handleTemplateSelect = (templateConfig) => {
    setPageConfig(templateConfig);
    addToHistory(templateConfig);
    setShowTemplateSelector(false);

    // Show welcome guide after template selection for first-time users
    if (firstVisit) {
      setTimeout(() => {
        setShowWelcomeGuide(true);
      }, 1000);
    }
  };

  // Add state changes to history
  const addToHistory = (newConfig) => {
    // Slice history to remove any future states if user went back in history
    const newHistory = history.slice(0, historyIndex + 1);
    // Add new state
    newHistory.push(JSON.parse(JSON.stringify(newConfig)));
    // Keep only the last 50 states to prevent memory issues
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPageConfig(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPageConfig(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  // Add a new section
  const handleAddSection = (sectionType) => {
    // Get default properties for this section type
    let defaultProperties = {};
    const exampleSection = defaultConfig.sections.find(
      (section) => section.type === sectionType
    );

    if (exampleSection) {
      defaultProperties = { ...exampleSection.properties };
    } else {
      // Fallback defaults based on section type
      switch (sectionType) {
        case "hero":
          defaultProperties = {
            title: "New Hero Section",
            subtitle: "Add your subtitle here",
            imageUrl: "https://placehold.co/600x400",
            alignment: "left",
          };
          break;
        case "cardGrid":
          defaultProperties = {
            title: "New Card Grid",
            columns: 3,
            cards: [
              {
                title: "Card 1",
                description: "Description for card 1",
                icon: "FaStar",
              },
            ],
          };
          break;
        // Add defaults for other section types
        default:
          defaultProperties = { title: "New Section" };
      }
    }

    const newSection = {
      id: `${sectionType}-${uuidv4().slice(0, 8)}`,
      type: sectionType,
      properties: defaultProperties,
    };

    const newConfig = {
      ...pageConfig,
      sections: [...pageConfig.sections, newSection],
    };

    setPageConfig(newConfig);
    addToHistory(newConfig);

    setActiveSection(newSection.id);
    setShowAddSectionModal(false);
    toast.success(`Added new ${sectionType} section`);
  };

  // Update section properties
  const handleUpdateSection = (sectionId, newProperties) => {
    const updatedConfig = {
      ...pageConfig,
      sections: pageConfig.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              properties: { ...section.properties, ...newProperties },
            }
          : section
      ),
    };

    setPageConfig(updatedConfig);
    addToHistory(updatedConfig);
  };

  // Delete a section
  const handleDeleteSection = (sectionId) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      const updatedConfig = {
        ...pageConfig,
        sections: pageConfig.sections.filter(
          (section) => section.id !== sectionId
        ),
      };

      setPageConfig(updatedConfig);
      addToHistory(updatedConfig);

      if (activeSection === sectionId) {
        setActiveSection(null);
      }

      toast.success("Section deleted");
    }
  };

  // Import configuration
  const handleImportConfig = (importedConfig) => {
    try {
      setPageConfig(importedConfig);
      addToHistory(importedConfig);
      toast.success("Configuration imported successfully");
    } catch (error) {
      toast.error("Failed to import configuration");
    }
  };

  // Reorder sections via drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sections = Array.from(pageConfig.sections);
    const [reorderedSection] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, reorderedSection);

    const updatedConfig = {
      ...pageConfig,
      sections: sections,
    };

    setPageConfig(updatedConfig);
    addToHistory(updatedConfig);
  };

  // Move section up or down
  const moveSection = (sectionId, direction) => {
    const currentIndex = pageConfig.sections.findIndex(
      (s) => s.id === sectionId
    );
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === pageConfig.sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const sections = Array.from(pageConfig.sections);
    const [movedSection] = sections.splice(currentIndex, 1);
    sections.splice(newIndex, 0, movedSection);

    const updatedConfig = {
      ...pageConfig,
      sections: sections,
    };

    setPageConfig(updatedConfig);
    addToHistory(updatedConfig);
  };

  // Update theme properties
  const handleUpdateTheme = (newTheme) => {
    const updatedConfig = {
      ...pageConfig,
      theme: { ...pageConfig.theme, ...newTheme },
    };

    setPageConfig(updatedConfig);
    addToHistory(updatedConfig);
  };

  // Export page config as JSON
  const exportJson = () => {
    const jsonStr = JSON.stringify(pageConfig, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-config-${pageConfig.pageId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("JSON configuration exported successfully");
    setShowJsonModal(false);
  };

  // Start new project
  const startNewProject = () => {
    if (
      window.confirm(
        "Are you sure you want to start a new project? Any unsaved changes will be lost."
      )
    ) {
      const initialConfig = {
        pageId: "new-page-" + new Date().getTime(),
        title: "New Page",
        theme: {
          primary: "blue",
          secondary: "gray",
          accent: "yellow",
          background: "light",
          fontFamily: "sans",
        },
        sections: [],
      };
      setPageConfig(initialConfig);
      setActiveSection(null);
      addToHistory(initialConfig);
      toast.success("New project started");
    }
  };

  const togglePreview = () => {
    if (!previewMode) {
      // When enabling preview, set the current configuration
      setPreviewConfig(JSON.parse(JSON.stringify(pageConfig)));
    }
    setPreviewMode(!previewMode);
  };

  // If page config isn't loaded yet
  if (!pageConfig) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const activeSectionData = activeSection
    ? pageConfig.sections.find((section) => section.id === activeSection)
    : null;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar - Section List */}
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Page Builder</h1>
          <Link to="/" className="text-gray-300 hover:text-white">
            <FaHome />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
            onClick={() => setShowAddSectionModal(true)}
          >
            <FaPlus className="mr-1" /> Add Section
          </button>

          <button
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
            onClick={togglePreview}
          >
            <FaEye className="mr-1" /> Preview
          </button>

          <button
            className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center justify-center"
            onClick={() => setShowJsonModal(true)}
          >
            <FaCode className="mr-1" /> Export
          </button>

          <button
            className="px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center justify-center"
            onClick={() => setShowImportModal(true)}
          >
            <FaFileImport className="mr-1" /> Import
          </button>

          <button
            className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center"
            onClick={() => setShowTemplateSelector(true)}
          >
            <FaLayerGroup className="mr-1" /> Templates
          </button>

          <button
            className="px-3 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 flex items-center justify-center"
            onClick={() => setShowWelcomeGuide(true)}
          >
            <FaQuestion className="mr-1" /> Help
          </button>
        </div>

        <div className="bg-gray-700 p-2 rounded mb-4">
          <div className="flex justify-between mb-2">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className={`p-1 rounded ${
                historyIndex <= 0
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white hover:bg-gray-600"
              }`}
              title="Undo"
            >
              <FaUndo />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className={`p-1 rounded ${
                historyIndex >= history.length - 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white hover:bg-gray-600"
              }`}
              title="Redo"
            >
              <FaRedo />
            </button>
            <button
              onClick={startNewProject}
              className="p-1 text-white hover:bg-gray-600 rounded"
              title="New Project"
            >
              New
            </button>
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-1 text-gray-400">Page Title</label>
          <input
            type="text"
            value={pageConfig.title}
            onChange={(e) => {
              const updatedConfig = { ...pageConfig, title: e.target.value };
              setPageConfig(updatedConfig);
              // Don't add to history on every keystroke
              // Add to history after a delay or on blur
            }}
            onBlur={() => addToHistory(pageConfig)}
            className="px-2 py-1 bg-gray-700 rounded border border-gray-600 text-white"
          />
        </div>

        <h2 className="font-bold text-gray-400 uppercase text-sm mt-4 mb-2">
          Theme
        </h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <label className="block text-gray-400 text-xs">Primary</label>
            <select
              value={pageConfig.theme.primary}
              onChange={(e) => handleUpdateTheme({ primary: e.target.value })}
              className="w-full px-2 py-1 bg-gray-700 rounded border border-gray-600 text-white text-sm"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-xs">Accent</label>
            <select
              value={pageConfig.theme.accent}
              onChange={(e) => handleUpdateTheme({ accent: e.target.value })}
              className="w-full px-2 py-1 bg-gray-700 rounded border border-gray-600 text-white text-sm"
            >
              <option value="yellow">Yellow</option>
              <option value="orange">Orange</option>
              <option value="pink">Pink</option>
              <option value="teal">Teal</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-xs">Background</label>
            <select
              value={pageConfig.theme.background}
              onChange={(e) =>
                handleUpdateTheme({ background: e.target.value })
              }
              className="w-full px-2 py-1 bg-gray-700 rounded border border-gray-600 text-white text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-xs">Font</label>
            <select
              value={pageConfig.theme.fontFamily}
              onChange={(e) =>
                handleUpdateTheme({ fontFamily: e.target.value })
              }
              className="w-full px-2 py-1 bg-gray-700 rounded border border-gray-600 text-white text-sm"
            >
              <option value="sans">Sans</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
            </select>
          </div>
        </div>

        <h2 className="font-bold text-gray-400 uppercase text-sm mt-4 mb-2">
          Sections
        </h2>
        <div className="flex-grow overflow-y-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {pageConfig.sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                            activeSection === section.id
                              ? "bg-blue-700"
                              : "bg-gray-700 hover:bg-gray-600"
                          }`}
                          onClick={() => setActiveSection(section.id)}
                        >
                          <div>
                            <div className="font-medium">
                              {section.properties.title || section.id}
                            </div>
                            <div className="text-xs text-gray-400">
                              {section.type}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveSection(section.id, "up");
                              }}
                              className="text-gray-400 hover:text-white p-1"
                              disabled={index === 0}
                            >
                              <FaArrowUp
                                className={index === 0 ? "opacity-30" : ""}
                              />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveSection(section.id, "down");
                              }}
                              className="text-gray-400 hover:text-white p-1"
                              disabled={
                                index === pageConfig.sections.length - 1
                              }
                            >
                              <FaArrowDown
                                className={
                                  index === pageConfig.sections.length - 1
                                    ? "opacity-30"
                                    : ""
                                }
                              />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSection(section.id);
                              }}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {previewMode ? "Preview Mode" : "Edit Mode"}
          </h1>
          <div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
              onClick={togglePreview}
            >
              {previewMode ? "Back to Editing" : "Preview Page"}
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowJsonModal(true)}
            >
              Export
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {previewMode ? (
            <Preview
              config={previewConfig}
              onClose={() => setPreviewMode(false)}
            />
          ) : activeSection ? (
            <div className="p-6">
              {renderSectionEditor(activeSectionData, handleUpdateSection)}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <FaPencilAlt className="text-4xl mx-auto mb-2" />
                <p>Select a section to edit or add a new section</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Section</h2>
            <div className="grid grid-cols-2 gap-4">
              {availableSectionTypes.map((sectionType) => (
                <button
                  key={sectionType.type}
                  className="p-4 border rounded hover:bg-gray-100 flex flex-col items-center text-center"
                  onClick={() => handleAddSection(sectionType.type)}
                >
                  <div className="font-medium">{sectionType.label}</div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowAddSectionModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JSON Export Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">JSON Configuration</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
              {JSON.stringify(pageConfig, null, 2)}
            </pre>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowJsonModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                onClick={exportJson}
              >
                <FaSave className="mr-2" /> Save JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <ImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={handleImportConfig}
        />
      )}

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}

      {/* Welcome Guide */}
      {showWelcomeGuide && (
        <WelcomeGuide onClose={() => setShowWelcomeGuide(false)} />
      )}
    </div>
  );
};

// Helper function to render the appropriate section editor
const renderSectionEditor = (section, updateHandler) => {
  if (!section) return null;

  const EditorComponent = sectionEditors[section.type];

  if (!EditorComponent) {
    return <div>No editor available for section type: {section.type}</div>;
  }

  return (
    <EditorComponent
      section={section}
      onUpdate={(newProperties) => updateHandler(section.id, newProperties)}
    />
  );
};

export default Builder;
