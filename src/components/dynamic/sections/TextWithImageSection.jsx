import React from "react";
import { Link } from "react-router-dom";

const TextWithImageSection = ({ properties, theme }) => {
  const {
    title,
    content,
    imageUrl,
    imagePosition = "right",
    buttonText,
    buttonLink,
  } = properties;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div
          className={`flex flex-col ${
            imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-12`}
        >
          <div className="md:w-1/2 space-y-4">
            {title && <h2 className="text-3xl font-bold">{title}</h2>}
            <div className={`${theme.secondaryColor} leading-relaxed`}>
              <p>{content}</p>
            </div>
            {buttonText && (
              <div className="mt-6">
                <Link
                  to={buttonLink || "#"}
                  className={`inline-block px-6 py-2 rounded-md ${
                    theme.primaryColor.includes("bg-")
                      ? theme.primaryColor
                      : "bg-blue-500"
                  } text-white hover:opacity-90 transition-opacity`}
                >
                  {buttonText}
                </Link>
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            <img
              src={imageUrl}
              alt={title || "Section image"}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextWithImageSection;
