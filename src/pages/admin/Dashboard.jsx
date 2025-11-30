// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { db } from '../../firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { FaBox, FaNewspaper, FaUsers, FaArrowRight, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Link ইম্পোর্ট করা হয়েছে

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, news: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productColl = collection(db, "products");
        const newsColl = collection(db, "news");
        
        const productSnapshot = await getCountFromServer(productColl);
        const newsSnapshot = await getCountFromServer(newsColl);

        setStats({
          products: productSnapshot.data().count,
          news: newsSnapshot.data().count
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 font-medium">Welcome back, Admin! Here is your daily summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Product Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Total Products</p>
              <h3 className="text-5xl font-extrabold text-gray-800 mt-3 group-hover:text-blue-600 transition-colors">{stats.products}</h3>
            </div>
            <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <FaBox />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded">Live</span>
            <Link to="/admin/products" className="text-sm font-bold text-blue-600 flex items-center gap-2 group-hover:underline">
              Manage <FaArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* News Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Total News</p>
              <h3 className="text-5xl font-extrabold text-gray-800 mt-3 group-hover:text-emerald-600 transition-colors">{stats.news}</h3>
            </div>
            <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <FaNewspaper />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded">Active</span>
            <Link to="/admin/news" className="text-sm font-bold text-emerald-600 flex items-center gap-2 group-hover:underline">
              View News <FaArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Visitors Card (Static for now) */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-bold text-xs uppercase tracking-wider">Monthly Visits</p>
              <h3 className="text-5xl font-extrabold text-gray-800 mt-3 group-hover:text-purple-600 transition-colors">1.2k</h3>
            </div>
            <div className="h-14 w-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <FaUsers />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-blue-500 text-sm font-bold bg-blue-50 px-2 py-1 rounded">+12% Growth</span>
            <span className="text-sm font-bold text-purple-600 flex items-center gap-2 cursor-pointer">
              Analytics <FaArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* --- Quick Actions (Links Updated) --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Product Add Link */}
           <Link to="/admin/products/add" className="group flex items-center gap-4 p-5 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
             <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
               <FaPlus />
             </div>
             <div className="text-left">
               <h4 className="font-bold text-gray-800 group-hover:text-blue-700">Add New Product</h4>
               <p className="text-xs text-gray-500">Create a new product listing</p>
             </div>
           </Link>
           
           {/* News Add Link */}
           <Link to="/admin/news/add" className="group flex items-center gap-4 p-5 border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer">
             <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
               <FaPlus />
             </div>
             <div className="text-left">
               <h4 className="font-bold text-gray-800 group-hover:text-emerald-700">Post News Update</h4>
               <p className="text-xs text-gray-500">Share latest events or news</p>
             </div>
           </Link>
        </div>
      </div>

    </AdminLayout>
  );
};

export default Dashboard;