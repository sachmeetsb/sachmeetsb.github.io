import React, { useState } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';
import { FaChartLine, FaRocket, FaCogs, FaArrowRight, FaBriefcase, FaPhotoVideo, FaTrophy, FaIndustry } from 'react-icons/fa';
import { handleCaseStudyClick, handleCTAClick } from '../utils/analytics';

function CaseStudies() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const caseStudies = [
    {
      title: "Manufacturing Excellence",
      industry: "Manufacturing",
      challenge: "Manual quality control process with 85% accuracy",
      solution: "Implemented computer vision AI for automated quality inspection",
      results: [
        "98% inspection accuracy",
        "73% reduction in quality control time",
        "30% annual cost savings"
      ],
      icon: FaCogs,
      gradient: "from-primary-500 to-primary-700",
      bgColor: "bg-primary-50",
      iconColor: "text-primary-600"
    },
    {
      title: "AI-Powered Media Generation",
      industry: "Marketing / Architecture",
      challenge: "Self-hosted method for Multimodal Media Generation including renders, advertisement material, audio clips and 3D artifacts",
      solution: "AI-powered Generative Frameworks including Diffusion and Audio Models via PyTorch",
      results: [
        "90% reduction in processing time",
        "500% increase in output quality",
        "60% cost reduction in media production"
      ],
      icon: FaPhotoVideo,
      gradient: "from-secondary-500 to-secondary-700",
      bgColor: "bg-secondary-50",
      iconColor: "text-secondary-600"
    },
    {
      title: "Legal Process Scaling",
      industry: "Legal Technology",
      challenge: "Creating a scalable process for SMEs and individuals to send legal notices at fractional costs",
      solution: "Innovative End-to-End Solution for Filing and Sending Notices",
      results: [
        "87% reduction in charges",
        "30% time savings for lawyers",
        "2.3x revenue growth through scaling"
      ],
      icon: FaBriefcase,
      gradient: "from-accent-500 to-accent-700",
      bgColor: "bg-accent-50",
      iconColor: "text-accent-600"
    }
  ];

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 200
  });

  const cardsTrail = useTrail(caseStudies.length, {
    from: { opacity: 0, transform: 'translateY(80px) scale(0.9)' },
    to: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    config: { tension: 120, friction: 40 },
    delay: 400
  });

  const ctaAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(40px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 800
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <animated.div style={headerAnimation} className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/10">
            <FaTrophy className="text-primary-400" />
            <span className="text-white font-semibold text-sm uppercase tracking-wide">Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Transforming Businesses with
            <span className="block mt-2 gradient-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Measurable Results
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Real impact stories from businesses that revolutionized their operations through our AI solutions.
          </p>
        </animated.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {cardsTrail.map((style, index) => {
            const study = caseStudies[index];
            const IconComponent = study.icon;
            return (
              <animated.div 
                key={index}
                style={style}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative overflow-hidden rounded-2xl bg-white p-8 h-full transform transition-all duration-500 ${
                  hoveredCard === index 
                    ? 'scale-105 shadow-2xl -translate-y-4' 
                    : 'scale-100 shadow-xl'
                }`}>
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Industry badge */}
                  <div className={`inline-flex items-center space-x-1 ${study.bgColor} px-3 py-1 rounded-full mb-6`}>
                    <FaIndustry className={`text-xs ${study.iconColor}`} />
                    <span className={`text-xs font-semibold ${study.iconColor}`}>{study.industry}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 ${study.bgColor} rounded-2xl flex items-center justify-center transform transition-all duration-500 ${
                      hoveredCard === index ? 'scale-110 rotate-6' : 'scale-100'
                    }`}>
                      <IconComponent className={`text-2xl ${study.iconColor}`} />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-neutral-900 transition-colors duration-300">
                    {study.title}
                  </h3>
                  
                  {/* Challenge */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-neutral-700 mb-2 text-sm uppercase tracking-wide">Challenge</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">{study.challenge}</p>
                  </div>
                  
                  {/* Solution */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-700 mb-2 text-sm uppercase tracking-wide">Solution</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">{study.solution}</p>
                  </div>
                  
                  {/* Results */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-700 mb-3 text-sm uppercase tracking-wide">Key Results</h4>
                    <div className="space-y-2">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 ${study.gradient} bg-gradient-to-r rounded-full`}></div>
                          <span className="text-sm font-medium text-neutral-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Learn more button */}
                  <button 
                    onClick={() => handleCaseStudyClick(study.title, 'case_studies_grid')}
                    className={`group/btn w-full bg-gradient-to-r ${study.gradient} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>View Full Case Study</span>
                      <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </animated.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <animated.div style={ctaAnimation} className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Write Your Success Story?</h3>
            <p className="text-white/80 leading-relaxed">Join these forward-thinking companies and transform your business with AI.</p>
          </div>
          
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button 
              className="btn-primary text-lg px-8 py-4 group"
              onClick={() => {
                handleCTAClick('start_transformation', 'case_studies');
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center space-x-2">
                <span>Start Your Transformation</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button 
              onClick={() => handleCaseStudyClick('Download Case Studies', 'case_studies')}
              className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-neutral-800"
            >
              Download Case Studies
            </button>
          </div>
        </animated.div>
      </div>
    </section>
  );
}

export default CaseStudies;
