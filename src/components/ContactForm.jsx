// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState('Textile');
  
  // -----------------------------------------------------------------
  // TODO: নিচের 'YOUR_FORMSPREE_ID' এর জায়গায় আপনার আইডি বসান
  // উদাহরণ: useForm('xabcdnox');
  // -----------------------------------------------------------------
  const [state, handleSubmit] = useForm('xkgelwjw'); 

  // --- SUCCESS MESSAGE WITH ANIMATION ---
  if (state.succeeded) {
    return (
      <div className="max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-2xl text-center border border-gray-100 transition-all duration-500 transform scale-100">
        
        {/* CSS Animation from index.css */}
        <div className="mb-6 flex justify-center">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Success!</h2>
        <p className="text-gray-500 mb-8">
          Thanks for reaching out! We have received your message and will contact you soon.
        </p>

        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  // --- FORM LAYOUT ---
  return (
    <section className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-8">
      
      {/* Form Header */}
      <div className="bg-gray-50 px-8 py-8 border-b border-gray-100 text-center">
         <h2 className="text-2xl font-bold text-gray-800">Write to Us</h2>
         <p className="mt-1 text-gray-500 text-sm">Fill out the form below to start a conversation.</p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Custom Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('Textile')}
              className={`py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                activeTab === 'Textile' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Textile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('Non-Textile')}
              className={`py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
                activeTab === 'Non-Textile' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Non-Textile
            </button>
          </div>

          {/* Hidden Input for Category */}
          <input type="hidden" name="category" value={activeTab} />

          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              id="name" type="text" name="name" placeholder="John Doe" required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              id="email" type="email" name="email" placeholder="you@example.com" required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
            <input 
              id="subject" type="text" name="subject" placeholder="Inquiry about..." 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" name="message" rows="4" placeholder="Type your message here..." required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={state.submitting} 
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {state.submitting ? 'Sending...' : 'Send Message'}
            {!state.submitting && (
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            )}
          </button>

        </form>
      </div>
    </section>
  );
};

export default ContactForm;