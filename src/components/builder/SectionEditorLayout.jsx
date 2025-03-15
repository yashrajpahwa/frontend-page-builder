import React from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const SectionEditorLayout = ({ sectionTitle, children, onBack, onSave }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white shadow-sm p-3 flex justify-between items-center border-b">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-800 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to sections
        </button>

        <h2 className="text-lg font-medium">{sectionTitle}</h2>

        <button
          onClick={onSave}
          className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
        >
          <FaSave className="mr-1" /> Apply Changes
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
};

export default SectionEditorLayout;
