import React from "react";
import { FaTimes } from "react-icons/fa";
import defaultConfig from "../../data/pageConfig.json";

// Sample templates based on our existing config
const templates = [
  {
    id: "basic",
    name: "Basic Page",
    description: "A simple page with header, hero, and footer sections",
    thumbnail: "https://placehold.co/300x200/4299e1/ffffff?text=Basic+Page",
    config: {
      pageId: "basic-page",
      title: "Basic Page",
      theme: defaultConfig.theme,
      sections: defaultConfig.sections.filter((s) =>
        ["header", "hero", "footer"].includes(s.id)
      ),
    },
  },
  {
    id: "business",
    name: "Business Site",
    description:
      "Complete business site with features, testimonials, and call-to-action",
    thumbnail: "https://placehold.co/300x200/38a169/ffffff?text=Business+Site",
    config: {
      pageId: "business-site",
      title: "Business Website",
      theme: defaultConfig.theme,
      sections: defaultConfig.sections.filter((s) =>
        [
          "header",
          "hero",
          "features",
          "testimonials",
          "cta",
          "footer",
        ].includes(s.id)
      ),
    },
  },
  {
    id: "event",
    name: "Event Page",
    description: "Event page with speakers, timeline, and gallery",
    thumbnail: "https://placehold.co/300x200/805ad5/ffffff?text=Event+Page",
    config: {
      pageId: "event-page",
      title: "Event Page",
      theme: {
        ...defaultConfig.theme,
        primary: "purple",
      },
      sections: defaultConfig.sections.filter((s) =>
        [
          "header",
          "hero",
          "speakers",
          "timeline",
          "gallery",
          "footer",
        ].includes(s.id)
      ),
    },
  },
  {
    id: "blank",
    name: "Blank Page",
    description: "Start from scratch with only header and footer",
    thumbnail: "https://placehold.co/300x200/a0aec0/ffffff?text=Blank+Page",
    config: {
      pageId: "blank-page",
      title: "New Page",
      theme: defaultConfig.theme,
      sections: defaultConfig.sections.filter((s) =>
        ["header", "footer"].includes(s.id)
      ),
    },
  },
];

const TemplateSelector = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Choose a Template</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Start with a template or create from scratch. You can customize
          everything later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelect(template.config)}
              className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-40 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
