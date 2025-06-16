import React from 'react';
import { useSpring, animated } from 'react-spring';

function Team() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const teamMembers = [
    {
      name: 'Sachmeet Singh Bhatia',
      role: 'CEO & Co-Founder',
      description: 'Data Science Consultant | MBA, IIT Roorkee 2023',
      location: 'Indore / Bangalore',
      image: '/sachmeet.jpg'
    },
    {
      name: 'Yashwardhan Sable',
      role: 'CTO & Co-Founder',
      description: 'B. Tech - Physics IIT BHU | Published in Royal Astronomical Society',
      location: 'Indore / Varanasi',
      image: '/yash.jpg'
    }
  ];

  return (
    <animated.div style={fadeIn} className="py-12 bg-black/90 text-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-primary text-secondary rounded-lg shadow-xl p-6 transform transition-transform hover:scale-105">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
              <p className="text-lg font-medium text-center text-secondary/80 mb-2">{member.role}</p>
              <p className="text-center mb-2">{member.description}</p>
              <p className="text-sm text-center text-secondary/70">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </animated.div>
  );
}

export default Team;
