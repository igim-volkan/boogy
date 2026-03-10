import React, { useEffect, useRef, useState } from 'react';
import './services-page.css';
import bgImage from './assets/services-bg.jpg';
import ServicesGlobe from './ServicesGlobe';

const SERVICES_INTRO_TEXT = "We offer comprehensive services to turn every idea into reality. Our goal is to bring all the ideas you envision to life by creating new experiences through the technologies we develop.";

const ServicesPage = () => {
    const sectionRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const titleMove = scrollY * 0.3; // Parallax translation
    const bgMove = scrollY * 0.15; // Parallax translation for BG

    return (
        <div className="services-page-container" ref={sectionRef}>
            {/* Full-width Hero Banner */}
            <div className="services-hero-section">
                <img
                    src={bgImage}
                    alt="Services Background"
                    className="services-hero-bg"
                    style={{ transform: `translate(-50%, calc(-50% + ${bgMove}px)) scale(1.4)` }}
                />
                <div className="crt-overlay"></div>
                <div className="vignette-overlay"></div>
            </div>

            {/* Intro Title with Parallax styling adapted from About.us page */}
            <div className="services-header-container">
                <div
                    className="services-header-text"
                    style={{ transform: `translateX(${titleMove}px)` }}
                >
                    SERVICES
                </div>
            </div>

            {/* Content Text Section */}
            <div className="services-intro-wrapper">
                <p className="services-intro-text">
                    {SERVICES_INTRO_TEXT}
                </p>
            </div>

            {/* Imported Globe Component */}
            <section className="services-globe-section">
                <ServicesGlobe />
            </section>
        </div>
    );
};

export default ServicesPage;
