// src/pages/admin/ManageNews.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const ManageNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // ডাটাবেস থেকে নিউজ আনা
  const fetchNews = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNewsList(list);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // নিউজ ডিলিট করা
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        await deleteDoc(doc(db, "news", id));
        setNewsList(newsList.filter(item => item.id !== id));
        alert("News deleted successfully!");
      } catch (error) {
        console.error("Error deleting news:", error);
        alert("Failed to delete news.");
      }
    }
  };

  // সার্চ ফিল্টার
  const filteredNews = newsList.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage News & Events</h1>
          <p className="text-gray-500 text-sm mt-1">Total {newsList.length} articles found</p>
        </div>
        
        <Link 
          to="/admin/news/add" 
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg"
        >
          <FaPlus /> Add New Article
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center gap-3">
        <FaSearch className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search news by title..." 
          className="flex-1 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-10">Loading news...</td></tr>
              ) : filteredNews.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-10 text-gray-500">No news found.</td></tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="h-12 w-20 object-cover rounded border border-gray-200" 
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{item.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <Link 
                          to={`/admin/news/edit/${item.id}`}
                          className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageNews;