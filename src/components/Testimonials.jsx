import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Solutions",
      text: "Kartar AI has transformed our business operations with their innovative AI solutions. Their expertise in data science and machine learning is unmatched.",
      image: "/testimonial1.jpg"
    },
    {
      name: "Raj Patel",
      role: "Director of Innovation, Future Corp",
      text: "Working with Kartar AI was a game-changer for our company. Their AI implementations have significantly improved our efficiency and decision-making processes.",
      image: "/testimonial2.jpg"
    },
    {
      name: "YOU (hopefully)",
      role: "An awesome person",
      text: "Only one way to find out..",
      image: "/testimonial3.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const slideAnimation = useSpring({
    from: { transform: `translateX(${direction * 100}%)`, opacity: 0 },
    to: { transform: 'translateX(0%)', opacity: 1 },
    reset: true,
    config: { tension: 280, friction: 60 }
  });

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-16 bg-primary text-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/10 hover:bg-secondary/20 text-secondary p-2 rounded-full transform -translate-x-1/2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/10 hover:bg-secondary/20 text-secondary p-2 rounded-full transform translate-x-1/2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Card */}
          <animated.div style={slideAnimation} className="bg-secondary text-primary rounded-xl shadow-xl p-8">
            <div className="flex flex-col items-center">
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover mb-4 shadow-lg"
              />
              <blockquote className="text-lg text-center italic mb-6">
                "{testimonials[currentIndex].text}"
              </blockquote>
              <div className="text-center">
                <p className="font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-primary/70">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </animated.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-secondary' : 'bg-secondary/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
