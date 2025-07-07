import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Offerings from "./components/Offerings";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import CaseStudies from "./components/CaseStudies";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App relative min-h-screen">
        <Navbar />

        {/* Main content with proper spacing for fixed navbar */}
        <main className="relative">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <div className="bg-gradient-to-b from-neutral-50 to-white">
                    <Offerings />
                    <CaseStudies />
                    <Testimonials />
                    <ContactForm />
                  </div>
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <div className="pt-20 bg-gradient-to-b from-primary-50 to-white min-h-screen">
                    <AboutUs />
                    <Team />
                  </div>
                </>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
