// src/components/Hero.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Step 1: Import the video locally
import heroVideo from '../assets/videos/hero-background.mp4';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    src={heroVideo}
    // --- CHANGE IS HERE ---
    className="hero-background-video" 
  >
    Your browser does not support the video tag.
  </video>
      
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4">
        {/* ... (বাকি কন্টেন্ট একই থাকবে) ... */}
        <div className="pt-20 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold mb-4 leading-tight">
              Advanced Digital Printing Solutions
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold font-sans mb-8 text-blue-300">
              A & H Enterprise
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10">
              Empowering the textile industry with high-quality, efficient, and sustainable digital printing technology.
            </p>
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link to="/textile" className="custom-cursor-area w-full sm:w-auto text-center px-10 py-3 text-lg font-medium border-2 border-white rounded-full transition-all duration-300 hover:bg-white hover:text-black">
                Products →
              </Link>
              <Link to="/about" className="custom-cursor-area w-full sm:w-auto text-center px-10 py-3 text-lg font-medium border-2 border-white rounded-full transition-all duration-300 hover:bg-white hover:text-black">
                About A&H →
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;