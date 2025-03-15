import React from "react";
import { FaCalendarAlt, FaClock, FaLink, FaFileAlt } from "react-icons/fa";

const TimelineSection = ({ properties, theme }) => {
  const { title, description, events = [], showLinks = true } = properties;

  // Format date string to a more readable format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    } catch (e) {
      // If the date isn't parsable, return it as is
      return dateString;
    }
  };

  // Format time string
  const formatTime = (timeString) => {
    if (!timeString) return "";

    try {
      // If it's a full date-time string, extract just the time
      if (timeString.includes("T") || timeString.includes(" ")) {
        const date = new Date(timeString);
        return new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(date);
      }
      return timeString;
    } catch (e) {
      // If we can't parse it, return as is
      return timeString;
    }
  };

  const getIconForEventType = (type) => {
    switch (type?.toLowerCase()) {
      case "registration":
      case "deadline":
        return FaCalendarAlt;
      case "presentation":
      case "meeting":
        return FaClock;
      case "document":
      case "submission":
        return FaFileAlt;
      default:
        return FaCalendarAlt;
    }
  };

  // Function to get border color based on accent color
  const getBorderColor = (accentColor) => {
    if (!accentColor) {
      return theme.primaryColor.includes("bg-")
        ? theme.primaryColor.replace("bg-", "border-")
        : "border-blue-500";
    }

    return `border-${accentColor}-500`;
  };

  // Function to get text color based on accent color
  const getTextColor = (accentColor) => {
    if (!accentColor) {
      return theme.primaryColor.includes("bg-")
        ? theme.primaryColor.replace("bg-", "text-")
        : "text-blue-500";
    }

    return `text-${accentColor}-500`;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
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

        {/* Desktop timeline (hidden on small screens) */}
        <div className="relative hidden md:block">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          <div className="space-y-12 relative">
            {events.map((event, index) => {
              const IconComponent = getIconForEventType(event.type);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content box */}
                  <div
                    className={`w-5/12 ${isLeft ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`p-5 rounded-lg shadow-md bg-white border-l-4 ${
                        isLeft ? "mr-8" : "ml-8"
                      } ${getBorderColor(event.accentColor)}`}
                    >
                      <h3 className="text-xl font-bold">{event.title}</h3>

                      <div
                        className={`my-2 flex items-center gap-1 text-gray-600 text-sm ${
                          isLeft ? "justify-end" : "justify-start"
                        }`}
                      >
                        <FaCalendarAlt className="inline-block" />
                        <span>{formatDate(event.date)}</span>
                        {event.time && (
                          <>
                            <span className="mx-1">•</span>
                            <FaClock className="inline-block" />
                            <span>{formatTime(event.time)}</span>
                          </>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-gray-600 mt-2 text-sm">
                          {event.description}
                        </p>
                      )}

                      {showLinks && event.links && event.links.length > 0 && (
                        <div
                          className={`mt-3 space-y-1 ${
                            isLeft ? "text-right" : "text-left"
                          }`}
                        >
                          {event.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-sm ${
                                theme.primaryColor.includes("text-")
                                  ? theme.primaryColor
                                  : "text-blue-600"
                              } hover:underline`}
                            >
                              <FaLink size={12} /> {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-md bg-white">
                    <IconComponent
                      className={`text-sm ${getTextColor(event.accentColor)}`}
                    />
                  </div>

                  {/* Empty space for the other side */}
                  <div className="w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile timeline (visible only on small screens) */}
        <div className="md:hidden relative">
          {/* Vertical line for mobile */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-8">
            {events.map((event, index) => {
              const IconComponent = getIconForEventType(event.type);

              return (
                <div key={index} className="flex relative">
                  {/* Timeline node - mobile */}
                  <div className="absolute left-4 transform -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shadow-md bg-white">
                    <IconComponent
                      className={`text-xs ${getTextColor(event.accentColor)}`}
                    />
                  </div>

                  {/* Content box - mobile */}
                  <div className="ml-10 flex-1">
                    <div
                      className={`p-4 rounded-lg shadow-md bg-white border-l-4 ${getBorderColor(
                        event.accentColor
                      )}`}
                    >
                      <h3 className="text-lg font-bold">{event.title}</h3>

                      <div className="my-2 flex flex-wrap items-center gap-1 text-gray-600 text-xs">
                        <FaCalendarAlt className="inline-block" />
                        <span>{formatDate(event.date)}</span>
                        {event.time && (
                          <>
                            <span className="mx-1">•</span>
                            <FaClock className="inline-block" />
                            <span>{formatTime(event.time)}</span>
                          </>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-gray-600 mt-2 text-xs">
                          {event.description}
                        </p>
                      )}

                      {showLinks && event.links && event.links.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {event.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-xs ${
                                theme.primaryColor.includes("text-")
                                  ? theme.primaryColor
                                  : "text-blue-600"
                              } hover:underline`}
                            >
                              <FaLink size={10} /> {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
