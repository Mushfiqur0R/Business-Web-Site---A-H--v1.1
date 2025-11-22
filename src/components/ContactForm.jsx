// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState('Textile');
  // --- IMPORTANT: Replace 'YOUR_UNIQUE_ID' with your actual Formspree form ID ---
  const [state, handleSubmit] = useForm('https://formspree.io/f/xgvrnvda'); 

  if (state.succeeded) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-green-600">Thanks for your message!</h2>
        <p className="mt-4 text-lg text-gray-700">We'll get back to you soon.</p>
      </div>
    );
  }

  const tabButtonClasses = "w-1/2 py-3 text-lg font-semibold transition-colors";

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600">Online Message</h2>
          <p className="mt-4 text-gray-600">Thank you for your attention and support. We will reply to your valuable comments in time.</p>
        </div>

        <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-8 shadow-sm">
          {/* Tab Buttons */}
          <div className="flex bg-blue-50 rounded-lg mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('Textile')}
              className={`${tabButtonClasses} ${activeTab === 'Textile' ? 'bg-blue-500 text-white rounded-lg' : 'text-gray-500'}`}
            >
              Textile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('No-textile')}
              className={`${tabButtonClasses} ${activeTab === 'No-textile' ? 'bg-blue-500 text-white rounded-lg' : 'text-gray-500'}`}
            >
              No-textile
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" type="text" name="name" placeholder="Name*" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" type="email" name="email" placeholder="Email*" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="sr-only">Subject</label>
            <input id="subject" type="text" name="subject" placeholder="Subject" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="sr-only">How can we help you?</label>
            <textarea id="message" name="message" rows="5" placeholder="How can we help you?" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
          </div>

          <div className="text-right">
            <button type="submit" disabled={state.submitting} className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;