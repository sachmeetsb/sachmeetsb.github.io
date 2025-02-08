import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Offerings from './components/Offerings';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Offerings />
              <ContactForm />
            </>
          } />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
