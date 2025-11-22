// src/pages/ProductDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '../data/productsData';

// আইকন কম্পোনেন্ট (ছোট করার জন্য এখানে রাখা হলো)
const icons = {
  printing: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  color: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486H7v-4.485l4-4z"></path></svg>,
  motor: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
  system: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  
  // URL থেকে প্রোডাক্ট খুঁজে বের করা
  const product = allProducts.find(
    p => p.name.toLowerCase().replace(/\s+/g, '-') === productId
  );

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <Link to="/textile" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Back to Products</Link>
      </div>
    );
  }

  // ডিফল্ট ডাটা (যদি ডাটা ফাইলে features/specs না থাকে)
  const features = product.features || [
    { title: "24/7 Printing", desc: product.output },
    { title: "Vivid Color", desc: "High precision color matching" },
    { title: "Industrial Build", desc: "Designed for heavy production" },
    { title: "Smart System", desc: "Advanced operational software" },
  ];

  const specs = product.specifications || {};

  return (
    <div className="bg-white">
      
      {/* ------------------------------------------------
         1. PRODUCT BANNER (FIXED: Dark & Mobile Zoom)
      ------------------------------------------------ */}
      <div className="relative pt-20 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#252525] text-white overflow-hidden">
        
        {/* Background Texture/Effect */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            
            {/* Title Section */}
            <p className="text-blue-400 font-bold tracking-widest uppercase mb-2 animate-fade-in-down">
              {product.category} Series
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in-up">
              {product.name}
            </h1>

            {/* Image Section (Fixed Object-Contain) */}
            <div className="relative w-full h-[40vh] md:h-[500px] flex items-center justify-center my-8">
              {/* Glow Behind */}
              <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
              
              {/* Product Image */}
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                // object-contain: ensures full image visibility without crop
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="mt-8">
               <Link to="/contact" className="px-8 py-3 border border-white rounded-full text-white font-semibold hover:bg-white hover:text-black transition-all duration-300">
                 Request a Quote
               </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------
         2. FEATURES GRID (Atexco Style)
      ------------------------------------------------ */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Key Features</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Designed for industrial reliability, speed, and precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 group">
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {/* Rotating icons based on index */}
                  {idx === 0 ? icons.printing : idx === 1 ? icons.color : idx === 2 ? icons.motor : icons.system}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------
         3. SPECIFICATION TABLE (Detailed & Professional)
      ------------------------------------------------ */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name} Specifications</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
          </div>

          {Object.keys(specs).length > 0 ? (
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider w-1/3">
                      Parameter
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Model */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">Model</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{specs.model || product.name}</td>
                  </tr>
                  {/* Print Heads */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">Print Heads</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{specs.printHead || "N/A"}</td>
                  </tr>
                  {/* Width */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">Max Printing Width</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{specs.width || "N/A"}</td>
                  </tr>
                  {/* Speed (Complex Row) */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600 align-top pt-6">Printing Speed</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {specs.speed ? (
                        <div className="space-y-1">
                          <p><span className="font-semibold text-gray-500">Mode 1:</span> {specs.speed.pass1}</p>
                          <p><span className="font-semibold text-gray-500">Mode 2:</span> {specs.speed.pass2}</p>
                          <p><span className="font-semibold text-gray-500">Mode 3:</span> {specs.speed.pass3}</p>
                        </div>
                      ) : "N/A"}
                    </td>
                  </tr>
                  {/* Ink */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">Ink Configuration</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <p>Type: {specs.inkType || "N/A"}</p>
                      <p>Colors: {specs.colors || "N/A"}</p>
                    </td>
                  </tr>
                  {/* Software */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">RIP Software</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{specs.software || "N/A"}</td>
                  </tr>
                   {/* Dimensions */}
                   <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">Dimensions & Weight</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                       <p>Size: {specs.dimensions || "N/A"}</p>
                       <p>Weight: {specs.weight || "N/A"}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded border border-dashed border-gray-300">
              <p className="text-gray-500">Detailed specifications are coming soon.</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetailPage;