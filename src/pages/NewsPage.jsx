// src/pages/NewsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { newsItems } from '../data/newsData';

const NewsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header Banner */}
      <div className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Newsroom</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
          Latest updates, press releases, and insights from A & H Enterprise.
        </p>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Link 
              to={`/news/${item.id}`} 
              key={item.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="h-60 overflow-hidden relative">
                <div 
                   className="w-full h-full bg-cover transition-transform duration-700 hover:scale-110"
                   style={{ 
                     backgroundImage: `url(${item.imageUrl})`,
                     backgroundPosition: '50% 20%' // Consistent positioning
                   }}
                ></div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {item.summary}
                </p>
                <div className="text-blue-600 font-semibold text-sm flex items-center mt-auto">
                  Read More <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;