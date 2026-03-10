import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import LogoMask from './assets/logo-mask.svg';
import Footer from './Footer';
import Home from './Home';
import AboutUsSection from './AboutUsSection';
import ContactPage from './ContactPage';
import ServicesPage from './ServicesPage';

import ScrollToTop from './ScrollToTop';

function App() {
  const [logotypeOpacity, setLogotypeOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out over the first 200px of scroll
      const opacity = Math.max(1 - window.scrollY / 200, 0);
      setLogotypeOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        {/* Site Logo + Logotype */}
        <div className="logo-container">
          <img src={LogoMask} alt="Logo" className="site-logo" />
          <img
            src="/boogy-logotype.svg"
            alt="Boogy"
            className="site-logotype"
            style={{ opacity: logotypeOpacity }}
          />
        </div>

        {/* Navigation Menu */}
        <Navbar />

        {/* Futuristic Backgrounds */}
        <div className="glitch-lines"></div>
        <CustomCursor />

        {/* Global HUD Corner Markers */}
        <div className="hud-corner top-center">SYS_v2.0</div>
        <div className="hud-corner top-right">LATENCY: 12ms</div>
        <div className="hud-corner bottom-left">ACTIVE_SESSION</div>
        <div className="hud-corner bottom-right">SECURED — © 2026</div>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUsSection />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer Reveal Effect */}
        <div className="footer-reveal-spacer"></div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
