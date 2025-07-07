import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useSpring, animated } from 'react-spring';
import { FaArrowRight, FaEnvelope, FaPhone, FaUser, FaCommentDots, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(60px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 200
  });

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(80px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 120, friction: 40 },
    delay: 400
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    const serviceId = 'service_gtn59h8';
    const templateId = 'template_2l3bp6f';
    const publicKey = 'kmCIQtGGQzq1RfE0w';

    const templateParams = {
      from_name: name,
      from_email: email,
      from_phone: phone,
      message: message,
      to_email: 'sachmeetsb@gmail.com',
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmissionResult({ success: true, message: 'Message sent successfully! We\'ll get back to you soon.' });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Email sending error:', error);
      setSubmissionResult({ success: false, message: 'Failed to send message. Please try again or contact us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 scroll-mt-20 relative overflow-hidden">
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
        <animated.div style={headerAnimation} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/10">
            <FaEnvelope className="text-primary-400" />
            <span className="text-white font-semibold text-sm uppercase tracking-wide">Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform
            <span className="block mt-2 gradient-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Your Business?
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Tell us about your vision, and let's build something extraordinary together. 
            Our AI experts are ready to turn your ideas into reality.
          </p>
        </animated.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <animated.div style={formAnimation} className="space-y-8">
              <div className="glass p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose Kartar AI?</h3>
                <div className="space-y-4">
                  {[
                    { icon: FaCheckCircle, text: "Proven track record with 50+ successful projects" },
                    { icon: FaCheckCircle, text: "Custom AI solutions tailored to your needs" },
                    { icon: FaCheckCircle, text: "End-to-end support from concept to deployment" },
                    { icon: FaCheckCircle, text: "99% client satisfaction rate" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <item.icon className="text-accent-400 flex-shrink-0" />
                      <span className="text-white/80">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass p-8 rounded-2xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">What Happens Next?</h3>
                <div className="space-y-3 text-white/80">
                  <p className="flex items-start space-x-2">
                    <span className="text-primary-400 font-bold">1.</span>
                    <span>We'll analyze your requirements within 24 hours</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <span className="text-secondary-400 font-bold">2.</span>
                    <span>Schedule a discovery call to understand your vision</span>
                  </p>
                  <p className="flex items-start space-x-2">
                    <span className="text-accent-400 font-bold">3.</span>
                    <span>Propose a customized AI solution for your business</span>
                  </p>
                </div>
              </div>
            </animated.div>

            {/* Contact Form */}
            <animated.div style={formAnimation}>
              <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-white/20 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  <em>So, what are we building?</em>
                </h3>
                
                {/* Name Field */}
                <div className="relative">
                  <label htmlFor="name" className="block text-white/90 text-sm font-semibold mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      id="name"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-white/90 text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      id="email"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <label htmlFor="phone" className="block text-white/90 text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                    <input
                      type="tel"
                      id="phone"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-white/90 text-sm font-semibold mb-2">
                    Project Details *
                  </label>
                  <div className="relative">
                    <FaCommentDots className="absolute left-4 top-4 text-white/40" />
                    <textarea
                      id="message"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                      placeholder="Tell us about your project vision, goals, and how AI can help transform your business..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary text-lg py-4 group relative overflow-hidden ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{isSubmitting ? 'Sending Message...' : 'Start Our Journey Together'}</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>

                {/* Success/Error Message */}
                {submissionResult && (
                  <div className={`p-4 rounded-xl border backdrop-blur-sm ${
                    submissionResult.success 
                      ? 'bg-green-500/20 border-green-400/30 text-green-200' 
                      : 'bg-red-500/20 border-red-400/30 text-red-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {submissionResult.success ? (
                        <FaCheckCircle className="text-green-400" />
                      ) : (
                        <FaExclamationTriangle className="text-red-400" />
                      )}
                      <span className="font-medium">{submissionResult.message}</span>
                    </div>
                  </div>
                )}
              </form>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
