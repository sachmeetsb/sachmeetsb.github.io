import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaArrowLeft, FaTools, FaRocket, FaCalendarAlt } from 'react-icons/fa';
import { handleCTAClick } from '../utils/analytics';

function CaseStudyWIP() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 200
  });

  const floatAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: { transform: 'translateY(-20px)' },
    config: { duration: 2000 },
    loop: { reverse: true }
  });

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleScheduleCall = () => {
    handleCTAClick('schedule_call', 'wip_page');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-400/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <animated.div style={fadeIn}>
            {/* Floating Icon */}
            <animated.div style={floatAnimation} className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <FaTools className="text-4xl text-white" />
              </div>
            </animated.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Case Study Coming Soon
            </h1>
            
            {/* Gradient Text */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 gradient-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              We're Crafting Something Amazing
            </h2>

            {/* Description */}
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our detailed case studies are currently being prepared to showcase the incredible transformations 
              we've delivered for our clients. Each study will include in-depth analysis, metrics, and insights 
              from real AI implementations.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: FaRocket,
                  title: "Real Results",
                  description: "Actual performance metrics and ROI data from client projects"
                },
                {
                  icon: FaTools,
                  title: "Technical Deep Dive",
                  description: "Detailed breakdowns of AI solutions and implementation strategies"
                },
                {
                  icon: FaCalendarAlt,
                  title: "Timeline & Process",
                  description: "Step-by-step journey from concept to successful deployment"
                }
              ].map((feature, index) => (
                <div key={index} className="glass p-6 rounded-xl border border-white/20">
                  <feature.icon className="text-2xl text-primary-400 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={handleScheduleCall}
                className="btn-primary text-lg px-8 py-4 group"
              >
                <span className="flex items-center space-x-2">
                  <span>Discuss Your Project</span>
                  <FaCalendarAlt className="group-hover:scale-110 transition-transform duration-300" />
                </span>
              </button>
              
              <button 
                onClick={handleBackToHome}
                className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-neutral-800 group"
              >
                <span className="flex items-center space-x-2">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to Home</span>
                </span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="text-white/60">
              <p className="mb-2">Want to know more about our previous work?</p>
              <p className="text-sm">
                Schedule a call and we'll share detailed case studies during our conversation.
              </p>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyWIP;
