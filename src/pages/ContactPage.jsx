// src/pages/ContactPage.jsx
import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* 1. Header */}
      <div className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400 text-lg">We are here to help you with your printing needs.</p>
      </div>

      {/* 2. Info & Form Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Office Address</h4>
                  <p className="text-gray-600">28 Babupura (1st floor), Katabon, <br/>Dhaka-1205, Bangladesh</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Email Us</h4>
                  {/* --- UPDATED EMAIL --- */}
                  <a href="mailto:service@aandhenterprise.com" className="text-blue-600 hover:underline">service@aandhenterprise.com</a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                   <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Call Us</h4>
                  {/* --- UPDATED PHONES --- */}
                  <div className="flex flex-col">
                    <a href="tel:+8801727200035" className="text-blue-600 hover:underline">+880 1727-200035</a>
                    <a href="tel:+8801794275382" className="text-blue-600 hover:underline">+880 1794-275382</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Existing Contact Form */}
          <div className="bg-white rounded-lg">
             <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;