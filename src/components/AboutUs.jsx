import React from 'react';
import { useSpring, animated } from 'react-spring';

function AboutUs() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="py-12 bg-primary text-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Company Information</h3>
          <p>
            Kartar AI
            Email: sbaiindia@proton.me
            Address: Office Number 5, RCM 11, Anandvan Phase 1, Scheme Number 140, Indore
            Phone: +91 9009787867
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src="/ceo-image.jpg" alt="CEO" className="rounded-lg shadow-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sachmeet Singh Bhatia</h3>
            <p>Data Science Consultant | MBA, IIT Roorkee 2023, summa-cum-lawde | Indore / Bangalore
            </p>
          </div>
          <div>
            <img src="/cto-image.jpg" alt="CTO" className="rounded-lg shadow-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Yashwardhan Sable</h3>
            <p>B. Tech - Engineering Physiscs | Upcoming grad at Berkley | Indore / Bhubneshwar</p>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default AboutUs;
