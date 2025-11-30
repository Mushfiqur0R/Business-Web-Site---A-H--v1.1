// src/pages/InkPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const InkPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "products"), where("category", "==", "Ink"));
        const querySnapshot = await getDocs(q);
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching inks:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[50vh] bg-black flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-80"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4">INKS & CONSUMABLES</h1>
          <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
          <p className="text-xl font-light tracking-widest uppercase">High Quality Inks for Vibrant Colors</p>
        </div>
      </div>

      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20 text-xl text-gray-500">Loading inks...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-xl text-gray-500">No ink products found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-[450px] flex flex-col">
                  <div className="h-[70%] bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
                     <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                     <img src={product.imageUrl} alt={product.name} className="relative z-10 h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="h-[30%] p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.output}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InkPage;