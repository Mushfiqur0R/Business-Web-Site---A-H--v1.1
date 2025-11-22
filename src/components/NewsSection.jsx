// src/components/NewsSection.jsx
import { newsItems } from '../data/newsData';
import { Link } from 'react-router-dom';

const NewsSection = () => {
  return (
    <section className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Latest Updates</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6">News & Events</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Stay updated with the latest happenings, summits, and technological breakthroughs from A & H Enterprise.
          </p>
        </div>

        {/* Beautiful Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[400px]">
          
          {newsItems.map((item, index) => (
            <Link 
              to={`/news/${item.id}`} 
              key={item.id} 
              // প্রথম আইটেমটিকে একটু বড় (2 কলাম) করেছি ভ্যারিয়েশন আনার জন্য (Optional design choice)
              // আপনি চাইলে এটা বাদ দিয়ে সব সমান রাখতে পারেন। আমি সৌন্দর্য্যের জন্য বড় রেখেছি।
              className={`group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              {/* Background Image with Zoom Effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              ></div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Content Content - Sliding Up Effect */}
              <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                
                {/* Date & Category Badge */}
                <div className="flex items-center gap-3 mb-3">
                   <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                     {item.category}
                   </span>
                   <span className="text-gray-300 text-sm font-medium border-l border-gray-500 pl-3">
                     {item.date}
                   </span>
                </div>

                {/* Title */}
                <h3 className={`font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                  {item.title}
                </h3>

                {/* Summary (Only visible on hover for smaller cards, always for big card) */}
                <p className={`text-gray-300 text-sm line-clamp-2 transition-all duration-500 ${index === 0 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 group-hover:mt-2'}`}>
                  {item.summary}
                </p>

                {/* Read More Arrow */}
                <div className="mt-4 flex items-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Read Full Story <span className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}

        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
           <Link to="/news" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-900 hover:text-white hover:border-transparent transition-all duration-300">
             View All News
           </Link>
        </div>

      </div>
    </section>
  );
};

export default NewsSection;