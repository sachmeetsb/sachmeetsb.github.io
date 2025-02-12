import React from 'react';
import { useSpring, animated } from 'react-spring';

function Header() {
  // JSON-LD structured data for better SEO
  React.useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kartar AI Labs",
      "description": "Leading AI consulting firm in India specializing in generative AI solutions and business process automation",
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

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, marginTop: -50 },
    to: { opacity: 1, marginTop: 0 },
    config: { duration: 300 },
  });

  return (
    <header id="header" className="py-20 relative overflow-hidden" role="banner" aria-label="Main header section">
      <div className="container mx-auto text-center relative z-10 bg-cover bg-center">
        <animated.h1 style={fadeIn} className="text-5xl font-bold mb-4 text-tertiary italic">
          AI Transformation for Indian Businesses
        </animated.h1>
        <animated.p style={fadeIn} className="text-xl text-primary">
          Empowering SMEs and Enterprises with Custom Generative AI Solutions
        </animated.p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <animated.div style={fadeIn} className="bg-white/90 p-6 rounded-lg shadow-lg" role="article" aria-labelledby="mission-heading">
            <h2 id="mission-heading" className="text-2xl font-bold text-tertiary mb-3">Our Mission</h2>
            <p className="text-gray-700">
              To revolutionize Indian businesses through strategic AI implementation, delivering custom generative AI solutions that enhance operational efficiency, drive innovation, and ensure sustainable growth in the digital economy.
            </p>
          </animated.div>
          
          <animated.div style={fadeIn} className="bg-white/90 p-6 rounded-lg shadow-lg" role="article" aria-labelledby="vision-heading">
            <h2 id="vision-heading" className="text-2xl font-bold text-tertiary mb-3">Our Vision</h2>
            <p className="text-gray-700">
              To emerge as India's premier AI transformation partner, democratizing artificial intelligence for businesses of all sizes. We aim to catalyze the adoption of generative AI technologies, making them accessible and impactful for every Indian enterprise.
            </p>
          </animated.div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30" >
        <img src="/tiger.jpg" className='w-full h-full object-cover' alt="Abstract business background" />
      </div>
    </header>
  );
}

export default Header;
