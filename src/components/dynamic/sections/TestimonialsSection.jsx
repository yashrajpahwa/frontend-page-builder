import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialsSection = ({ properties, theme }) => {
  const { title, testimonials } = properties;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        {title && (
          <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4 text-gray-400">
                <FaQuoteLeft className="text-2xl" />
              </div>
              <p className="mb-6 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                {testimonial.avatarUrl && (
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className={`text-sm ${theme.secondaryColor}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
