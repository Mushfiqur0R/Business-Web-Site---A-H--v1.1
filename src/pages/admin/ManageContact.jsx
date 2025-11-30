// src/pages/admin/ManageContact.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FaSave, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ManageContact = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone1: '',
    phone2: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  // ডাটা লোড করা
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "settings", "contact");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "settings", "contact"), formData);
      alert("Contact info updated globally!");
    } catch (error) {
      console.error(error);
      alert("Error updating settings");
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Contact Info</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2"><FaEnvelope/> Official Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="service@..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2"><FaPhone/> Phone 1</label>
                <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="+880..." />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2"><FaPhone/> Phone 2</label>
                <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="+880..." />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2"><FaMapMarkerAlt/> Office Address</label>
              <textarea name="address" rows="3" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Enter address..."></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all">
              {loading ? 'Updating...' : 'Update Global Contact Info'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageContact;