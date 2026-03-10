import React, { useEffect, useRef, useState } from 'react';
import './contact-page.css';
import bgImage from './assets/contact-us-bg.jpg';

const CONTACT_INTRO_TEXT = "Hello! We’re delighted by your interest in working with us. Get in touch so we can design and bring your projects to life together. Our expert team will get back to you as soon as possible and will be happy to assist you with anything you need.";

const ContactPage = () => {
    const sectionRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            // Use absolute scrollY to prevent initial gap
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        // Initialize position on mount
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Parallax translation logic matches Services/About Us
    const titleMove = scrollY * 0.3;
    const bgMove = scrollY * 0.15;

    return (
        <div className="contact-page-container" ref={sectionRef}>
            {/* Full-width Hero Banner */}
            <div className="contact-hero-section">
                <img
                    src={bgImage}
                    alt="Contact Us Background"
                    className="contact-hero-bg"
                    style={{ transform: `translate(-50%, calc(-50% + ${bgMove}px)) scale(1.4)` }}
                />
                <div className="crt-overlay"></div>
                <div className="vignette-overlay"></div>
            </div>

            {/* Intro Title with Parallax styling adapted from About.us page */}
            <div className="contact-header-container">
                <div
                    className="contact-header-text"
                    style={{ transform: `translateX(${titleMove}px)` }}
                >
                    CONTACT US
                </div>
            </div>

            {/* Content Text Section */}
            <div className="contact-intro-wrapper">
                <div className="contact-intro-content">
                    <p className="contact-intro-text">
                        {CONTACT_INTRO_TEXT}
                    </p>

                    {/* Contact Form/Info */}
                    <div className="contact-details-box">
                        <div className="contact-detail-item">
                            <span className="contact-label">EMAIL</span>
                            <a href="mailto:info@boogy.com.tr" className="contact-value link-style">info@boogy.com.tr</a>
                        </div>
                        <div className="contact-detail-item">
                            <span className="contact-label">ADDRESS</span>
                            <span className="contact-value text-center">Levent Mah. Lilyum Sokak No:4<br />Beşiktaş / İstanbul</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
