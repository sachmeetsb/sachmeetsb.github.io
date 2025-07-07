import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaUsers } from 'react-icons/fa';

function Testimonials() {
  const testimonials = [
    {
      name: "Yogesh Shinde",
      role: "Business Advisor",
      company: "Carimus Technologies, Boston",
      text: "The team at Kartar AI delivered exactly what we needed - a custom computer vision solution that automated our quality control process. What impressed me most was their ability to understand our specific manufacturing challenges and design an AI system that integrated seamlessly with our existing workflow. The 95% accuracy rate they achieved exceeded our expectations.",
      image: "/yogesh.jpeg",
      rating: 5,
      gradient: "from-primary-500 to-primary-700"
    },
    {
      name: "Rajat Agrawal",
      role: "Director of Innovation",
      company: "IIT Roorkee",
      text: "I've worked with many AI consulting firms, but Kartar AI stands out for their practical approach to implementation. They didn't just provide theoretical solutions - they built a working prototype, trained our team, and stayed with us through deployment. The process automation they created has saved us countless hours of manual work and improved our data accuracy by 40%.",
      image: "/rajat.jpeg",
      rating: 5,
      gradient: "from-secondary-500 to-secondary-700"
    },
    {
      name: "Priya Sharma",
      role: "Operations Manager",
      company: "TechFlow Solutions, Mumbai",
      text: "What sets Kartar AI apart is their commitment to understanding our business goals, not just implementing technology. They developed a chatbot system that reduced our customer service response time by 60% while maintaining the personal touch our clients expect. The training and support they provided made the transition smooth for our entire team.",
      image: "/testimonial3.jpg",
      rating: 5,
      gradient: "from-accent-500 to-accent-700"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideAnimation = useSpring({
    from: { transform: `translateX(${direction * 100}%)`, opacity: 0 },
    to: { transform: 'translateX(0%)', opacity: 1 },
    reset: true,
    config: { tension: 280, friction: 60 }
  });

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 200
  });

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-secondary-50">
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <animated.div style={headerAnimation} className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-2 rounded-full mb-6">
            <FaUsers className="text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wide">Client Success</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text bg-gradient-to-r from-neutral-800 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Hear from the visionary leaders who've transformed their businesses with our AI solutions.
          </p>
        </animated.div>

        {/* Testimonial Slider */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-900 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          >
            <FaChevronRight className="text-xl" />
          </button>

          {/* Testimonial Card */}
          <animated.div style={slideAnimation}>
            <div className="glass p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentTestimonial.gradient} opacity-5`}></div>
              
              {/* Quote icon */}
              <div className="absolute top-8 left-8 opacity-10">
                <FaQuoteLeft className="text-6xl text-neutral-600" />
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  {/* Avatar and Info */}
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <div className="relative inline-block">
                      <img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.name}
                        className="w-24 h-24 rounded-full object-cover shadow-xl border-4 border-white"
                      />
                      {/* Gradient border */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentTestimonial.gradient} opacity-20 blur-md -z-10`}></div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-neutral-800">{currentTestimonial.name}</h3>
                      <p className="text-neutral-600 font-medium">{currentTestimonial.role}</p>
                      <p className="text-neutral-500 text-sm">{currentTestimonial.company}</p>
                      
                      {/* Rating */}
                      <div className="flex justify-center lg:justify-start space-x-1 mt-2">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <div className="flex-1">
                    <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed italic font-medium">
                      "{currentTestimonial.text}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'w-8 h-3 bg-gradient-to-r from-primary-500 to-secondary-500' 
                    : 'w-3 h-3 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <animated.div style={headerAnimation} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '100+', label: 'Happy Clients' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '99%', label: 'Success Rate' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center group hover-scale">
              <div className="glass p-6 rounded-xl border border-white/20">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-neutral-600 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </animated.div>
      </div>
    </section>
  );
}

export default Testimonials;
