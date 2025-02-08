import React from 'react';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary p-4 text-secondary shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="flex items-center text-xl font-bold cursor-pointer">
          <img src="/kartar logo.png" alt="Kartar AI Labs Logo" className="h-8 mr-2" />
        </NavLink>
        <div>
          <NavLink to="/" className="px-3 hover:text-gray-200 cursor-pointer">Home</NavLink>
          <NavLink to="/#offerings" className="px-3 hover:text-gray-200 cursor-pointer">Offerings</NavLink>
          <NavLink to="/#contact" className="px-3 hover:text-gray-200 cursor-pointer">Contact</NavLink>
          <NavLink to="/about" className="px-3 hover:text-gray-200 cursor-pointer">About Us</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
