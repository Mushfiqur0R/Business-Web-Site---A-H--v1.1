// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    // Card Wrapper with Gradient Background
    <div className="group relative h-[30rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 border border-gray-100">
      
      {/* 1. Animated Gradient Blob (Background Effect) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/30 transition-colors duration-700"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-500/30 transition-colors duration-700"></div>
      
      {/* 2. Content Layer */}
      <div className="relative h-full flex flex-col items-center justify-between p-8 text-center z-10">
        
        {/* Top text (Category) */}
        <div className="w-full transition-opacity duration-300">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{product.category}</p>
        </div>

        {/* Product Image */}
        <div className="relative w-full flex-grow flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-48 md:h-56 w-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* Bottom Text */}
        <div className="w-full transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center text-sm font-semibold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Learn More <span className="ml-2">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;