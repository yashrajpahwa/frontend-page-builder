import React from "react";

const SeoSettings = ({ pageConfig, onUpdate }) => {
  const { seo = {} } = pageConfig;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Meta Title</label>
        <input
          type="text"
          value={seo.title || pageConfig.title || ""}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Page title for search engines"
          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Recommended length: 50-60 characters
        </p>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Meta Description
        </label>
        <textarea
          value={seo.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description of the page for search results"
          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          rows="3"
        />
        <p className="mt-1 text-sm text-gray-500">
          Recommended length: 150-160 characters
        </p>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Keywords</label>
        <input
          type="text"
          value={seo.keywords || ""}
          onChange={(e) => onUpdate({ keywords: e.target.value })}
          placeholder="Comma-separated keywords"
          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Social Image URL
        </label>
        <input
          type="text"
          value={seo.socialImage || ""}
          onChange={(e) => onUpdate({ socialImage: e.target.value })}
          placeholder="URL of image to display when shared on social media"
          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Recommended size: 1200 x 630 pixels
        </p>
      </div>
    </div>
  );
};

export default SeoSettings;
