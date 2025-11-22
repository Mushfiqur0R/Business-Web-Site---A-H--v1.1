// src/pages/AboutPage.jsx
import React from 'react';

// নতুন ইমেজ ইম্পোর্ট
import meeting1 from '../assets/images/meeting_01.jpg';
import meeting2 from '../assets/images/meeting_02.jpg';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* 1. Hero Section (Unchanged) */}
      <div className="relative h-64 md:h-80 bg-gray-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 animate-fade-in-up">About Us</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Leading the revolution in digital printing technology with innovation and trust.
          </p>
        </div>
      </div>

      {/* 2. Company Overview & Meeting Images Grid */}
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
               Our strategic partnerships with global leaders allow us to conduct high-level summits and technical meetings to bring the latest innovation to our local market. We believe in building relationships that last.
             </p>
             
             <div className="pt-4">
                <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                  Learn More About Our Vision
                </button>
             </div>
          </div>

          {/* Right: Meeting Images Staggered Grid */}
          <div className="relative h-[500px] w-full">
            {/* Image 1 (Back/Top-Right) */}
            <div className="absolute top-0 right-0 w-3/4 h-3/4 z-10 transition-all duration-500 hover:z-30 hover:scale-105">
               <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                 <img src={meeting1} alt="Strategic Meeting" className="w-full h-full object-cover" />
               </div>
            </div>

            {/* Image 2 (Front/Bottom-Left) */}
            <div className="absolute bottom-0 left-0 w-3/4 h-3/4 z-20 transition-all duration-500 hover:scale-105">
               <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                 <img src={meeting2} alt="Team Collaboration" className="w-full h-full object-cover" />
                 {/* Overlay Content */}
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white font-bold text-lg">Strategic Partnership</p>
                    <p className="text-gray-300 text-sm">Annual Planning 2025</p>
                 </div>
               </div>
            </div>
            
            {/* Decorative Dot Pattern */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
          </div>

        </div>
      </section>

      {/* 3. Stats Section (Unchanged) */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-400">
           <div className="p-6">
             <h3 className="text-6xl font-bold mb-2">12+</h3>
             <p className="text-blue-100 font-medium uppercase tracking-widest">Years Experience</p>
           </div>
           <div className="p-6">
             <h3 className="text-6xl font-bold mb-2">500+</h3>
             <p className="text-blue-100 font-medium uppercase tracking-widest">Machines Installed</p>
           </div>
           <div className="p-6">
             <h3 className="text-6xl font-bold mb-2">100%</h3>
             <p className="text-blue-100 font-medium uppercase tracking-widest">Client Satisfaction</p>
           </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;