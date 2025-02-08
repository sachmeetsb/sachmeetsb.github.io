import React from 'react';
import { useSpring, animated } from 'react-spring';

function Header() {
  const fadeIn = useSpring({
    from: { opacity: 0, marginTop: -50 },
    to: { opacity: 1, marginTop: 0 },
    config: { duration: 1000 },
  });

  return (
    <header id="header" className="bg-gray-100 py-20 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <animated.h1 style={fadeIn} className="text-5xl font-bold mb-4 text-secondary italic">
          Time for Creation
        </animated.h1>
        <animated.p style={fadeIn} className="text-xl text-primary">
          We help Indian businesses start, grow and succeed.
        </animated.p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
        <img src="https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?q=80&amp;w=2070&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Abstract business background" className="hidden" />
      </div>
    </header>
  );
}

export default Header;
