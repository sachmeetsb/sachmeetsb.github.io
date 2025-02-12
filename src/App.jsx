import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Offerings from './components/Offerings';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Offerings />
              <CaseStudies />
              <Testimonials />
              <ContactForm />
            </>
          } />
          <Route path="/about" element={<><AboutUs /><Team /></>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
