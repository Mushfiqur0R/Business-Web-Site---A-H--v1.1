// src/pages/PackagingPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Application Cards Data (Static - Design Element)
const applications = [
  { id: 1, title: "Food Packaging", img: "https://i.postimg.cc/BQLBLC4T/vietnam-paper-packaging-780-removebg-preview.png" },
  { id: 2, title: "Folding Cartons", img: "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, title: "Paper Cups", img: "https://images.pexels.com/photos/5947019/pexels-photo-5947019.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const PackagingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ডাটাবেস থেকে Packaging প্রোডাক্ট আনা ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // কুয়েরি: ক্যাটাগরি হতে হবে 'Packaging'
        const q = query(collection(db, "products"), where("category", "==", "Packaging"));
        const querySnapshot = await getDocs(q);
        
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching packaging products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

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

      {/* 3. Products List (Dynamic) */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Packaging Printers</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto mt-4"></div>
          </div>

          {loading ? (
            <div className="text-center text-xl text-gray-500">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-xl text-gray-500">No packaging products found. Add from Admin Panel.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {products.map(product => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`}
                  className="block group w-full"
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-[500px] flex flex-col">
                    
                    {/* Image Section */}
                    <div className="h-[65%] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-8 relative">
                       <div className="absolute w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                       <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="relative z-10 h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>

                    {/* Info Section */}
                    <div className="h-[35%] p-8 flex flex-col justify-center text-center border-t border-gray-100">
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">{product.subCategory || 'Industrial Series'}</p>
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
          )}
        </div>
      </section>

    </div>
  );
};

export default PackagingPage;