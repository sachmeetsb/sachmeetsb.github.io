import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useSpring, animated } from 'react-spring';
import { FaArrowRight } from 'react-icons/fa';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    const serviceId = 'service_gtn59h8'; // Replace with your EmailJS service ID
    const templateId = 'template_2l3bp6f'; // Replace with your EmailJS template ID
    const publicKey = 'kmCIQtGGQzq1RfE0w'; // Replace with your EmailJS public key

    const templateParams = {
      from_name: name,
      from_email: email,
      from_phone: phone,
      message: message,
      to_email: 'sachmeetsb@gmail.com', // Replace with your actual email
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmissionResult({ success: true, message: 'Email sent successfully!' });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Email sending error:', error);
      setSubmissionResult({ success: false, message: 'Failed to send email. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-primary">
      <div className="container mx-auto">
        <animated.h2 style={fadeIn} className="text-3xl font-bold text-center mb-8 text-secondary">So, what are we building?</animated.h2>
        <animated.form onSubmit={handleSubmit} style={fadeIn} className="max-w-lg mx-auto bg-black rounded-lg shadow-md p-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-secondary text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-secondary text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-secondary text-sm font-bold mb-2">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-secondary text-sm font-bold mb-2">Share your project's context and vision:</label>
            <textarea
              id="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isSubmitting}
            >
              SUBMIT
              <FaArrowRight className="ml-2" />
            </button>
          </div>
          {submissionResult && (
            <div className={`mt-4 p-3 rounded ${submissionResult.success ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {submissionResult.message}
            </div>
          )}
        </animated.form>
      </div>
    </section>
  );
}

export default ContactForm;
