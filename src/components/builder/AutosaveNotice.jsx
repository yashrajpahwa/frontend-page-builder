import React, { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const AutosaveNotice = ({ onDismiss }) => {
  const [visible, setVisible] = useState(true);
  const [lastSaved, setLastSaved] = useState("just now");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  return visible ? (
    <div className="fixed bottom-5 left-5 bg-green-50 border border-green-100 shadow-lg rounded-lg p-3 flex items-center z-30 transition-opacity duration-500 opacity-90 hover:opacity-100">
      <FaSave className="text-green-500 mr-2" />
      <div className="mr-3">
        <div className="text-sm font-medium text-green-800">Auto-Saving</div>
        <div className="text-xs text-green-600">
          Your work is automatically saved to your browser
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="text-green-400 hover:text-green-600"
        aria-label="Dismiss"
      >
        <FaTimes />
      </button>
    </div>
  ) : null;
};

export default AutosaveNotice;
