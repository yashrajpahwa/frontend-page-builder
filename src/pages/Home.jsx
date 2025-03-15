import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaLayerGroup, FaTools, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Home = () => {
  const showToast = () => {
    toast.success("React Toastify is working!");
  };

  return (
    <div className="container mx-auto p-4">
      <header className="py-8 mb-8 border-b">
        <h1 className="text-4xl flex items-center gap-2">
          <FaHome className="text-blue-500" /> DynamicBuilder
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          A powerful drag-and-drop page builder that lets you create dynamic
          websites without writing code. Build, customize, and export your pages
          in minutes.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Start Building</h2>
          <p className="text-gray-600">
            Create beautiful pages using our drag-and-drop builder. Add
            sections, customize content, and export the configuration.
          </p>
          <div className="mt-4">
            <Link
              to="/builder"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaTools className="mr-2" /> Open Page Builder
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Preview Examples</h2>
          <p className="text-gray-600">
            See how our dynamic pages render with different configurations.
            Check out these pre-built examples:
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Link
              to="/dynamic"
              className="flex items-center justify-center gap-2 px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <FaLayerGroup /> View Demo Page
            </Link>
            <button
              onClick={showToast}
              className="px-5 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Test Notifications
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Key Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Drag & Drop Sections</h3>
            <p className="text-gray-600">
              Easily reorder sections by dragging them to the desired position.
            </p>
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Rich Text Editing</h3>
            <p className="text-gray-600">
              Edit content with a full-featured rich text editor.
            </p>
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Theme Customization</h3>
            <p className="text-gray-600">
              Customize colors, fonts, and styles globally.
            </p>
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Import/Export</h3>
            <p className="text-gray-600">
              Save your work as JSON and import it later to continue editing.
            </p>
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Live Preview</h3>
            <p className="text-gray-600">
              See your changes in real-time with the built-in preview mode.
            </p>
          </li>
          <li className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold mb-2">Responsive Design</h3>
            <p className="text-gray-600">
              All pages are automatically responsive and mobile-friendly.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
