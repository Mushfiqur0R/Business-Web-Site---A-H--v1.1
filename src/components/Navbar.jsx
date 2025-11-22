// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Use NavLink for active styling

const Navbar = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  // State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to add and remove the scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user scrolls more than 50px, otherwise false
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // SVG Icons
  const searchIcon = <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
  const hamburgerIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
  const closeIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

  // Common classes for NavLink for active styling
  const navLinkClasses = "hover:text-gray-300 transition-colors";
  const activeLinkClasses = "text-blue-400 font-semibold"; // Style for the active link

  return (
    // Dynamic classes for the header based on scroll position
    <header className={`w-full top-0 left-0 z-50 text-white transition-all duration-300 ${isScrolled ? 'fixed bg-black bg-opacity-80 shadow-lg backdrop-blur-md' : 'absolute bg-black bg-opacity-25'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-12 w-auto" src="https://i.postimg.cc/SN9qDLwv/A-H-ENTERPRISE-nill.png" alt="A & H Enterprise Logo" />
            </Link>
          </div>

          {/* Desktop Menu - Unchanged as per your request */}
          <nav className="desktop-menu">
            <NavLink to="/" className={({isActive}) => isActive ? activeLinkClasses : navLinkClasses}>HOME</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? activeLinkClasses : navLinkClasses}>ABOUT US</NavLink>
            <NavLink to="/textile" className={({isActive}) => isActive ? activeLinkClasses : navLinkClasses}>PRODUCTS</NavLink>
            <NavLink to="/textile" className={({isActive}) => isActive ? activeLinkClasses : navLinkClasses}>TEXTILE</NavLink>
            <NavLink to="/packaging" className={({isActive}) => isActive ? activeLinkClasses : navLinkClasses}>PACKAGING</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? activeLinkClasses : navLinkClasses}>CONTACT US</NavLink>
            <button className="hover:text-gray-300">{searchIcon}</button>
            <a href="#" className="hover:text-gray-300">EN ▼</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-button">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? closeIcon : hamburgerIcon}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown - Updated to include all links */}
      {isOpen && (
        <div className="mobile-menu-dropdown bg-black bg-opacity-90 backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" onClick={() => setIsOpen(false)}>HOME</NavLink>
            <NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" onClick={() => setIsOpen(false)}>ABOUT US</NavLink>
            
            {/* Added Missing Links for Mobile */}
            <NavLink to="/textile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" onClick={() => setIsOpen(false)}>PRODUCTS</NavLink>
            <NavLink to="/textile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" onClick={() => setIsOpen(false)}>TEXTILE</NavLink>
            <NavLink to="/packaging" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" onClick={() => setIsOpen(false)}>PACKAGING</NavLink>
            <NavLink to="/news" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" onClick={() => setIsOpen(false)}>NEWS</NavLink>
            
            <NavLink to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700" onClick={() => setIsOpen(false)}>CONTACT US</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;