import React from 'react';
import { Link } from 'react-scroll';
import { NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  return (
    <nav className="bg-primary p-4 text-secondary shadow-md sticky top-0 z-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <NavLink 
          to="/" 
          className="mb-4 md:mb-0 flex items-center text-xl font-bold cursor-pointer"
        >
          <img 
            src="/kartar logo.png" 
            alt="Kartar AI Labs Logo" 
            className="h-16 w-auto object-contain transform transition-all duration-300 hover:scale-105 border-2 border-white rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)]" 
          />
        </NavLink>
        <div className="space-x-6 md:ml-auto">
          <NavLink to="/" className="hover:text-gray-200 cursor-pointer">Home</NavLink>
          {!isAboutPage && (
            <>
              <Link 
                to="offerings" 
                spy={true} 
                smooth={true} 
                duration={500} 
                className="hover:text-gray-200 cursor-pointer"
              >
                Offerings
              </Link>
              <Link 
                to="contact" 
                spy={true} 
                smooth={true} 
                duration={500} 
                className="hover:text-gray-200 cursor-pointer"
              >
                Contact
              </Link>
            </>
          )}
          <NavLink to="/about" className="hover:text-gray-200 cursor-pointer">About Us</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
