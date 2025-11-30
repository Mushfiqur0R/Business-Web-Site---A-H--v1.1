// src/pages/admin/ManageProducts.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // ১. ডাটাবেস থেকে প্রোডাক্ট আনা
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ২. প্রোডাক্ট ডিলিট করা
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        // UI থেকে সরিয়ে ফেলা
        setProducts(products.filter(product => product.id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  // ৩. সার্চ ফিল্টার
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
          <p className="text-gray-500 text-sm mt-1">Total {products.length} products found</p>
        </div>
        
        <Link 
          to="/admin/products/add" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg"
        >
          <FaPlus /> Add New Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center gap-3">
        <FaSearch className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search products by name..." 
          className="flex-1 outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Sub-Category</th>
                <th className="px-6 py-4">Output / Desc</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-10">Loading products...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-10 text-gray-500">No products found.</td></tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="h-12 w-12 object-contain rounded border border-gray-200 bg-white" 
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-600">
                        {product.category}
                      </span>
                    </td>
                    {/* Sub-Category Badge (NEW) */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-50 text-purple-600 border border-purple-100">
                        {product.subCategory || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{product.output}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <Link 
                          to={`/admin/products/edit/${product.id}`}
                          className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
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

export default ManageProducts;