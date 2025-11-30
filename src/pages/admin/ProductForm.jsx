// src/pages/admin/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { db } from '../../firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaCogs, FaListUl, FaInfoCircle, FaHome } from 'react-icons/fa';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const categoryData = [
    { name: 'Textile', subCategories: ['Sublimation', 'Model', 'Eco', 'Single-pass', 'Reactive', 'Pigment', 'General'] },
    { name: 'Printer', subCategories: ['WebMaster', 'VegaPress', 'Deco', 'Commercial', 'General'] },
    { name: 'Packaging', subCategories: ['BoxMaster', 'LabelPress', 'Corrugated', 'Flexible', 'General'] },
    { name: 'Ink', subCategories: ['Pigment Ink', 'Reactive Ink', 'Dye Ink', 'Sublimation Ink', 'General'] }
  ];

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    output: '',
    imageUrl: '',
    showOnHome: false,
    
    features: [
      { title: '24/7 Printing', desc: '' },
      { title: 'Vivid Color', desc: '' },
      { title: 'Linear Motor', desc: '' },
      { title: 'Degassing System', desc: '' },
    ],

    // Updated Specifications Structure based on Image
    specifications: {
      model: '',
      printHead: '',
      printWidth: '',
      // Speed
      speedProd: '',
      speedRes: '',
      speedHigh: '',
      // Ink
      inkSort: '',
      inkCapacity: '',
      // Media
      mediaWidth: '',
      mediaThickness: '',
      mediaWeight: '',
      mediaSort: '',
      // System
      mediaHeater: '',
      takeUpDevice: '',
      dryingSystem: '',
      guideRail: '',
      interface: '',
      ripSoftware: '',
      power: '',
      environment: '',
      // Physical
      dimPrinter: '',
      dimPacking: '',
      weightNet: '',
      weightGross: '',
      
      // -- Ink Specific Fields --
      inkColors: '',
      inkPackage: '',
      inkLife: '',
      inkHeadComp: '',
      inkFabric: ''
    }
  });

  const [subCatOptions, setSubCatOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initData = async () => {
      if (isEditMode) {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData(prev => ({
            ...prev,
            ...data,
            specifications: { ...prev.specifications, ...(data.specifications || {}) }
          }));
          const selectedCat = categoryData.find(c => c.name === data.category);
          if (selectedCat) setSubCatOptions(selectedCat.subCategories);
        } else {
          navigate('/admin/products');
        }
      }
    };
    initData();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCategoryChange = (e) => {
    const selectedMainCat = e.target.value;
    setFormData({ ...formData, category: selectedMainCat, subCategory: '' });
    const selectedCatData = categoryData.find(c => c.name === selectedMainCat);
    setSubCatOptions(selectedCatData ? selectedCatData.subCategories : []);
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][field] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      specifications: { ...prev.specifications, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.category || !formData.subCategory) {
      alert("Please select Category and Sub-Category");
      setLoading(false); return;
    }
    try {
      if (isEditMode) {
        await updateDoc(doc(db, "products", id), formData);
        alert("Product updated!");
      } else {
        await addDoc(collection(db, "products"), formData);
        alert("Product added!");
      }
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert("Error saving product.");
    }
    setLoading(false);
  };

  const isInkCategory = formData.category === 'Ink';

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto pb-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
          <button onClick={() => navigate('/admin/products')} className="text-gray-500 hover:text-gray-800 flex items-center gap-2 font-medium"><FaArrowLeft /> Back</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2"><FaInfoCircle className="text-blue-600" /> Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 bg-blue-50 p-3 rounded-lg flex items-center gap-3">
                <input type="checkbox" name="showOnHome" checked={formData.showOnHome} onChange={handleChange} className="w-5 h-5" />
                <label className="font-bold text-gray-700">Show on Home Page</label>
              </div>
              <div>
                <label className="label-style">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-style" />
              </div>
              <div>
                <label className="label-style">Short Output/Desc</label>
                <input type="text" name="output" value={formData.output} onChange={handleChange} className="input-style" />
              </div>
              <div>
                <label className="label-style">Main Category</label>
                <select name="category" value={formData.category} onChange={handleCategoryChange} required className="input-style bg-white">
                  <option value="">Select Category</option>
                  {categoryData.map((cat, idx) => <option key={idx} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label-style">Sub-Category</label>
                <select name="subCategory" value={formData.subCategory} onChange={handleChange} required disabled={!formData.category} className="input-style bg-white">
                  <option value="">Select Sub-Category</option>
                  {subCatOptions.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="label-style">Image URL</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="input-style" />
                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="h-24 mt-2 rounded border p-1" />}
              </div>
            </div>
          </div>

          {/* 2. Key Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2"><FaListUl className="text-purple-600" /> Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.features.map((feature, index) => (
                <div key={index} className="p-3 border rounded bg-gray-50">
                  <p className="text-xs font-bold text-gray-500 mb-1">Feature {index + 1}</p>
                  <input type="text" value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} className="input-style mb-2 text-sm" placeholder="Title" />
                  <input type="text" value={feature.desc} onChange={(e) => handleFeatureChange(index, 'desc', e.target.value)} className="input-style text-sm" placeholder="Description" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Technical Specifications (Dynamic based on Category) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2"><FaCogs className="text-green-600" /> Technical Specifications</h2>
            
            {isInkCategory ? (
              // --- INK SPECS ---
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="label-style">Ink Type</label><input type="text" name="inkType" value={formData.specifications.inkType} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Colors</label><input type="text" name="inkColors" value={formData.specifications.inkColors} onChange={handleSpecChange} className="input-style" placeholder="C, M, Y, K..." /></div>
                <div><label className="label-style">Package Size</label><input type="text" name="inkPackage" value={formData.specifications.inkPackage} onChange={handleSpecChange} className="input-style" placeholder="1L / 5L Bottle" /></div>
                <div><label className="label-style">Shelf Life</label><input type="text" name="inkLife" value={formData.specifications.inkLife} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Compatible Heads</label><input type="text" name="inkHeadComp" value={formData.specifications.inkHeadComp} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Suitable Fabric</label><input type="text" name="inkFabric" value={formData.specifications.inkFabric} onChange={handleSpecChange} className="input-style" /></div>
              </div>
            ) : (
              // --- PRINTER SPECS (As per Image) ---
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* General */}
                <div><label className="label-style">Model</label><input type="text" name="model" value={formData.specifications.model} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Print Heads</label><input type="text" name="printHead" value={formData.specifications.printHead} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Max Print Width</label><input type="text" name="printWidth" value={formData.specifications.printWidth} onChange={handleSpecChange} className="input-style" /></div>
                
                {/* Speed */}
                <div className="md:col-span-3 bg-blue-50 p-4 rounded border border-blue-100 grid grid-cols-3 gap-4">
                  <div><label className="text-xs font-bold text-gray-600">Production Mode</label><div className="flex"><input type="text" name="speedProd" value={formData.specifications.speedProd} onChange={handleSpecChange} className="input-style rounded-r-none" /><span className="bg-gray-200 px-2 py-3 rounded-r text-sm">m²/h</span></div></div>
                  <div><label className="text-xs font-bold text-gray-600">Precision Mode</label><div className="flex"><input type="text" name="speedRes" value={formData.specifications.speedRes} onChange={handleSpecChange} className="input-style rounded-r-none" /><span className="bg-gray-200 px-2 py-3 rounded-r text-sm">m²/h</span></div></div>
                  <div><label className="text-xs font-bold text-gray-600">High Precision</label><div className="flex"><input type="text" name="speedHigh" value={formData.specifications.speedHigh} onChange={handleSpecChange} className="input-style rounded-r-none" /><span className="bg-gray-200 px-2 py-3 rounded-r text-sm">m²/h</span></div></div>
                </div>

                {/* Ink & Media */}
                <div><label className="label-style">Ink Sort</label><input type="text" name="inkSort" value={formData.specifications.inkSort} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Ink Capacity</label><input type="text" name="inkCapacity" value={formData.specifications.inkCapacity} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Media Width</label><input type="text" name="mediaWidth" value={formData.specifications.mediaWidth} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Media Thickness</label><input type="text" name="mediaThickness" value={formData.specifications.mediaThickness} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Max Roll Weight</label><input type="text" name="mediaWeight" value={formData.specifications.mediaWeight} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Media Sort</label><input type="text" name="mediaSort" value={formData.specifications.mediaSort} onChange={handleSpecChange} className="input-style" /></div>

                {/* System */}
                <div><label className="label-style">Media Heater</label><input type="text" name="mediaHeater" value={formData.specifications.mediaHeater} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Take-up Device</label><input type="text" name="takeUpDevice" value={formData.specifications.takeUpDevice} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Drying System</label><input type="text" name="dryingSystem" value={formData.specifications.dryingSystem} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Guide Rail</label><input type="text" name="guideRail" value={formData.specifications.guideRail} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Interface</label><input type="text" name="interface" value={formData.specifications.interface} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">RIP Software</label><input type="text" name="ripSoftware" value={formData.specifications.ripSoftware} onChange={handleSpecChange} className="input-style" /></div>
                <div><label className="label-style">Power/Voltage</label><input type="text" name="power" value={formData.specifications.power} onChange={handleSpecChange} className="input-style" /></div>
                <div className="md:col-span-2"><label className="label-style">Operation Env.</label><input type="text" name="environment" value={formData.specifications.environment} onChange={handleSpecChange} className="input-style" /></div>

                {/* Dimensions */}
                <div className="md:col-span-3 bg-gray-50 p-4 rounded border border-gray-200">
                   <p className="font-bold mb-2">Dimensions & Weight</p>
                   <div className="grid grid-cols-2 gap-4">
                      <div><label className="label-style">Printer Dim (L*W*H)</label><input type="text" name="dimPrinter" value={formData.specifications.dimPrinter} onChange={handleSpecChange} className="input-style" /></div>
                      <div><label className="label-style">Packing Dim</label><input type="text" name="dimPacking" value={formData.specifications.dimPacking} onChange={handleSpecChange} className="input-style" /></div>
                      <div><label className="label-style">Net Weight</label><input type="text" name="weightNet" value={formData.specifications.weightNet} onChange={handleSpecChange} className="input-style" /></div>
                      <div><label className="label-style">Gross Weight</label><input type="text" name="weightGross" value={formData.specifications.weightGross} onChange={handleSpecChange} className="input-style" /></div>
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4"><button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all"><FaSave /> {loading ? 'Saving...' : 'Save Product'}</button></div>
        </form>
      </div>
      <style>{`.label-style { display: block; font-size: 0.85rem; font-weight: 600; color: #4b5563; margin-bottom: 0.4rem; } .input-style { width: 100%; padding: 0.6rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; outline: none; transition: all; } .input-style:focus { border-color: #2563eb; }`}</style>
    </AdminLayout>
  );
};

export default ProductForm;