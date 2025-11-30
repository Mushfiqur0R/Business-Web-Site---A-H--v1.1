// src/pages/NewsDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const docRef = doc(db, "news", newsId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNewsItem({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };
    fetchNews();
  }, [newsId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p className="text-xl animate-pulse">Loading Article...</p>
    </div>
  );

  if (!newsItem) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h2>
      <p className="text-gray-500 mb-8">The article you are looking for does not exist or has been removed.</p>
      <Link to="/news" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Back to Newsroom
      </Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      
      {/* ------------------------------------------------
         1. HERO HEADER SECTION (Added to fix Navbar issue)
      ------------------------------------------------ */}
      <div className="relative h-[50vh] bg-gray-900 flex items-center justify-center text-white overflow-hidden">
        {/* Background Image of the News (Blured) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm scale-110"
          style={{ backgroundImage: `url(${newsItem.imageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div> {/* Dark Overlay */}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
            {newsItem.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {newsItem.title}
          </h1>
          <p className="text-gray-300 text-sm font-medium">
            Published on {newsItem.date}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------
         2. MAIN CONTENT
      ------------------------------------------------ */}
      <div className="max-w-4xl mx-auto px-4 py-16 -mt-20 relative z-20">
        
        {/* Main Image Card */}
        <div className="bg-white p-2 rounded-2xl shadow-xl mb-12">
           <img 
             src={newsItem.imageUrl} 
             alt={newsItem.title} 
             className="w-full h-auto rounded-xl object-cover" 
           />
        </div>

        {/* Content Body */}
        <div className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="font-medium text-xl text-gray-900 border-l-4 border-blue-600 pl-4">
            {newsItem.summary}
          </p>
        </div>

        {/* --- DYNAMIC SECTIONS RENDER --- */}
        {newsItem.sections && newsItem.sections.length > 0 && (
          <div className="space-y-16 border-t border-gray-200 pt-12 mt-12">
            {newsItem.sections.map((section, index) => (
              <div key={index} className="grid grid-cols-1 gap-8">
                
                {/* Section Content */}
                <div>
                   <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                        {section.date || 'Update'}
                      </span>
                   </div>
                   <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.subTitle}</h3>
                   
                   {/* Section Image (If exists) */}
                   {section.image && (
                     <img 
                       src={section.image} 
                       alt={section.subTitle} 
                       className="w-full md:w-3/4 h-auto rounded-xl shadow-md mb-6 object-cover" 
                     />
                   )}

                   <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                     {section.content}
                   </p>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link to="/news" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition-colors">
            ← Back to Newsroom
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NewsDetailPage;