import React from "react";
import ReadOnlyMCE from "../../common/ReadOnlyMCE";

const FreestyleSection = ({ properties, theme }) => {
  const { title, content, backgroundColor = "white", maxWidth } = properties;

  const getBgColor = () => {
    switch (backgroundColor) {
      case "light":
        return "bg-gray-50";
      case "dark":
        return "bg-gray-900 text-white";
      case "primary":
        return theme.primaryColor;
      case "accent":
        return theme.accentColor;
      default:
        return "bg-white";
    }
  };

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${getBgColor()}`}>
      <div
        className={`container mx-auto ${maxWidth ? `max-w-${maxWidth}` : ""}`}
      >
        {title && (
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        )}

        <div className="prose prose-lg max-w-none">
          <ReadOnlyMCE initialValue={content} />
        </div>
      </div>
    </section>
  );
};

export default FreestyleSection;
