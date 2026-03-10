import React, { useEffect, useRef, useState } from 'react';
import GlitchText from './GlitchText';
import ClientMarquee from './ClientMarquee';
import ParallaxStones from './ParallaxStones';
import ServicesGlobe from './ServicesGlobe';
import NightSkyText from './NightSkyText';
import ExperienceSection from './ExperienceSection';
import COP31Countdown from './COP31Countdown';

const TEXT_CONTENT = "On the journey we began in 1991, we discovered how ideas can transform experiences. Since then, we have grown by delivering countless projects around the world. Yet we have always had one single purpose: to add a touch of magic to the world.";

const Home = () => {
    const words = TEXT_CONTENT.split(' ');
    const textSectionRef = useRef(null);
    const [activeWordsCount, setActiveWordsCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!textSectionRef.current) return;
            const rect = textSectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = windowHeight;
            const end = -rect.height;
            const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

            const totalWords = words.length;
            const adjustedProgress = Math.max(0, (progress - 0.2) / 0.6);
            const count = Math.min(Math.floor(adjustedProgress * totalWords), totalWords);

            setActiveWordsCount(count);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init
        return () => window.removeEventListener('scroll', handleScroll);
    }, [words.length]);

    return (
        <div className="home-page">
            {/* Hero Video Section */}
            <section className="hero-section">
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/main-video.mp4"
                />
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title brutal-headline">
                        <span className="brutal-line-normal">WE ARE HERE TO DELIVER</span>
                        <br />
                        <span className="brutal-line-outline">UNIQUE</span>
                        <span className="brutal-line-solid"> EXPERIENCES</span>
                    </h1>
                </div>

                {/* COP31 Countdown Card */}
                <COP31Countdown />
            </section>

            {/* Scroll Triggered Text Section */}
            <section className="scroll-text-section" ref={textSectionRef}>
                <ParallaxStones sectionRef={textSectionRef} count={6} />
                <div className="scroll-text-container">
                    {words.map((word, i) => (
                        <span key={i} className={`word ${i < activeWordsCount ? 'active' : ''}`}>
                            <GlitchText
                                text={word}
                                isActive={false}
                                isHighlighted={false}
                            />
                        </span>
                    ))}
                </div>
            </section>

            {/* Services Section with Globe */}
            <section className="services-section">
                <ServicesGlobe />
            </section>

            {/* Night Sky Text Section */}
            <NightSkyText />

            {/* Client Logo Marquee inserted between sections */}
            <ClientMarquee />

            {/* Experience Section with Sticky Logos at the end */}
            <ExperienceSection />
        </div>
    );
};

export default Home;
