import React, { useState } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';
import { FaRocket, FaLightbulb, FaBrain, FaAward, FaCogs, FaUsers, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import { handleCTAClick } from '../utils/analytics';

function AboutUs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 200
  });

  const visionMissionData = [
    {
      title: "Our Vision",
      content: "At Kartar AI, we envision a future where artificial intelligence empowers businesses to reach their full potential. We're not just another AI company – we're your strategic partner in digital transformation, committed to delivering solutions that drive real business value.",
      icon: FaRocket,
      gradient: "from-primary-500 to-primary-700",
      bgColor: "bg-primary-50"
    },
    {
      title: "Our Expertise",
      content: "With deep expertise in machine learning, natural language processing, and computer vision, we specialize in developing custom AI solutions that address your unique business challenges. Our team of experts combines technical excellence with industry knowledge to deliver results that matter.",
      icon: FaBrain,
      gradient: "from-secondary-500 to-secondary-700",
      bgColor: "bg-secondary-50"
    }
  ];

  const advantages = [
    {
      title: "Tailored Solutions",
      description: "We don't believe in one-size-fits-all. Every solution is customized to your specific needs and objectives.",
      icon: FaCogs,
      gradient: "from-primary-400 to-primary-600"
    },
    {
      title: "Proven Results",
      description: "Our track record speaks for itself, with successful implementations across various industries and use cases.",
      icon: FaAward,
      gradient: "from-secondary-400 to-secondary-600"
    },
    {
      title: "Expert Team",
      description: "Work with seasoned AI professionals who understand both technology and business requirements.",
      icon: FaUsers,
      gradient: "from-accent-400 to-accent-600"
    }
  ];

  const visionTrail = useTrail(visionMissionData.length, {
    from: { opacity: 0, transform: 'translateY(80px) scale(0.9)' },
    to: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    config: { tension: 120, friction: 40 },
    delay: 400
  });

  const advantagesTrail = useTrail(advantages.length, {
    from: { opacity: 0, transform: 'translateY(60px) scale(0.95)' },
    to: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    config: { tension: 120, friction: 40 },
    delay: 600
  });

  const contactAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(40px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 800
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-secondary-50">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-200/25 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <animated.div style={headerAnimation} className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-2 rounded-full mb-6">
            <FaLightbulb className="text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wide">About Kartar AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text bg-gradient-to-r from-neutral-800 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Transforming Businesses Through
            <span className="block mt-2">AI Innovation</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We're not just another AI company – we're your strategic partner in digital transformation, 
            committed to delivering solutions that drive real business value.
          </p>
        </animated.div>

        {/* Vision & Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {visionTrail.map((style, index) => {
            const item = visionMissionData[index];
            const IconComponent = item.icon;
            return (
              <animated.div 
                key={item.title}
                style={style}
                className="group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative overflow-hidden rounded-2xl bg-white p-8 h-full transform transition-all duration-500 shadow-xl ${
                  hoveredCard === index ? 'scale-105 shadow-2xl -translate-y-2' : 'hover:shadow-2xl'
                }`}>
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center transform transition-all duration-500 ${
                      hoveredCard === index ? 'scale-110 rotate-6' : 'scale-100'
                    }`}>
                      <IconComponent className={`text-2xl ${
                        index === 0 ? 'text-primary-600' : 'text-secondary-600'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-neutral-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
                    {item.content}
                  </p>
                  
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
                </div>
              </animated.div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <animated.div style={headerAnimation} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text bg-gradient-to-r from-neutral-800 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Why Choose Kartar AI?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            We combine technical excellence with business acumen to deliver AI solutions that truly matter.
          </p>
        </animated.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {advantagesTrail.map((style, index) => {
            const advantage = advantages[index];
            const IconComponent = advantage.icon;
            return (
              <animated.div 
                key={advantage.title}
                style={style}
                className="group text-center"
              >
                <div className="glass p-8 rounded-2xl border border-white/20 h-full hover:scale-105 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${advantage.gradient} rounded-2xl flex items-center justify-center mx-auto transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <IconComponent className="text-2xl text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-neutral-800 mb-4 group-hover:gradient-text transition-all duration-300">
                    {advantage.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </animated.div>
            );
          })}
        </div>

        {/* Contact Information */}
        <animated.div style={contactAnimation}>
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/20 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/5 to-primary-500/5"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold gradient-text bg-gradient-to-r from-neutral-800 to-primary-600 bg-clip-text text-transparent mb-4">
                  Get in Touch
                </h3>
                <p className="text-neutral-600 text-lg">
                  Ready to transform your business with AI? Let's start the conversation.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Office Info */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaBuilding className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Office Address</h4>
                      <p className="text-neutral-600">
                        Office Number 5, RCM 11<br />
                        Anandvan Phase 1, Scheme Number 140<br />
                        Indore, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Service Areas</h4>
                      <p className="text-neutral-600">Indore, Bangalore, Mumbai, Delhi & Remote</p>
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Email</h4>
                      <a href="mailto:info@kartar.ai" className="text-primary-600 hover:text-primary-700 transition-colors duration-300 font-medium">
                        info@kartar.ai
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-1">Phone</h4>
                      <a href="tel:+919009787867" className="text-primary-600 hover:text-primary-700 transition-colors duration-300 font-medium">
                        +91 9009787867
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="text-center mt-8">
                <button 
                  onClick={() => handleCTAClick('schedule_consultation', 'about_us')}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Schedule a Consultation
                </button>
              </div>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
}

export default AboutUs;
