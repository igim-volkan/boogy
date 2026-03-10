import React, { useEffect, useRef, useState } from 'react';
import './about-stats.css';
import LogoSymbol from './LogoSymbol';

const AboutStatsMarquee = () => {
    const containerRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            // Calculate a relative scroll value from the top of the window
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initialized immediately
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll multipliers for parallax effect
    // Row 1: moves right
    // Row 2: moves left
    // Row 3: moves right
    const move1 = scrollY * 0.2;
    const move2 = scrollY * -0.25;
    const move3 = scrollY * 0.15;

    const renderRepeatedContent = (number, text) => {
        return [...Array(6)].map((_, i) => (
            <div key={i} className="stat-item">
                <LogoSymbol className="stat-logo" color="#aef2a3" />
                <span className="stat-text">
                    <span className="stat-number">{number}</span> <span className="stat-word">{text}</span>
                </span>
            </div>
        ));
    };

    return (
        <div className="about-stats-container" ref={containerRef}>
            <h3 className="stats-section-title">IN_NUMBERS</h3>
            <div className="stat-row">
                <div
                    className="stat-track"
                    style={{ transform: `translateX(calc(-10vw + ${move1}px))` }}
                >
                    {renderRepeatedContent("35", "YEARS")}
                </div>
            </div>
            <div className="stat-row">
                <div
                    className="stat-track"
                    style={{ transform: `translateX(calc(-30vw + ${move2}px))` }}
                >
                    {renderRepeatedContent("81", "CITIES")}
                </div>
            </div>
            <div className="stat-row">
                <div
                    className="stat-track"
                    style={{ transform: `translateX(calc(-15vw + ${move3}px))` }}
                >
                    {renderRepeatedContent("50", "COUNTRIES")}
                </div>
            </div>
        </div>
    );
};

export default AboutStatsMarquee;
