import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// CustomsIQ demo hidden for now
// import ScrollScrubShowcase from "./components/ScrollScrubShowcase";
import LogoBar from "./components/LogoBar";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import CtaBanner from "./components/CtaBanner";
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
        {/* CustomsIQ demo hidden for now */}
        {/* <ScrollScrubShowcase /> */}
        <LogoBar />
        <Services />
        <Portfolio />
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
