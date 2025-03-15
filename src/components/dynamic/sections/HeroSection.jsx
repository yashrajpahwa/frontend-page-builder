import React from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ properties, theme }) => {
  const { title, subtitle, ctaText, ctaLink, imageUrl, alignment } = properties;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div
          className={`flex flex-col ${
            alignment === "right" ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-8`}
        >
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {title}
            </h1>
            <p className={`text-xl ${theme.secondaryColor}`}>{subtitle}</p>
            {ctaText && (
              <Link
                to={ctaLink || "#"}
                className={`inline-block px-6 py-3 rounded-md shadow-md ${
                  theme.primaryColor.includes("bg-")
                    ? theme.primaryColor
                    : "bg-blue-500"
                } text-white hover:shadow-lg transition-all`}
              >
                {ctaText}
              </Link>
            )}
          </div>
          <div className="md:w-1/2">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
