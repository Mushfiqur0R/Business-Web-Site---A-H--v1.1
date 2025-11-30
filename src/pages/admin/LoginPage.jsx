// src/pages/admin/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/admin/dashboard'); 
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    // 1. OUTER BOX: Metallic Black Gradient Background
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black relative overflow-hidden px-4">
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-80 bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-black-metallic-paint-with-fine-round-mesh-image_528813.jpg')] bg-cover bg-center"></div>

      {/* 2. INNER BOX: Glassmorphism Card (Updated) */}
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 z-10 p-8 sm:p-10 relative">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <img 
            className="h-14 w-auto mx-auto mb-4 drop-shadow-md" 
            src="https://i.postimg.cc/SN9qDLwv/A-H-ENTERPRISE-nill.png" 
            alt="Admin Logo" 
          />
          <h2 className="text-3xl font-extrabold text-white tracking-wide">Admin Portal</h2>
          <p className="text-gray-300 text-sm mt-2 font-medium">Secure access for management</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border-l-4 border-red-500 text-white px-4 py-3 rounded mb-6 text-sm text-center shadow-sm backdrop-blur-sm">
            {error}
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaUser className="text-gray-500" />
            </div>
            <input 
              type="email" 
              className="w-full pl-11 pr-4 py-3.5 bg-white/90 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 transition-all shadow-inner"
              placeholder="admin@aandhenterprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaLock className="text-gray-500" />
            </div>
            <input 
              type="password" 
              className="w-full pl-11 pr-4 py-3.5 bg-white/90 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 transition-all shadow-inner"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button (Fixed Visibility) */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3.5 rounded-xl hover:from-blue-500 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-blue-900/50 disabled:opacity-70 disabled:cursor-not-allowed mt-2 border border-blue-400/30"
          >
            {loading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} A & H Enterprise. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;