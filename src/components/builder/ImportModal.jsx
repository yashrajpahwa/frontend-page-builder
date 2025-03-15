import React, { useState } from "react";
import { FaUpload, FaTimes, FaClipboard } from "react-icons/fa";

const ImportModal = ({ isOpen, onClose, onImport }) => {
  const [importType, setImportType] = useState("file");
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        // Validate JSON
        JSON.parse(text);
        setJsonText(text);
        setError(null);
      } catch (error) {
        setError("Invalid JSON file. Please check the format.");
      }
    };
    reader.readAsText(file);
  };

  const handlePaste = (e) => {
    const pastedText = e.target.value;
    setJsonText(pastedText);
    try {
      if (pastedText.trim()) {
        JSON.parse(pastedText);
        setError(null);
      }
    } catch (error) {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  const handleImport = () => {
    try {
      const config = JSON.parse(jsonText);
      onImport(config);
      onClose();
    } catch (error) {
      setError("Failed to import configuration. Please check your JSON.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import Configuration</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`py-2 px-4 ${
                importType === "file" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setImportType("file")}
            >
              From File
            </button>
            <button
              className={`py-2 px-4 ${
                importType === "paste" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setImportType("paste")}
            >
              Paste JSON
            </button>
          </div>

          <div className="mt-4">
            {importType === "file" ? (
              <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg">
                <FaUpload className="text-3xl text-gray-400 mb-2" />
                <p className="text-gray-600 mb-4">
                  Upload a JSON configuration file
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                  id="json-file-input"
                />
                <label
                  htmlFor="json-file-input"
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                >
                  Select File
                </label>
                {fileName && <p className="mt-2 text-sm">{fileName}</p>}
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Paste your JSON configuration here:
                  </label>
                  <button
                    onClick={() => {
                      navigator.clipboard.readText().then((text) => {
                        setJsonText(text);
                        try {
                          JSON.parse(text);
                          setError(null);
                        } catch (error) {
                          setError("Invalid JSON format in clipboard.");
                        }
                      });
                    }}
                    className="ml-2 text-sm text-blue-500 hover:text-blue-700 flex items-center"
                  >
                    <FaClipboard className="mr-1" /> Paste from clipboard
                  </button>
                </div>
                <textarea
                  value={jsonText}
                  onChange={handlePaste}
                  className="w-full h-64 p-2 border rounded font-mono text-sm"
                  placeholder='{"pageId": "example", "title": "Example Page", ...}'
                />
              </div>
            )}
          </div>

          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!jsonText || error}
            className={`px-4 py-2 rounded text-white ${
              !jsonText || error
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Import Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
