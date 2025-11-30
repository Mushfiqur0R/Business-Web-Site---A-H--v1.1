// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icons
  const searchIcon = <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
  const hamburgerIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
  const closeIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
  const chevronDown = <svg className={`w-3 h-3 ml-1 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;

  return (
    <header className={`w-full fixed top-0 left-0 z-50 text-white transition-all duration-300 ${isScrolled ? 'bg-black/90 shadow-md backdrop-blur-sm py-2' : 'bg-gradient-to-b from-black/70 to-transparent py-4'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-10 md:h-12 w-auto" src="https://i.postimg.cc/SN9qDLwv/A-H-ENTERPRISE-nill.png" alt="A & H Enterprise Logo" />
            </Link>
          </div>

          {/* --- DESKTOP MENU (Raw CSS Class: desktop-menu) --- */}
          <nav className="desktop-menu">
            <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>HOME</NavLink>
            <NavLink to="/about" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>ABOUT US</NavLink>
            
            {/* Products Dropdown */}
            <div 
              className="nav-dropdown-container"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className={`nav-link flex items-center focus:outline-none ${dropdownOpen ? 'text-blue-400' : ''}`}>
                PRODUCTS {chevronDown}
              </button>
              
              {/* Dropdown Menu (Raw CSS Class: nav-dropdown-menu) */}
              <div className={`nav-dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                <NavLink to="/textile" className="dropdown-item">Textile Printers</NavLink>
                <NavLink to="/printer" className="dropdown-item">Commercial Printers</NavLink>
                <NavLink to="/packaging" className="dropdown-item">Packaging Solutions</NavLink>
                <NavLink to="/ink" className="dropdown-item">Inks & Consumables</NavLink>
              </div>
            </div>

            <NavLink to="/textile" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>TEXTILE</NavLink>
            <NavLink to="/packaging" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>PACKAGING</NavLink>
            <NavLink to="/news" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>NEWS</NavLink>
            <NavLink to="/contact" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>CONTACT US</NavLink>
            
            <button className="hover:text-gray-300">{searchIcon}</button>
            <a href="#" className="hover:text-gray-300 font-bold text-sm">EN ▼</a>
          </nav>

          {/* --- MOBILE MENU BUTTON (Raw CSS Class: mobile-menu-button) --- */}
          <div className="mobile-menu-button">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none p-2">
              {isOpen ? closeIcon : hamburgerIcon}
            </button>
          </div>
        </div>
      </div>
      
      {/* --- MOBILE MENU DROPDOWN --- */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md transition-all duration-300">
          <div className="px-4 py-4 space-y-3 text-center">
            <NavLink to="/" className="block px-3 py-2 text-white font-medium hover:text-blue-400 border-b border-gray-800" onClick={() => setIsOpen(false)}>HOME</NavLink>
            <NavLink to="/about" className="block px-3 py-2 text-white font-medium hover:text-blue-400 border-b border-gray-800" onClick={() => setIsOpen(false)}>ABOUT US</NavLink>
            <NavLink to="/textile" className="block px-3 py-2 text-white font-medium hover:text-blue-400 border-b border-gray-800" onClick={() => setIsOpen(false)}>TEXTILE</NavLink>
            <NavLink to="/printer" className="block px-3 py-2 text-white font-medium hover:text-blue-400 border-b border-gray-800" onClick={() => setIsOpen(false)}>PRINTERS</NavLink>
            <NavLink to="/packaging" className="block px-3 py-2 text-white font-medium hover:text-blue-400 border-b border-gray-800" onClick={() => setIsOpen(false)}>PACKAGING</NavLink>
            <NavLink to="/ink" className="block px-3 py-2 text-white font-medium hover:text-blue-400 border-b border-gray-800" onClick={() => setIsOpen(false)}>INKS</NavLink>
            <NavLink to="/news" className="block px-3 py-2 text-white font-medium hover:text-blue-400 border-b border-gray-800" onClick={() => setIsOpen(false)}>NEWS</NavLink>
            <NavLink to="/contact" className="block px-3 py-2 text-white font-medium hover:text-blue-400" onClick={() => setIsOpen(false)}>CONTACT US</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;