import React from "react";
import {
  FaHeart,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="/kartar logo.png"
                  alt="Kartar AI Labs Logo"
                  className="h-12 w-auto object-contain rounded-lg shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-bold gradient-text bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                    Kartar AI Labs
                  </h3>
                  <p className="text-white/60 text-sm">
                    AI Transformation for Indian Businesses
                  </p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                Revolutionizing businesses through strategic AI implementation.
                We deliver custom generative AI solutions that enhance
                efficiency, drive innovation, and ensure sustainable growth.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                  { icon: FaTwitter, href: "#", label: "Twitter" },
                  { icon: FaGithub, href: "#", label: "GitHub" },
                  { icon: FaInstagram, href: "#", label: "Instagram" },
                ].map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10 hover:border-white/30"
                    aria-label={social.label}
                  >
                    <social.icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Our Offerings", href: "#offerings" },
                  { name: "Case Studies", href: "#case-studies" },
                  { name: "Contact", href: "#contact" },
                ].map((link, index) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Get In Touch
              </h4>
              <div className="space-y-4">
                <div className="text-white/80">
                  <p className="font-medium mb-1">Email</p>
                  <a
                    href="mailto:info@kartar.ai"
                    className="text-white/60 hover:text-primary-400 transition-colors duration-300"
                  >
                    info@kartar.ai
                  </a>
                </div>
                <div className="text-white/80">
                  <p className="font-medium mb-1">Location</p>
                  <p className="text-white/60">Indore, India</p>
                </div>
                <div className="text-white/80">
                  <p className="font-medium mb-1">Business Hours</p>
                  <p className="text-white/60">
                    Mon - Fri: 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-white/60">
                  &copy; {new Date().getFullYear()} Kartar AI Labs. All rights
                  reserved.
                </p>
                <p className="text-white/40 flex items-center justify-center md:justify-start space-x-1 mt-1">
                  <span>Made with</span>
                  <FaHeart className="text-red-400 animate-pulse" />
                  <span>in Indore, India</span>
                </p>
              </div>

              {/* Scroll to Top */}
              <button
                onClick={scrollToTop}
                className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/10 hover:border-white/30"
              >
                <span className="text-sm font-medium">Back to Top</span>
                <FaArrowUp className="text-xs group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
