import React, { useEffect, useState } from 'react';
import { useSpring, animated, useSpringValue, useTrail } from 'react-spring';
import { handleCTAClick, handleDemoRequest } from '../utils/analytics';

function Header() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // JSON-LD structured data for better SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kartar AI Labs",
      "description": "Leading AI consulting firm specializing in generative AI solutions and business process automation",
      "url": "https://kartar.ai",
      "logo": "/kartar logo 2.png",
      "sameAs": [
        "https://www.linkedin.com/company/kartar-ai-labs",
        "https://twitter.com/kartarailabs"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    setIsVisible(true);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main content animations
  const heroAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(60px)',
    config: { tension: 120, friction: 40 },
    delay: 200
  });

  const subtitleAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
    config: { tension: 120, friction: 40 },
    delay: 400
  });

  // Cards trail animation
  const cards = [
    {
      title: "Our Mission",
      content: "To revolutionize core businesses through strategic AI implementation, delivering custom generative AI solutions that enhance operational efficiency, drive innovation, and ensure sustainable growth in the digital economy.",
      icon: "🎯"
    },
    {
      title: "Our Vision",
      content: "To emerge as India's premier AI transformation partner, democratizing artificial intelligence for businesses of all sizes. We aim to catalyze the adoption of generative AI technologies, making them accessible and impactful for every enterprise.",
      icon: "🚀"
    }
  ];

  const cardsTrail = useTrail(cards.length, {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(80px) scale(0.9)',
    config: { tension: 120, friction: 40 },
    delay: 600
  });

  // CTA button animation
  const ctaAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(40px) scale(0.95)',
    config: { tension: 120, friction: 40 },
    delay: 1000
  });

  // Floating elements animation
  const floatingElements = useSpring({
    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
    config: { tension: 150, friction: 50 }
  });

  return (
    <header id="header" className="min-h-screen pt-28 pb-16 relative overflow-hidden flex items-center" role="banner" aria-label="Main header section">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient">
        {/* Floating geometric shapes */}
        <animated.div style={floatingElements} className="absolute inset-0">
          <div className="blob w-72 h-72 bg-primary-300 top-10 left-10 animate-pulse-slow"></div>
          <div className="blob w-96 h-96 bg-secondary-300 top-1/2 right-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="blob w-64 h-64 bg-accent-300 bottom-10 left-1/3 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </animated.div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Hero Text */}
        <div className="mb-16">
          <animated.div style={heroAnimation}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white text-shadow leading-tight">
              Transform with
              <span className="block mt-4">
                <span className="gradient-text bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent">
                  AI Magic
                </span>
                <span className="inline-block ml-4 animate-wiggle">✨</span>
              </span>
            </h1>
          </animated.div>
          
          <animated.div style={subtitleAnimation}>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Custom Generative AI Solutions that{' '}
              <span className="font-bold text-primary-200">revolutionize</span> your business,{' '}
              <span className="font-bold text-secondary-200">amplify</span> your potential, and{' '}
              <span className="font-bold text-accent-200">accelerate</span> your growth
            </p>
          </animated.div>

          {/* CTA Buttons */}
          <animated.div style={ctaAnimation} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => handleCTAClick('start_ai_journey', 'header')}
              className="btn-primary text-lg px-10 py-4 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Your AI Journey</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => handleDemoRequest('header')}
              className="btn-secondary text-lg px-10 py-4 backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white hover:text-neutral-800"
            >
              Watch Demo
            </button>
          </animated.div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cardsTrail.map((style, index) => (
            <animated.div 
              key={cards[index].title}
              style={style} 
              className="group card-hover"
            >
              <div className="glass p-8 rounded-2xl border border-white/20 relative overflow-hidden">
                {/* Card gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4 animate-float">{cards[index].icon}</div>
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                    {cards[index].title}
                  </h2>
                  <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {cards[index].content}
                  </p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </animated.div>
          ))}
        </div>

        {/* Stats Section */}
        <animated.div style={ctaAnimation} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '50+', label: 'Projects Delivered' },
            { number: '25+', label: 'Happy Clients' },
            { number: '3+', label: 'Years Experience' },
            { number: '99%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center group hover-scale">
              <div className="glass p-6 rounded-xl border border-white/20">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </animated.div>
      </div>

    </header>
  );
}

export default Header;
