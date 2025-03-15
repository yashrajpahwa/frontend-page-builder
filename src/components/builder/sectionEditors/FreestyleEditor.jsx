import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { stopPropagation } from "./utils";

const FreestyleEditor = ({ section, onUpdate }) => {
  const { title, content, backgroundColor, maxWidth } = section.properties;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Freestyle Section</h2>

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

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background
            </label>
            <select
              value={backgroundColor || "white"}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              onClick={stopPropagation}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="white">White</option>
              <option value="light">Light Gray</option>
              <option value="dark">Dark</option>
              <option value="primary">Primary Color</option>
              <option value="accent">Accent Color</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Width
            </label>
            <select
              value={maxWidth || ""}
              onChange={(e) => onUpdate({ maxWidth: e.target.value })}
              onClick={stopPropagation}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Full Width</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="2xl">2X Large</option>
              <option value="3xl">3X Large</option>
              <option value="4xl">4X Large</option>
              <option value="5xl">5X Large</option>
              <option value="6xl">6X Large</option>
              <option value="7xl">7X Large</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <div onClick={stopPropagation} className="editor-interactive">
            <Editor
              tinymceScriptSrc="https://cdn.jsdelivr.net/npm/tinymce@7.6.0/tinymce.min.js"
              initialValue={
                content || "<p>Start editing your content here...</p>"
              }
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(newContent) => onUpdate({ content: newContent })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreestyleEditor;
