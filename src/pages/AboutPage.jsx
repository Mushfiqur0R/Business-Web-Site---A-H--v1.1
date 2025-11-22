// src/pages/AboutPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import meeting1 from '../assets/images/meeting_01.jpg';
import meeting2 from '../assets/images/meeting_02.jpg';

// --- 1. CUSTOM ANIMATED COUNTER COMPONENT (UPDATED DESIGN) ---
const AnimatedCounter = ({ end, duration = 2000, suffix = "", label, icon }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) observer.unobserve(countRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasAnimated, end, duration]);

  return (
    <div 
      ref={countRef} 
      className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center"
    >
      {/* Icon Circle */}
      <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
        <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>

      {/* Number Counter */}
      <h3 className="text-5xl font-extrabold text-gray-900 mb-2">
        {count}<span className="text-blue-600">{suffix}</span>
      </h3>

      {/* Label */}
      <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
        {label}
      </p>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-600 group-hover:w-1/2 transition-all duration-500"></div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* 1. Hero Section */}
      <div className="relative h-64 md:h-80 bg-gray-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 animate-fade-in-up">About Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Leading the revolution in digital printing technology with innovation and trust.
          </p>
        </div>
      </div>

      {/* 2. Company Overview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-6">
             <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold tracking-wide mb-2">
               OUR STORY
             </div>
             <h2 className="text-4xl font-bold text-gray-900 leading-tight">
               Empowering the Textile Industry Since 2010
             </h2>
             <p className="text-gray-600 text-lg leading-relaxed">
               A & H Enterprise is a premier provider of advanced digital printing solutions in Bangladesh. We specialize in high-speed industrial textile printers, packaging solutions, and eco-friendly inks.
             </p>
             <p className="text-gray-600 text-lg leading-relaxed">
               Our strategic partnerships with global leaders allow us to conduct high-level summits and technical meetings to bring the latest innovation to our local market.
             </p>
             
             <div className="pt-4">
                <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                  Learn More About Our Vision
                </button>
             </div>
          </div>

          {/* Right: Meeting Images */}
          <div className="relative h-[500px] w-full">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 z-10 hover:z-30 transition-all duration-500 hover:scale-105">
               <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                 <img src={meeting1} alt="Strategic Meeting" className="w-full h-full object-cover" />
               </div>
            </div>
            <div className="absolute bottom-0 left-0 w-3/4 h-3/4 z-20 transition-all duration-500 hover:scale-105">
               <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                 <img src={meeting2} alt="Team Collaboration" className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white font-bold text-lg">Strategic Partnership</p>
                    <p className="text-gray-300 text-sm">Annual Planning 2025</p>
                 </div>
               </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
          </div>
        </div>
      </section>

      {/* 
         ----------------------------------------------------
         3. ANIMATED STATS SECTION (FIXED DESIGN)
         ----------------------------------------------------
      */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Impact in Numbers</h2>
              <p className="text-gray-500 mt-3">Demonstrating our commitment to excellence and growth</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               
               {/* Stat 1: Experience */}
               <AnimatedCounter 
                  end={12} 
                  suffix="+" 
                  label="Years Experience" 
                  icon={
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  }
               />

               {/* Stat 2: Machines */}
               <AnimatedCounter 
                  end={500} 
                  suffix="+" 
                  label="Machines Installed" 
                  icon={
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  }
               />

               {/* Stat 3: Satisfaction */}
               <AnimatedCounter 
                  end={100} 
                  suffix="%" 
                  label="Client Satisfaction" 
                  icon={
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  }
               />

            </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;