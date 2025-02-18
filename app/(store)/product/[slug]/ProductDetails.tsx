"use client"; // Mark this as a Client Component

import { Product } from "@/sanity.types";
import AddToBasketButton from "@/components/AddToBasketButton";
import { useState } from "react";
import { PortableText } from "@portabletext/react";

interface ProductDetailsProps {
  product: Product;
  isOutOfStock: boolean;
}

export default function ProductDetails({
  product,
  isOutOfStock,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Find the selected size's details
  const selectedSizeDetails = product.sizes?.find(
    (size) => size.size === selectedSize
  );

  // Check if the selected size is out of stock
  const isSelectedSizeOutOfStock = selectedSizeDetails?.stock ? selectedSizeDetails.stock <= 0 : false;
 
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        {/* Conditionally render the price */}
        {selectedSizeDetails ? (
          <div className="text-xl font-semibold mb-4">
            💲{(selectedSizeDetails.price ?? 0).toFixed(2)}
          </div>
        ) : (
          <div className="text-xl font-semibold mb-4 text-gray-500">
            Select a size to see the price
          </div>
        )}

        <div className="prose max-w-none mb-6">
          {Array.isArray(product.description) && (
            <PortableText value={product.description} />
          )}
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Select Size</h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size, index) => (
                <button
                  key={`${size.size}-${index}`} // Unique key
                  onClick={() => setSelectedSize(size.size)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                    selectedSize === size.size
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  disabled={size.stock <= 0} // Disable button if size is out of stock
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <AddToBasketButton
          product={product}
          disabled={isOutOfStock || !selectedSize || isSelectedSizeOutOfStock}
          selectedSize={selectedSize}
          selectedSizeDetails={selectedSizeDetails} // Pass selectedSizeDetails
        />
      </div>
    </div>
  );
}