import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollScrubShowcase from "./components/ScrollScrubShowcase";
import LogoBar from "./components/LogoBar";
import Services from "./components/Services";
import CtaBanner from "./components/CtaBanner";
import CaseStudies from "./components/CaseStudies";
import IndustrySolutions from "./components/IndustrySolutions";
import WorkingProcess from "./components/WorkingProcess";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/ContactForm";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <div className="App relative min-h-screen bg-void">
      <Preloader />
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <ScrollScrubShowcase />
        <LogoBar />
        <Services />
        <CaseStudies />
        <IndustrySolutions />
        <CtaBanner />
        <WorkingProcess />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
