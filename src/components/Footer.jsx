// src/components/Footer.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Footer = () => {
  // Default values set to your provided info
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
          // Only update if data exists, otherwise keep default
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

  const LocationIcon = (
    <svg className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  );

  const EmailIcon = (
    <svg className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  );

  const PhoneIcon = (
    <svg className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
    </svg>
  );

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                className="h-14 w-auto" 
                src="https://i.postimg.cc/SN9qDLwv/A-H-ENTERPRISE-nill.png" 
                alt="A & H Enterprise Logo" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Innovating the future of industry with high-quality, efficient, and sustainable digital printing technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold tracking-wider uppercase text-white mb-6 border-b-2 border-blue-500 inline-block pb-1">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-300 hover:pl-2">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition duration-300 hover:pl-2">About Us</Link></li>
              <li><Link to="/textile" className="text-gray-400 hover:text-blue-400 transition duration-300 hover:pl-2">Products</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-blue-400 transition duration-300 hover:pl-2">News & Events</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300 hover:pl-2">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info (Dynamic) */}
          <div>
            <h3 className="text-lg font-bold tracking-wider uppercase text-white mb-6 border-b-2 border-blue-500 inline-block pb-1">
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start">
                {LocationIcon}
                <span className="whitespace-pre-line">{contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                {EmailIcon}
                <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-400 transition duration-300">{contactInfo.email}</a>
              </li>
              <li className="flex items-start">
                {PhoneIcon}
                <div className="flex flex-col">
                  {contactInfo.phone1 && <a href={`tel:${contactInfo.phone1}`} className="hover:text-blue-400 transition duration-300 mb-1">{contactInfo.phone1}</a>}
                  {contactInfo.phone2 && <a href={`tel:${contactInfo.phone2}`} className="hover:text-blue-400 transition duration-300">{contactInfo.phone2}</a>}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} A & H Enterprise. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;