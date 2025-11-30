// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaArrowLeft } from 'react-icons/fa';

// আইকন কম্পোনেন্ট
const icons = {
  printing: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  color: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486H7v-4.485l4-4z"></path></svg>,
  motor: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
  system: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-semibold text-gray-500 animate-pulse">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  const features = product.features && product.features.length > 0 ? product.features : [
    { title: "High Performance", desc: product.output || "Industrial Standard Output" },
    { title: "Vivid Color", desc: "High precision color matching technology" },
    { title: "Robust Build", desc: "Designed for 24/7 industrial operation" },
    { title: "Smart System", desc: "Advanced RIP software integration" },
  ];

  const specs = product.specifications || {};

  return (
    <div className="bg-white min-h-screen">
      
      {/* ------------------------------------------------
         1. PRODUCT BANNER
      ------------------------------------------------ */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#252525] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-4 md:left-10 z-20">
           <button 
             onClick={() => navigate(-1)}
             className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium"
           >
             <FaArrowLeft /> Back
           </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <p className="text-blue-400 font-bold tracking-widest uppercase mb-3 text-sm md:text-base animate-fade-in-down">
              {product.category} Series
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
              {product.name}
            </h1>
            
            <div className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center my-6">
              <div className="absolute w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] animate-pulse-slow"></div>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="mt-10">
               <Link to="/contact" className="px-10 py-4 border border-white rounded-full text-white font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300">
                 Request a Quote
               </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------
         2. FEATURES GRID
      ------------------------------------------------ */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Key Features</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Designed for industrial reliability, speed, and precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group transform hover:-translate-y-1">
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {idx % 4 === 0 ? icons.printing : idx % 4 === 1 ? icons.color : idx % 4 === 2 ? icons.motor : icons.system}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------
         3. SPECIFICATION TABLE
      ------------------------------------------------ */}
      <div className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-gray-500">Detailed parameters for {product.name}</p>
          </div>

          {Object.keys(specs).length > 0 ? (
            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider w-1/3 border-r border-gray-200">
                      Parameter
                    </th>
                    <th scope="col" className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(specs).map(([key, value], idx) => {
                    // Skip empty values
                    if (!value || (typeof value === 'object' && Object.values(value).every(v => !v))) return null;
                    
                    return (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-600 capitalize border-r border-gray-200">
                          {key.replace(/([A-Z])/g, ' $1').trim()} 
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {typeof value === 'object' ? (
                            <div className="space-y-1">
                              {Object.entries(value).map(([subKey, subVal]) => 
                                subVal ? (
                                  <p key={subKey}><span className="font-medium text-gray-500 capitalize">{subKey}:</span> {subVal}</p>
                                ) : null
                              )}
                            </div>
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">Full technical specifications will be updated soon.</p>
              <p className="text-sm text-gray-400 mt-2">Contact us for the datasheet.</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetailPage;