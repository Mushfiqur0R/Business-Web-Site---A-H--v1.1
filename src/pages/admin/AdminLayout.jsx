// src/pages/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaBoxOpen, FaNewspaper, FaSignOutAlt, FaBars, FaTimes, FaUsersCog, FaInfoCircle, FaAddressCard } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome /> },
    { name: 'Manage Products', path: '/admin/products', icon: <FaBoxOpen /> },
    { name: 'Manage News', path: '/admin/news', icon: <FaNewspaper /> },
    { name: 'Manage Users', path: '/admin/users', icon: <FaUsersCog /> },
    { name: 'Manage About', path: '/admin/about', icon: <FaInfoCircle /> },
    { name: 'Manage Contact', path: '/admin/contact', icon: <FaAddressCard /> },
  ];

  return (
    // CSS Class: admin-wrapper (from index.css)
    <div className="admin-wrapper">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR --- */}
      {/* CSS Class: admin-sidebar & open (from index.css) */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between lg:justify-center">
           <img src="https://i.postimg.cc/SN9qDLwv/A-H-ENTERPRISE-nill.png" alt="Logo" className="h-8 lg:h-10" />
           
           {/* Close Button (Mobile Only) */}
           <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
             <FaTimes size={20} />
           </button>
        </div>
        
        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink 
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      {/* CSS Class: admin-content (from index.css) */}
      <div className="admin-content">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <FaBars size={20} />
            </button>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-700">Administrator</p>
              <p className="text-xs text-gray-500">{currentUser?.email}</p>
            </div>
            <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              A
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;