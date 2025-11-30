// src/pages/admin/ManageUsers.jsx
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FaUserPlus, FaLock, FaEnvelope } from 'react-icons/fa';

// --- Secondary Firebase Config (Same as your original config) ---
// এটা দরকার যাতে নতুন ইউজার তৈরির সময় বর্তমান অ্যাডমিন লগআউট না হয়।
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // 1. Secondary App Initialize
      const secondaryApp = initializeApp(firebaseConfig, "Secondary");
      const secondaryAuth = getAuth(secondaryApp);

      // 2. Create User
      await createUserWithEmailAndPassword(secondaryAuth, email, password);

      // 3. Success
      setMessage({ type: 'success', text: `Successfully created admin: ${email}` });
      setEmail('');
      setPassword('');
      
      // Cleanup (Optional but good practice usually handled by garbage collection)
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: error.message });
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto pb-10">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-gray-500 mt-1">Create new administrators for the portal.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaUserPlus /> Create New Admin
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              This user will have full access to manage products and news.
            </p>
          </div>

          <div className="p-8">
            {message.text && (
              <div className={`px-4 py-3 rounded-lg mb-6 text-sm text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                    placeholder="newadmin@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition-all shadow-md disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Admin Account'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <strong>Note:</strong> Currently, Firebase Client SDK does not allow listing all users for security reasons. You can only create new ones here. To see the full list or delete users, please visit the Firebase Console.
        </div>

      </div>
    </AdminLayout>
  );
};

export default ManageUsers;