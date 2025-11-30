// src/pages/ContactPage.jsx
import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ContactPage = () => {
  // Default values
  const [contactInfo, setContactInfo] = useState({
    email: 'service@aandhenterprise.com',
    phone1: '+880 1727-200035',
    phone2: '+880 1794-275382',
    address: '28 Babupura (1st floor), Katabon, Dhaka-1205, Bangladesh'
  });

  // Fetch updated contact info from Firestore
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, "settings", "contact");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContactInfo({
            email: data.email || 'service@aandhenterprise.com',
            phone1: data.phone1 || '+880 1727-200035',
            phone2: data.phone2 || '+880 1794-275382',
            address: data.address || '28 Babupura (1st floor), Katabon, Dhaka-1205, Bangladesh'
          });
        }
      } catch (err) {
        console.error("Error fetching contact info:", err);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. Header with Pattern */}
      <div className="bg-gray-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Contact Us</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            We are here to help you revolutionize your printing business.
          </p>
        </div>
      </div>

      {/* 2. Info & Form Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Contact Information (Card Style) */}
          <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl h-fit border border-gray-100">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-4">Get in Touch</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-8 pt-4">
              {/* Address */}
              <div className="flex items-start group">
                <div className="bg-blue-50 p-4 rounded-xl mr-5 group-hover:bg-blue-600 transition-colors duration-300">
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Office Address</h4>
                  <p className="text-gray-600 mt-1 whitespace-pre-line">{contactInfo.address}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start group">
                <div className="bg-blue-50 p-4 rounded-xl mr-5 group-hover:bg-blue-600 transition-colors duration-300">
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Email Us</h4>
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline mt-1 block">{contactInfo.email}</a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start group">
                <div className="bg-blue-50 p-4 rounded-xl mr-5 group-hover:bg-blue-600 transition-colors duration-300">
                   <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Call Us</h4>
                  <div className="flex flex-col mt-1">
                    {contactInfo.phone1 && <a href={`tel:${contactInfo.phone1}`} className="text-blue-600 hover:underline font-medium">{contactInfo.phone1}</a>}
                    {contactInfo.phone2 && <a href={`tel:${contactInfo.phone2}`} className="text-blue-600 hover:underline font-medium">{contactInfo.phone2}</a>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Updated Contact Form */}
          <div className="relative">
             <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;