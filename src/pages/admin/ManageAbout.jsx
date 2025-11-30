// src/pages/admin/ManageAbout.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const ManageAbout = () => {
  const [data, setData] = useState({
    title: 'About Us',
    subtitle: 'Leading the revolution in digital printing technology',
    storyTitle: 'Empowering the Textile Industry Since 2010',
    storyContent: '',
    stats: { experience: '12', machines: '500', satisfaction: '100' },
    gallery: [] // Array of image URLs
  });
  
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const docSnap = await getDoc(doc(db, "settings", "about"));
      if (docSnap.exists()) setData(docSnap.data());
    };
    fetch();
  }, []);

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  
  const handleStatChange = (e) => setData({ 
    ...data, 
    stats: { ...data.stats, [e.target.name]: e.target.value } 
  });

  const addImage = () => {
    if (newImage) {
      setData({ ...data, gallery: [...data.gallery, newImage] });
      setNewImage('');
    }
  };

  const removeImage = (index) => {
    const updated = data.gallery.filter((_, i) => i !== index);
    setData({ ...data, gallery: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await setDoc(doc(db, "settings", "about"), data);
    alert("About Us page updated!");
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto pb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage About Page</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Text Content */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Text Content</h2>
            <div className="grid gap-4">
              <div>
                <label className="label-style">Main Title</label>
                <input type="text" name="title" value={data.title} onChange={handleChange} className="input-style" />
              </div>
              <div>
                <label className="label-style">Subtitle</label>
                <input type="text" name="subtitle" value={data.subtitle} onChange={handleChange} className="input-style" />
              </div>
              <div>
                <label className="label-style">Story Title</label>
                <input type="text" name="storyTitle" value={data.storyTitle} onChange={handleChange} className="input-style" />
              </div>
              <div>
                <label className="label-style">Story Content</label>
                <textarea name="storyContent" rows="6" value={data.storyContent} onChange={handleChange} className="input-style"></textarea>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Statistics Numbers</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label-style">Experience (Years)</label>
                <input type="text" name="experience" value={data.stats.experience} onChange={handleStatChange} className="input-style" />
              </div>
              <div>
                <label className="label-style">Machines Installed</label>
                <input type="text" name="machines" value={data.stats.machines} onChange={handleStatChange} className="input-style" />
              </div>
              <div>
                <label className="label-style">Satisfaction (%)</label>
                <input type="text" name="satisfaction" value={data.stats.satisfaction} onChange={handleStatChange} className="input-style" />
              </div>
            </div>
          </div>

          {/* Gallery Manager */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Photo Gallery</h2>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={newImage} 
                onChange={(e) => setNewImage(e.target.value)} 
                placeholder="Image URL..." 
                className="input-style flex-1" 
              />
              <button type="button" onClick={addImage} className="bg-green-600 text-white px-4 rounded-lg"><FaPlus/> Add</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.gallery && data.gallery.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img src={img} alt="Gallery" className="h-32 w-full object-cover rounded-lg" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(idx)} 
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700">
            <FaSave className="inline mr-2" /> Save Changes
          </button>
        </form>
      </div>
      <style>{`.label-style { display: block; font-weight: 600; margin-bottom: 5px; } .input-style { width: 100%; padding: 10px; border: 1px solid #ddd; rounded: 8px; }`}</style>
    </AdminLayout>
  );
};

export default ManageAbout;