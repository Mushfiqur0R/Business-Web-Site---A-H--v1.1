// src/pages/PrinterPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
// আপনি চাইলে প্রিন্টারের জন্য আলাদা ভিডিও/ইমেজ রাখতে পারেন
import heroVideo from '../assets/videos/hero-background.mp4'; 

const PrinterPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // ক্যাটাগরি 'Printer' এর ডাটা আনছি
        const q = query(collection(db, "products"), where("category", "==", "Printer"));
        const querySnapshot = await getDocs(q);
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching printers:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    const subCat = product.subCategory || 'Other Series';
    if (!acc[subCat]) acc[subCat] = [];
    acc[subCat].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen">
      
      {/* Banner */}
      <div className="relative h-[50vh] bg-gray-900 flex items-center justify-center text-white overflow-hidden">
        <video autoPlay loop muted playsInline src={heroVideo} className="absolute inset-0 w-full h-full object-cover opacity-30"></video>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4">PRINTERS</h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl font-light tracking-widest uppercase">
            Advanced Commercial & Decor Printing Solutions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
        {loading ? (
          <div className="text-center py-20 text-xl text-gray-500">Loading printers...</div>
        ) : Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-20 text-xl text-gray-500">No printer products found.</div>
        ) : (
          Object.entries(groupedProducts).map(([seriesName, productList], index) => (
            <div key={index}>
              <div className="mb-10 text-center md:text-left border-b border-gray-200 pb-4">
                <h2 className="text-4xl font-bold text-gray-800 uppercase">{seriesName}</h2>
              </div>
              <div className="atexco-product-grid">
                {productList.map((product) => (
                  <Link to={`/products/${product.id}`} key={product.id} className="block group/card w-full">
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-[500px] flex flex-col">
                      <div className="h-[65%] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-8 relative">
                         <img src={product.imageUrl} alt={product.name} className="relative z-10 h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="h-[35%] p-8 flex flex-col justify-center text-center border-t border-gray-100">
                        <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                        <p className="text-gray-500 mb-4">{product.output}</p>
                        <div className="text-blue-600 font-semibold text-sm">View Details →</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PrinterPage;