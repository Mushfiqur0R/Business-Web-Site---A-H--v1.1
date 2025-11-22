// src/pages/PackagingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// --- Importing Images from Assets (Reusing Sublimation Images as requested) ---
import packImg1 from '../assets/images/four-HeadsSublimationPrinter.png';
import packImg2 from '../assets/images/eight-HeadsSublimationPrinter.png';
import packImg3 from '../assets/images/thirty-HeadsSublimationPrinter.png';
import packImg4 from '../assets/images/VEGA-X5.png'; // এটি যদি থাকে তবে প্যাকেজিংয়ের জন্য ভালো

// Application Cards Data
const applications = [
  { id: 1, title: "Food Packaging", img: "https://i.postimg.cc/FRBsQtbY/image.png" },
  { id: 2, title: "Folding Cartons", img: "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, title: "Paper Cups", img: "https://images.pexels.com/photos/5947019/pexels-photo-5947019.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

// Temporary Products Data for Packaging Page
const packagingProducts = [
  {
    id: 'pkg-1',
    name: 'EcoPack 4H',
    output: 'Digital Carton Solution',
    imageUrl: packImg1, // Sublimation image used
    linkName: 'sublimation-4h' // Link to existing detail page logic
  },
  {
    id: 'pkg-2',
    name: 'BoxMaster 8H',
    output: 'Corrugated Printing',
    imageUrl: packImg2, // Sublimation image used
    linkName: 'sublimation-8h'
  },
  {
    id: 'pkg-3',
    name: 'Label Press 30H',
    output: 'Industrial Label Printing',
    imageUrl: packImg3, // Sublimation image used
    linkName: 'sublimation-30h'
  },
  {
    id: 'pkg-4',
    name: 'WebMaster Pro',
    output: 'Flexible Packaging',
    imageUrl: packImg4, // Webmaster image
    linkName: 'webmaster'
  }
];

const PackagingPage = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Banner */}
      <div className="relative h-[50vh] bg-gray-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.pexels.com/photos/2247677/pexels-photo-2247677.jpeg')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4 animate-fade-in-up">PACKAGING</h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl font-light tracking-widest uppercase">
            Sustainable & Digital Packaging Solutions
          </p>
        </div>
      </div>

      {/* 2. Applications Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Applications</h2>
          <p className="text-gray-500 mt-2">Versatile printing for various industry needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {applications.map(app => (
            <div key={app.id} className="group relative overflow-hidden rounded-xl h-64 shadow-lg cursor-pointer">
              <img src={app.img} alt={app.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold border-l-4 border-blue-500 pl-3">{app.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Products List (Using Sublimation Assets) */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Packaging Printers</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {packagingProducts.map(product => (
              <Link 
                key={product.id} 
                // Note: Linking to product details. Ensure these IDs/Names exist in productsData.js if you want details page to work perfectly.
                // For now, it links to the sublimation detail pages based on name logic.
                to={`/products/${product.linkName}`}
                className="block group w-full"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-[500px] flex flex-col">
                  
                  {/* Image Section */}
                  <div className="h-[65%] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-8 relative">
                     {/* Glow Effect */}
                     <div className="absolute w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                     
                     <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="relative z-10 h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>

                  {/* Info Section */}
                  <div className="h-[35%] p-8 flex flex-col justify-center text-center border-t border-gray-100">
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">Industrial Series</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="text-gray-500 mb-6">{product.output}</p>
                    
                    <div className="flex items-center justify-center text-blue-600 font-semibold text-sm opacity-80 group-hover:opacity-100">
                      View Specifications <span className="ml-2">→</span>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PackagingPage;