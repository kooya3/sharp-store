"use client"; // Mark this as a Client Component

import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import { useState } from "react";

interface ProductCarouselProps {
  images: Array<{ asset: { _ref: string } }>; // Array of images from Sanity
  isOutOfStock: boolean;
  productName: string;
}

export default function ProductCarousel({
  images,
  isOutOfStock,
  productName,
}: ProductCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
        isOutOfStock ? "opacity-50" : ""
      }`}
    >
      {images.length > 0 && (
        <>
          <Image
            src={imageUrl(images[currentImageIndex]).url()}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            fill
            className="object-contain transition-transform duration-300 hover:scale-105"
            priority // Ensure the first image loads quickly
          />
          {/* Carousel Navigation Buttons */}
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition-colors"
            aria-label="Previous Image"
          >
            &larr;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/75 transition-colors"
            aria-label="Next Image"
          >
            &rarr;
          </button>
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImageIndex === index
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      {isOutOfStock && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white font-bold text-lg">Out of Stock</span>
        </div>
      )}
    </div>
  );
}