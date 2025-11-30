// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductPreview from '../components/ProductPreview';
import NewsSection from '../components/NewsSection'; 
import ContactForm from '../components/ContactForm';
import { db } from '../firebase'; 
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const HomePage = () => {
  const [homeProducts, setHomeProducts] = useState({
    Textile: [],
    Printer: [],
    Ink: []
  });

  // --- ডাটাবেস থেকে হোম পেজের প্রোডাক্ট আনা ---
  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        // Query: where showOnHome == true
        const q = query(collection(db, "products"), where("showOnHome", "==", true));
        const querySnapshot = await getDocs(q);
        
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // ক্যাটাগরি অনুযায়ী সাজানো
        setHomeProducts({
          Textile: products.filter(p => p.category === 'Textile').slice(0, 3),
          Printer: products.filter(p => p.category === 'Printer').slice(0, 3),
          Ink: products.filter(p => p.category === 'Ink').slice(0, 3),
        });
      } catch (error) {
        console.error("Error fetching home products:", error);
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <>
      <Hero />
      <div className="bg-gray-50">
        {/* যদি প্রোডাক্ট থাকে তবেই সেকশন দেখাবে */}
        {homeProducts.Textile.length > 0 && (
          <ProductPreview category="Textile" products={homeProducts.Textile} />
        )}
        {homeProducts.Printer.length > 0 && (
          <ProductPreview category="Printer" products={homeProducts.Printer} />
        )}
        {homeProducts.Ink.length > 0 && (
          <ProductPreview category="Ink" products={homeProducts.Ink} />
        )}
      </div>
      
      <NewsSection />
      <div className="py-20 bg-white">
         <div className="max-w-4xl mx-auto px-4">
            <ContactForm />
         </div>
      </div>
    </>
  );
};

export default HomePage;