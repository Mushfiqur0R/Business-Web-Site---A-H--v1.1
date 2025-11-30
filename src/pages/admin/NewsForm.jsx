// src/pages/admin/NewsForm.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { db } from '../../firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaNewspaper, FaPlus, FaTrash } from 'react-icons/fa';

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    summary: '',
    imageUrl: '',
    // নতুন: একাধিক সেকশন রাখার অ্যারে
    sections: [] 
  });
  const [loading, setLoading] = useState(false);

  // ডাটা লোড (Edit Mode)
  useEffect(() => {
    if (isEditMode) {
      const fetchData = async () => {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // যদি পুরানো ডাটাতে sections না থাকে, তবে খালি অ্যারে সেট করবে
          setFormData({ ...data, sections: data.sections || [] });
        } else {
          navigate('/admin/news');
        }
      };
      fetchData();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SECTIONS HANDLERS ---
  
  // নতুন সেকশন যোগ করা
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { subTitle: '', image: '', content: '', date: '' }]
    });
  };

  // সেকশন রিমুভ করা
  const removeSection = (index) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: updatedSections });
  };

  // সেকশনের ইনপুট চেঞ্জ হ্যান্ডেল করা
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index][field] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await updateDoc(doc(db, "news", id), formData);
        alert("News updated successfully!");
      } else {
        await addDoc(collection(db, "news"), formData);
        alert("News added successfully!");
      }
      navigate('/admin/news');
    } catch (error) {
      console.error(error);
      alert("Error saving news.");
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto pb-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {isEditMode ? 'Edit Article' : 'Post New Article'}
          </h1>
          <button onClick={() => navigate('/admin/news')} className="text-gray-500 hover:text-gray-800 flex items-center gap-2 font-medium">
            <FaArrowLeft /> Back to List
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Main Article Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
              <FaNewspaper className="text-emerald-600" /> Main Article Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="label-style">Main Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="input-style" />
              </div>
              <div>
                <label className="label-style">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="input-style bg-white">
                  <option value="">Select Category</option>
                  <option value="Conference">Conference</option>
                  <option value="Awards">Awards</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Workshop">Workshop</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="label-style">Main Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="input-style" />
              </div>
              <div className="md:col-span-2">
                <label className="label-style">Main Image URL</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="input-style" />
                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="h-40 mt-3 rounded-lg border object-cover" />}
              </div>
              <div className="md:col-span-2">
                <label className="label-style">Main Summary</label>
                <textarea name="summary" rows="4" value={formData.summary} onChange={handleChange} required className="input-style"></textarea>
              </div>
            </div>
          </div>

          {/* --- DYNAMIC SECTIONS --- */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold text-gray-700">Additional Content Sections</h3>
               <button 
                 type="button" 
                 onClick={addSection}
                 className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
               >
                 <FaPlus /> Add Section
               </button>
            </div>

            {formData.sections.map((section, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-6 rounded-xl relative">
                <button 
                  type="button" 
                  onClick={() => removeSection(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-2 bg-white rounded-full shadow-sm"
                  title="Remove Section"
                >
                  <FaTrash />
                </button>
                
                <h4 className="font-bold text-gray-600 mb-4">Section {index + 1}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="label-style">Section Title</label>
                    <input 
                      type="text" 
                      value={section.subTitle} 
                      onChange={(e) => handleSectionChange(index, 'subTitle', e.target.value)} 
                      className="input-style" 
                      placeholder="Sub-section title"
                    />
                  </div>
                  <div>
                    <label className="label-style">Date (Optional)</label>
                    <input 
                      type="date" 
                      value={section.date} 
                      onChange={(e) => handleSectionChange(index, 'date', e.target.value)} 
                      className="input-style" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label-style">Image URL</label>
                    <input 
                      type="text" 
                      value={section.image} 
                      onChange={(e) => handleSectionChange(index, 'image', e.target.value)} 
                      className="input-style" 
                      placeholder="https://..."
                    />
                    {section.image && <img src={section.image} alt="Sec" className="h-24 mt-2 rounded border" />}
                  </div>
                  <div className="md:col-span-2">
                    <label className="label-style">Content / Description</label>
                    <textarea 
                      rows="3" 
                      value={section.content} 
                      onChange={(e) => handleSectionChange(index, 'content', e.target.value)} 
                      className="input-style"
                      placeholder="Details about this section..."
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 pb-10">
            <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex justify-center items-center gap-2 text-lg">
              <FaSave /> {loading ? 'Publishing...' : 'Publish Full Article'}
            </button>
          </div>

        </form>
      </div>

      <style>{`
        .label-style { display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem; }
        .input-style { width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; outline: none; transition: all; }
        .input-style:focus { border-color: #10b981; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }
      `}</style>
    </AdminLayout>
  );
};

export default NewsForm;