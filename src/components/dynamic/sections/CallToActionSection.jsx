import React from "react";
import { Link } from "react-router-dom";

const CallToActionSection = ({ properties, theme }) => {
  const {
    title,
    description,
    buttonText,
    buttonLink,
    backgroundColor = "accent",
  } = properties;

  // Determine background color based on configuration
  const getBgColor = () => {
    switch (backgroundColor) {
      case "primary":
        return theme.primaryColor;
      case "accent":
        return theme.accentColor;
      default:
        return "bg-gray-50";
    }
  };

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${getBgColor()}`}>
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="mb-8 text-lg">{description}</p>
        {buttonText && (
          <Link
            to={buttonLink || "#"}
            className={`inline-block px-8 py-3 rounded-md ${
              theme.primaryColor.includes("bg-")
                ? theme.primaryColor
                : "bg-blue-500"
            } text-white font-medium hover:opacity-90 transition-opacity`}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default CallToActionSection;
