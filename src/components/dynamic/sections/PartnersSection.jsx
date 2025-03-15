import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const PartnersSection = ({ properties, theme }) => {
  const { title, description, partners, type = "default" } = properties;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Different styling based on partner type (default or media)
  const getSectionStyle = () => {
    return type === "media" ? "bg-gray-50" : "bg-white";
  };

  const renderPartners = () => {
    // For media partners, use a simpler grid layout
    if (type === "media") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="h-16 flex items-center justify-center mb-3">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="max-h-14 w-auto mx-auto object-contain"
                />
              </div>
              {partner.name && (
                <p className="text-center text-sm font-medium text-gray-700 mt-2">
                  {partner.name}
                </p>
              )}
              {partner.tagline && (
                <p className="text-center text-xs text-gray-500 mt-1">
                  {partner.tagline}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    }

    // For regular partners, use a more detailed card layout
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="h-48 overflow-hidden relative">
              {/* Partner banner/background image */}
              {partner.bannerUrl ? (
                <img
                  src={partner.bannerUrl}
                  alt={`${partner.name} banner`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="max-h-24 max-w-[80%] object-contain"
                  />
                </div>
              )}

              {/* Logo overlay for partners with banner images */}
              {partner.bannerUrl && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4">
                  <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-16 max-w-[150px] object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
              {partner.tagline && (
                <p className={`text-sm ${theme.secondaryColor} mb-3`}>
                  {partner.tagline}
                </p>
              )}
              {partner.description && (
                <p className="text-sm text-gray-600 line-clamp-3">
                  {partner.description}
                </p>
              )}

              {partner.url && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex items-center text-sm font-medium gap-1 ${
                    theme.primaryColor.includes("text-")
                      ? theme.primaryColor.replace("bg-", "text-")
                      : "text-blue-600"
                  } hover:underline`}
                >
                  Visit Partner <FaExternalLinkAlt size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${getSectionStyle()}`}>
      <div className="container mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {description && (
              <p className={`${theme.secondaryColor} max-w-3xl mx-auto`}>
                {description}
              </p>
            )}
          </div>
        )}

        {renderPartners()}
      </div>
    </section>
  );
};

export default PartnersSection;
