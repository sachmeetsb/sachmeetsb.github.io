import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaChartLine, FaBrain, FaHandHoldingUsd } from 'react-icons/fa';

function Offerings() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <section id="offerings" className="py-12 bg-primary">
      <div className="container mx-auto text-center">
        <animated.h2 style={fadeIn} className="text-3xl font-bold mb-8 text-secondary">Our Offerings</animated.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <animated.div style={fadeIn} className="p-6 bg-black text-secondary rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <FaChartLine className="text-4xl text-secondary mb-4 mx-auto" alt="Chart Line Icon" />
            <h3 className="text-xl font-semibold mb-2">Adirohan</h3>
            <p className="text-secondary">We help you create your startup for just 1 per cent equity. Start your business with minimal initial investment.</p>
          </animated.div>
          <animated.div style={fadeIn} className="p-6 bg-black text-secondary rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <FaBrain className="text-4xl text-secondary mb-4 mx-auto" alt="Brain Icon" />
            <h3 className="text-xl font-semibold mb-2">Adhyayan</h3>
            <p className="text-secondary">We understand your existing processes and streamline your workflows with AI, reducing manual work. Improve efficiency with multi-modal AI-driven solutions.</p>
          </animated.div>
          <animated.div style={fadeIn} className="p-6 bg-black text-secondary rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <FaHandHoldingUsd className="text-4xl text-secondary mb-4 mx-auto" alt="Hand Holding USD Icon" />
            <h3 className="text-xl font-semibold mb-2">Ashray</h3>
            <p className="text-secondary">Seed funding for the new self-dependent India. Get the financial support you need to launch your innovative venture.</p>
          </animated.div>
        </div>
      </div>
    </section>
  );
}

export default Offerings;
