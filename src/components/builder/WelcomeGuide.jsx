import React, { useState } from "react";
import { FaTimes, FaLightbulb, FaArrowRight } from "react-icons/fa";

const WelcomeGuide = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Page Builder!",
      content:
        "This tool allows you to create dynamic pages by adding and configuring sections. Let's walk through the basics.",
    },
    {
      title: "Add Sections",
      content:
        "Start by clicking 'Add Section' to choose from different section types like Hero, Features, Testimonials, and more.",
    },
    {
      title: "Edit Content",
      content:
        "Click on any section in the left sidebar to edit its content. Each section has different properties you can customize.",
    },
    {
      title: "Arrange Sections",
      content:
        "Drag and drop sections in the sidebar to reorder them. You can also use the up and down arrows.",
    },
    {
      title: "Theme Customization",
      content:
        "Use the Theme controls to change colors, fonts, and styles across your entire page.",
    },
    {
      title: "Preview & Export",
      content:
        "Click 'Preview' to see how your page looks, and 'Export' when you're ready to get the JSON configuration file.",
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white rounded-lg shadow-xl w-96 z-50 overflow-hidden">
      <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <FaLightbulb className="mr-2" />
          <h3 className="font-medium">{steps[step].title}</h3>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <FaTimes />
        </button>
      </div>

      <div className="p-4">
        <p className="text-gray-700 mb-6">{steps[step].content}</p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === step ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            {step < steps.length - 1 ? "Next" : "Get Started"}
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeGuide;
