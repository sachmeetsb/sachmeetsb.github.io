import React, { useState } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';
import { FaChartLine, FaBrain, FaHandHoldingUsd, FaRocket, FaLightbulb, FaSeedling } from 'react-icons/fa';
import { handleConsultationRequest, handleCTAClick } from '../utils/analytics';

function Offerings() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const offerings = [
    {
      title: "Adirohan",
      subtitle: "Startup Launch Platform",
      description: "We help you create your startup with minimal equity. Start your business with minimal initial investment and scale rapidly.",
      icon: FaRocket,
      gradient: "from-primary-400 to-primary-600",
      hoverGradient: "from-primary-500 to-primary-700",
      features: ["Minimal Equity Requirements", "Low Initial Investment", "Rapid Scaling Support"]
    },
    {
      title: "Adhyayan",
      subtitle: "AI Process Optimization",
      description: "We understand your existing processes and streamline your workflows with AI, reducing manual work through multi-modal AI-driven solutions.",
      icon: FaBrain,
      gradient: "from-secondary-400 to-secondary-600",
      hoverGradient: "from-secondary-500 to-secondary-700",
      features: ["Workflow Automation", "Multi-modal AI", "Efficiency Optimization"]
    },
    {
      title: "Ashray",
      subtitle: "Startup Funding Solutions",
      description: "Seed funding for the new self-dependent India. Get the financial support you need to launch your innovative venture.",
      icon: FaSeedling,
      gradient: "from-accent-400 to-accent-600",
      hoverGradient: "from-accent-500 to-accent-700",
      features: ["Seed Funding", "Innovation Support", "Growth Capital"]
    }
  ];

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 200
  });

  const cardsTrail = useTrail(offerings.length, {
    from: { opacity: 0, transform: 'translateY(80px) scale(0.9)' },
    to: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    config: { tension: 120, friction: 40 },
    delay: 400
  });

  return (
    <section id="offerings" className="py-24 scroll-mt-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-primary-50">
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-200/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <animated.div style={headerAnimation} className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-2 rounded-full mb-6">
            <FaLightbulb className="text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wide">Our Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text bg-gradient-to-r from-neutral-800 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Transformative AI Offerings
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to revolutionize your business through cutting-edge AI technology and strategic innovation.
          </p>
        </animated.div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cardsTrail.map((style, index) => {
            const offering = offerings[index];
            const IconComponent = offering.icon;
            return (
              <animated.div 
                key={offering.title}
                style={style}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative overflow-hidden rounded-2xl p-8 h-full transform transition-all duration-500 ${
                  hoveredCard === index 
                    ? 'scale-105 shadow-2xl -translate-y-4' 
                    : 'scale-100 shadow-xl hover:shadow-2xl'
                }`}>
                  {/* Card Background with Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    hoveredCard === index ? offering.hoverGradient : offering.gradient
                  } opacity-90 transition-all duration-500`}></div>
                  
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center transform transition-all duration-500 ${
                        hoveredCard === index ? 'scale-110 rotate-6' : 'scale-100'
                      }`}>
                        <IconComponent className="text-3xl text-white" />
                      </div>
                    </div>
                    
                    {/* Title and Subtitle */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                        {offering.title}
                      </h3>
                      <p className="text-white/80 font-medium text-sm uppercase tracking-wide">
                        {offering.subtitle}
                      </p>
                    </div>
                    
                    {/* Description */}
                    <p className="text-white/90 leading-relaxed mb-6 flex-grow">
                      {offering.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {offering.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                          <span className="text-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-6">
                      <button className="group/btn w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40">
                        <span className="flex items-center justify-center space-x-2">
                          <span>Learn More</span>
                          <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </animated.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <animated.div style={headerAnimation} className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => handleCTAClick('explore_solutions', 'offerings')}
              className="btn-primary text-lg px-8 py-4"
            >
              Explore All Solutions
            </button>
            <button 
              onClick={() => handleConsultationRequest('offerings')}
              className="btn-secondary text-lg px-8 py-4"
            >
              Schedule Consultation
            </button>
          </div>
        </animated.div>
      </div>
    </section>
  );
}

export default Offerings;
