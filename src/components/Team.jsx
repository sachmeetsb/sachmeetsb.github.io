import React, { useState } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';
import { FaUsers, FaMapMarkerAlt, FaGraduationCap, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { handleCTAClick } from '../utils/analytics';

function Team() {
  const [hoveredMember, setHoveredMember] = useState(null);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 200
  });

  const teamMembers = [
    {
      name: 'Sachmeet Singh Bhatia',
      role: 'CEO & Co-Founder',
      description: 'Data Science Consultant | MBA, IIT Roorkee 2023',
      location: 'Indore / Bangalore',
      image: '/sachmeet.jpg',
      gradient: 'from-primary-500 to-primary-700',
      bgColor: 'bg-primary-50',
      expertise: ['Data Science', 'Business Strategy', 'AI Consulting'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Yashwardhan Sable',
      role: 'CTO & Co-Founder',
      description: 'B. Tech - Physics IIT BHU | Published in Royal Astronomical Society',
      location: 'Indore / Varanasi',
      image: '/yash.jpg',
      gradient: 'from-secondary-500 to-secondary-700',
      bgColor: 'bg-secondary-50',
      expertise: ['Machine Learning', 'Computer Vision', 'Research'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];

  const membersTrail = useTrail(teamMembers.length, {
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <animated.div style={headerAnimation} className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/10">
            <FaUsers className="text-primary-400" />
            <span className="text-white font-semibold text-sm uppercase tracking-wide">Meet the Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            The Minds Behind
            <span className="block mt-2 gradient-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              AI Innovation
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Meet the passionate professionals who combine technical expertise with business acumen to deliver transformative AI solutions.
          </p>
        </animated.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
          {membersTrail.map((style, index) => {
            const member = teamMembers[index];
            return (
              <animated.div 
                key={member.name}
                style={style}
                className="group"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className={`relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-sm p-8 h-full transform transition-all duration-500 shadow-2xl ${
                  hoveredMember === index ? 'scale-105 -translate-y-4' : 'hover:shadow-3xl'
                }`}>
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="relative mx-auto w-32 h-32 group-hover:scale-110 transition-transform duration-500">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover shadow-xl border-4 border-white"
                      />
                      {/* Gradient ring */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${member.gradient} opacity-20 blur-md -z-10 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className={`px-3 py-1 ${member.bgColor} rounded-full text-xs font-semibold ${
                        index === 0 ? 'text-primary-700' : 'text-secondary-700'
                      }`}>
                        Available
                      </div>
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-2 group-hover:gradient-text transition-all duration-300">
                      {member.name}
                    </h3>
                    <p className={`font-semibold mb-2 ${
                      index === 0 ? 'text-primary-600' : 'text-secondary-600'
                    }`}>
                      {member.role}
                    </p>
                    
                    {/* Education/Background */}
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <FaGraduationCap className="text-neutral-500" />
                      <p className="text-neutral-600 text-sm">{member.description}</p>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <FaMapMarkerAlt className="text-neutral-500" />
                      <p className="text-neutral-600 text-sm">{member.location}</p>
                    </div>
                  </div>
                  
                  {/* Expertise Tags */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3 text-center">Expertise</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className={`px-3 py-1 ${member.bgColor} rounded-full text-xs font-medium ${
                            index === 0 ? 'text-primary-700' : 'text-secondary-700'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {[
                      { icon: FaLinkedin, href: member.social.linkedin, label: 'LinkedIn' },
                      { icon: FaTwitter, href: member.social.twitter, label: 'Twitter' },
                      { icon: FaGithub, href: member.social.github, label: 'GitHub' }
                    ].map((social, socialIndex) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className={`w-10 h-10 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                        aria-label={social.label}
                      >
                        <social.icon className="text-sm" />
                      </a>
                    ))}
                  </div>
                  
                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
                </div>
              </animated.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <animated.div style={ctaAnimation} className="text-center mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '5+', label: 'Years Combined Experience' },
              { number: '50+', label: 'Projects Delivered' },
              { number: '2', label: 'IIT Alumni' },
              { number: '100%', label: 'Dedicated to Excellence' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center group hover-scale">
                <div className="glass p-6 rounded-xl border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </animated.div>

        {/* CTA Section */}
        <animated.div style={ctaAnimation} className="text-center">
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Work with Our Team?
            </h3>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Let's discuss how our expertise can help transform your business with cutting-edge AI solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleCTAClick('meet_the_team', 'team_section')}
                className="btn-primary text-lg px-8 py-4"
              >
                Schedule a Meeting
              </button>
              
              <button 
                onClick={() => {
                  handleCTAClick('learn_more_team', 'team_section');
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-neutral-800"
              >
                Learn More
              </button>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
}

export default Team;
