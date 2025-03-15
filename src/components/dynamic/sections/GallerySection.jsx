import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const GallerySection = ({ properties, theme }) => {
  const { title, description, images, columns = 4 } = properties;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Determine grid columns based on the 'columns' property
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPreviousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {description && (
              <p className={theme.secondaryColor}>{description}</p>
            )}
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-4`}>
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={image.url}
                  alt={image.caption || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {image.caption && (
                <div className="p-2 bg-white">
                  <p className="text-sm text-gray-700">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={closeLightbox}
            >
              <FaTimes />
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300"
              onClick={goToPreviousImage}
            >
              <FaChevronLeft />
            </button>

            <div className="relative max-w-4xl max-h-[80vh]">
              <img
                src={images[currentImageIndex].url}
                alt={
                  images[currentImageIndex].caption ||
                  `Image ${currentImageIndex + 1}`
                }
                className="max-h-[80vh] max-w-full object-contain"
              />
              {images[currentImageIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 text-white">
                  <p>{images[currentImageIndex].caption}</p>
                </div>
              )}
            </div>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300"
              onClick={goToNextImage}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
