import React, { useEffect, useRef, useState } from 'react';
import './awards-section.css';
import prizeImg from './assets/prize.png';
import stone1 from './assets/stone1.png';
import stone2 from './assets/stone2.png';

const AwardsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                setScrollY(-rect.top);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="awards-section" ref={sectionRef}>
            {/* Parallax elements */}
            <div
                className="awards-parallax-prize"
                style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)` }}
            >
                <img src={prizeImg} alt="Awards Prize" />
                {/* Sparkle points on the trophy */}
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
                <div className="sparkle sparkle-3"></div>
            </div>

            <div
                className="awards-parallax-stone stone-1"
                style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * -0.05}deg)` }}
            >
                <img src={stone1} alt="Stone decoration" />
            </div>

            <div
                className="awards-parallax-stone stone-2"
                style={{ transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.03}deg)` }}
            >
                <img src={stone2} alt="Stone decoration" />
            </div>

            <div className="awards-container">
                <div className={`awards-content ${isVisible ? 'in-view' : ''}`}>
                    <h2 className="awards-title">
                        OVER 100 INTERNATIONAL & NATIONAL AWARDS
                    </h2>
                    <p className="awards-description">
                        <span style={{ marginLeft: '40px' }}>As Boogy</span>, we have been honored with many prestigious awards for our innovative events and creative solutions. We take pride in being a brand that makes a difference in the industry by delivering unforgettable experiences.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AwardsSection;
