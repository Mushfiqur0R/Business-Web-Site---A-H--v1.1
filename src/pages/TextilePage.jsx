// src/pages/TextilePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { textileSeries } from '../data/productsData';
import heroVideo from '../assets/videos/hero-background.mp4';

const TextilePage = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* -----------------------------------------------------------
          1. VIDEO BANNER SECTION (FIXED)
      ------------------------------------------------------------ */}
      <div className="relative h-[60vh] w-full bg-black overflow-hidden">
        
        {/* Video Element - Fixed CSS */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src={heroVideo}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Optional: Extra Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-8xl font-bold font-serif tracking-wider mb-6">
            TEXTILE
          </h1>
          <div className="h-1 w-24 bg-blue-500 mb-6"></div>
          <p className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase max-w-3xl leading-relaxed">
            High Speed Industrial Digital Textile Printer
          </p>
        </div>
      </div>

      {/* -----------------------------------------------------------
          2. SERIES SECTIONS LOOP
      ------------------------------------------------------------ */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
        
        {textileSeries.map((series, index) => (
          <div key={index} className="relative">
            
            {/* Series Title */}
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-transparent [-webkit-text-stroke:1px_#9ca3af] md:[-webkit-text-stroke:2px_#9ca3af] hover:[-webkit-text-stroke:0px] hover:text-gray-800 transition-all duration-700 cursor-default select-none opacity-40 hover:opacity-100">
                {series.seriesName}
              </h2>
              <p className="mt-2 text-lg text-gray-500 font-light tracking-wide border-l-0 md:border-l-4 border-blue-500 pl-0 md:pl-4 inline-block">
                {series.description}
              </p>
            </div>

            {/* Custom CSS Grid for 2 Columns */}
            <div className="atexco-product-grid">
              {series.products.map((product) => (
                <Link 
                  to={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} 
                  key={product.id}
                  className="block group/card w-full"
                >
                  {/* Card Container */}
                  <div className="relative bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-xl border border-gray-800 transition-all duration-500 hover:border-gray-600 hover:-translate-y-2 flex flex-col items-center justify-between h-[550px] p-6">
                    
                    {/* Text Info */}
                    <div className="w-full text-center z-20 mt-4">
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-2">
                        {product.output}
                      </p>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white font-sans tracking-tight mb-4 group-hover/card:text-blue-500 transition-colors duration-300">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-center text-gray-300 text-sm font-semibold group-hover/card:text-blue-400 transition-colors">
                        Learn More 
                        <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover/card:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative w-full flex-grow flex items-end justify-center mt-6 pb-4">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-600/20 rounded-full blur-[60px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="relative z-10 w-full h-auto max-h-[300px] object-contain transition-transform duration-700 ease-out group-hover/card:scale-105" 
                      />
                    </div>

                  </div>
                </Link>
              ))}
            </div>

            {/* Separator Line */}
            {index !== textileSeries.length - 1 && (
               <div className="w-full h-px bg-gray-200 mt-24 opacity-30"></div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default TextilePage;