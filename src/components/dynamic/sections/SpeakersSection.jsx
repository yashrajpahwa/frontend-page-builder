import React from "react";
import { FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";

const SpeakersSection = ({ properties, theme }) => {
  const { title, description, speakers } = properties;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {description && (
              <p className={theme.secondaryColor}>{description}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 relative">
                <div className="w-32 h-32 overflow-hidden rounded-full mx-auto border-4 border-gray-100 shadow-md">
                  <img
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {speaker.companyLogo && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md">
                    <img
                      src={speaker.companyLogo}
                      alt={speaker.company || "Company"}
                      className="w-10 h-10 object-contain rounded-full"
                    />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold">{speaker.name}</h3>
              {speaker.title && (
                <p className={`text-sm ${theme.secondaryColor} mt-1`}>
                  {speaker.title}
                </p>
              )}
              {speaker.company && (
                <p className="text-sm font-medium mt-1">{speaker.company}</p>
              )}
              {speaker.bio && <p className="mt-3 text-sm">{speaker.bio}</p>}
              {speaker.socialLinks && (
                <div className="mt-4 flex justify-center space-x-3">
                  {speaker.socialLinks.linkedin && (
                    <a
                      href={speaker.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {speaker.socialLinks.twitter && (
                    <a
                      href={speaker.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-400"
                    >
                      <FaTwitter />
                    </a>
                  )}
                  {speaker.socialLinks.website && (
                    <a
                      href={speaker.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaGlobe />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
