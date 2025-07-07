import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { handleCTAClick } from "../utils/analytics";

function Navbar() {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navAnimation = useSpring({
    backgroundColor:
      isScrolled || isAboutPage
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(255, 255, 255, 0.1)",
    backdropFilter: isScrolled || isAboutPage ? "blur(20px)" : "blur(10px)",
    boxShadow:
      isScrolled || isAboutPage
        ? "0 10px 40px rgba(0, 0, 0, 0.1)"
        : "0 5px 20px rgba(0, 0, 0, 0.05)",
    config: { tension: 280, friction: 60 },
  });

  const mobileMenuAnimation = useSpring({
    opacity: isMobileMenuOpen ? 1 : 0,
    transform: isMobileMenuOpen ? "translateY(0%)" : "translateY(-100%)",
    config: { tension: 300, friction: 40 },
  });

  const navLinks = [
    { to: "/", label: "Home", type: "route" },
    ...(isAboutPage
      ? []
      : [
          { to: "offerings", label: "Offerings", type: "scroll" },
          { to: "contact", label: "Contact", type: "scroll" },
        ]),
    { to: "/about", label: "About Us", type: "route" },
  ];

  return (
    <animated.nav
      style={navAnimation}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center group">
            <div className="relative">
              <img
                src="/kartar logo.png"
                alt="Kartar AI Labs Logo"
                className="h-16 w-auto object-contain transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 rounded-lg shadow-lg hover:shadow-xl"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div key={link.to} className="relative group">
                {link.type === "route" ? (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? "text-blue bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg"
                          : isScrolled || isAboutPage
                            ? "text-neutral-700 hover:text-primary-600"
                            : "text-blue hover:text-primary-200"
                      }`
                    }
                  >
                    {link.label}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </NavLink>
                ) : (
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    className={`relative px-4 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isScrolled || isAboutPage
                        ? "text-neutral-700 hover:text-primary-600"
                        : "text-neutral hover:text-primary-200"
                    }`}
                  >
                    {link.label}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <button
              onClick={() => handleCTAClick("get_started", "navbar")}
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              console.log('Mobile menu button clicked, current state:', isMobileMenuOpen);
              setIsMobileMenuOpen(!isMobileMenuOpen); 
            }}
            className={`md:hidden p-2 rounded-lg backdrop-blur-md border transition-all duration-300 relative z-50 ${
              isScrolled || isAboutPage
                ? "bg-neutral-100 border-neutral-200 hover:bg-neutral-200 text-neutral-700"
                : "bg-white/10 border-white/20 hover:bg-white/20 text-white"
            }`}
            aria-label="Toggle mobile menu"
            type="button"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <div
                className={`w-4 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}
              ></div>
              <div
                className={`w-4 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></div>
              <div
                className={`w-4 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
              ></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <animated.div
          style={{
            ...mobileMenuAnimation,
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
          }}
          className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg z-40"
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.to}>
                {link.type === "route" ? (
                  <NavLink
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg"
                          : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium cursor-pointer text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleCTAClick("get_started", "mobile_menu");
              }}
              className="w-full btn-primary mt-4"
            >
              Get Started
            </button>
          </div>
        </animated.div>
      </div>
    </animated.nav>
  );
}

export default Navbar;
