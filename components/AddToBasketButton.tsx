"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
  selectedSize: string | null;
  selectedSizeDetails?: { size: string; stock: number; price: number }; // Add selectedSizeDetails
}

function AddToBasketButton({
  product,
  disabled,
  selectedSize,
  selectedSizeDetails,
}: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id, selectedSize);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;


  const handleAddItem = () => {
    if (!selectedSize || !selectedSizeDetails) {
      alert("Please select a size.");
      return;
    }
    addItem(product, selectedSize);
  };

  const handleRemoveItem = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    removeItem(product._id, selectedSize);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={handleRemoveItem}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          itemCount === 0
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={itemCount === 0 || disabled || !selectedSize}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={handleAddItem}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          disabled || !selectedSize
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={disabled || !selectedSize}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;