// src/pages/admin/ManageUsers.jsx
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FaUserPlus, FaLock, FaEnvelope, FaKey } from 'react-icons/fa';

// --- Secondary Firebase Config ---
// (আপনার src/firebase.js ফাইলের কনফিগটি এখানে হুবহু পেস্ট করুন)
const firebaseConfig = {
  apiKey: "AIzaSyAnYOH9cJW2KILv0fsTGHwiCQO8cRX-zWM",
  authDomain: "ah-enterprise-web.firebaseapp.com",
  projectId: "ah-enterprise-web",
  storageBucket: "ah-enterprise-web.firebasestorage.app",
  messagingSenderId: "236633749916",
  appId: "1:236633749916:web:5d27be652a305737bcf059",
  measurementId: "G-2E569MD1RY"
};


const ManageUsers = () => {
  // State for Create User
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for Password Reset
  const [resetEmail, setResetEmail] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // --- ১. নতুন অ্যাডমিন তৈরি ---
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const secondaryApp = initializeApp(firebaseConfig, "Secondary");
      const secondaryAuth = getAuth(secondaryApp);
      await createUserWithEmailAndPassword(secondaryAuth, email, password);

      setMessage({ type: 'success', text: `Successfully created admin: ${email}` });
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: error.message });
    }
    setLoading(false);
  };

  // --- ২. পাসওয়ার্ড রিসেট ইমেইল পাঠানো ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // এখানে মেইন Auth ব্যবহার করব কারণ এটি বর্তমান সেশনে ইফেক্ট ফেলবে না
      const secondaryApp = initializeApp(firebaseConfig, "SecondaryReset"); // Just to be safe
      const secondaryAuth = getAuth(secondaryApp);
      
      await sendPasswordResetEmail(secondaryAuth, resetEmail);
      setMessage({ type: 'success', text: `Password reset email sent to: ${resetEmail}` });
      setResetEmail('');
    } catch (error) {
      setMessage({ type: 'error', text: "Error sending reset email. Check if email exists." });
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto pb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Message Box */}
        {message.text && (
          <div className={`md:col-span-2 px-4 py-3 rounded-lg text-sm text-center font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* --- CARD 1: CREATE ADMIN --- */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-fit">
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-5 text-white">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FaUserPlus /> Create New Admin
            </h2>
            <p className="text-blue-200 text-xs mt-1">Add a new user to manage the portal.</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">Email Address</label>
                <div className="relative mt-1">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="newadmin@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">Password</label>
                <div className="relative mt-1">
                  <FaLock className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Min 6 chars"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md disabled:bg-gray-400">
                {loading ? 'Processing...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>

        {/* --- CARD 2: RESET PASSWORD --- */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-fit">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-5 text-white">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FaKey /> Reset Password
            </h2>
            <p className="text-gray-300 text-xs mt-1">Send a password reset link to an existing admin.</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">Admin Email</label>
                <div className="relative mt-1">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="email" 
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:border-gray-500 focus:outline-none"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gray-700 text-white font-bold py-2.5 rounded-lg hover:bg-gray-800 transition-all shadow-md disabled:bg-gray-400">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>

        {/* Info Box */}
        <div className="md:col-span-2 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                For security reasons, viewing the list of all admins or deleting an admin account is only possible via the 
                <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="font-bold underline ml-1">Firebase Console</a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default ManageUsers;