import React from "react";
import * as FaIcons from "react-icons/fa";

const CardGridSection = ({ properties, theme }) => {
  const { title, cards, columns = 3 } = properties;

  // Determine grid columns based on the 'columns' property
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        {title && (
          <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
        )}

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {cards.map((card, index) => {
            // Dynamically render the icon specified in the JSON
            const IconComponent = FaIcons[card.icon] || FaIcons.FaCube;

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${theme.accentColor}`}
                >
                  <IconComponent className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className={theme.secondaryColor}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardGridSection;
