import React from 'react';
import { useSpring, animated } from 'react-spring';

function AboutUs() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="py-16 bg-primary text-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Transforming Businesses Through AI Innovation</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-lg leading-relaxed">
              At Kartar AI, we envision a future where artificial intelligence empowers businesses to reach their full potential. 
              We're not just another AI company – we're your strategic partner in digital transformation, committed to delivering 
              solutions that drive real business value.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Our Expertise</h3>
            <p className="text-lg leading-relaxed">
              With deep expertise in machine learning, natural language processing, and computer vision, we specialize in 
              developing custom AI solutions that address your unique business challenges. Our team of experts combines 
              technical excellence with industry knowledge to deliver results that matter.
            </p>
          </div>
        </div>

        <div className="bg-secondary/10 p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Why Choose Kartar AI?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-3">Tailored Solutions</h4>
              <p>We don't believe in one-size-fits-all. Every solution is customized to your specific needs and objectives.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-3">Proven Results</h4>
              <p>Our track record speaks for itself, with successful implementations across various industries and use cases.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-3">Expert Team</h4>
              <p>Work with seasoned AI professionals who understand both technology and business requirements.</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold mb-6">Ready to Transform Your Business?</h3>
          <p className="text-lg mb-8">
            Let's discuss how we can help you leverage AI to achieve your business goals. Our team is ready to understand 
            your challenges and propose innovative solutions.
          </p>
        </div>

        <div className="bg-secondary/10 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center">Get in Touch</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-semibold">Kartar AI</p>
              <p>Office Number 5, RCM 11</p>
              <p>Anandvan Phase 1, Scheme Number 140</p>
              <p>Indore</p>
            </div>
            <div className="space-y-4">
              <p><span className="font-semibold">Email:</span> <a href="mailto:info@kartar.ai" className="hover:text-gray-300 underline">info@kartar.ai</a></p>
              <p><span className="font-semibold">Phone:</span> <a href="tel:+919009787867" className="hover:text-gray-300">+91 9009787867</a></p>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default AboutUs;
