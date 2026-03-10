import React, { useEffect, useRef, useState } from 'react';
import './about-us.css';
import bgImage from './assets/about-us-bg.jpg';
import ParallaxStones from './ParallaxStones';
import AboutStatsMarquee from './AboutStatsMarquee';
import ScrollRevealText from './ScrollRevealText';
import TeamSlider from './TeamSlider';

const ABOUT_TEXT_1 = "Our journey began in 1991 as a Group A travel agency founded under the name Boogy Tour. Our next step was transforming into an event brand that added the experiences of “I lived it and never forgot it” alongside the ideas of “I traveled and I saw.”";
const ABOUT_TEXT_2 = "As we approach our 35th anniversary, we have delivered countless successful events. We have worked with both our country’s leading brands and global giants. We have carried out projects in all 81 provinces of Türkiye and in 50 countries around the world. With every project, we grew a little more, learned a little more, and most importantly, truly enjoyed what we do alongside the brands we work with.";
const ABOUT_TEXT_3 = "We have always started every project with a fresh idea and a strong insight drawn from human nature. With every event, we have seen—and demonstrated once again—that this approach has the power to transform brand names into brand moments.";
const ABOUT_TEXT_4 = "More than 35 years of experience, millions of kilometers traveled, and countless sleepless nights have not exhausted us—they have only made us stronger. Rather than competing with others, our goal has been to contribute to the development of the event industry, of which we have become a driving force. With this vision, we established Boogy Academy in collaboration with Boğaziçi University, providing scholarship-based education to hundreds of young talents and bringing them into the industry.";
const ABOUT_TEXT_5 = "Today, together with a team of 20 dedicated experts—some of whom are graduates of Boogy Academy—we continue to pursue our goal of creating brand moments that have never been experienced before.";
const ABOUT_TEXT_6 = "We are a collective of creative minds with a boundless creative canvas. We build this creativity through a connected team that challenges conventions and pushes boundaries. Each of us plays a vital role in creating truly unique experiences.";

const AboutUsSection = () => {
    const sectionRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initialized immediately
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate transforms for the header texts
    // They move in one direction
    const aboutMove = scrollY * 0.3; // Moves right

    // Calculate parallax for the background image
    const bgMove = scrollY * 0.15;

    return (
        <section className="about-us-section" ref={sectionRef}>
            {/* Background with CRT Effect */}
            <div className="about-bg-container">
                <img
                    src={bgImage}
                    alt="About Us Background"
                    className="about-bg-image"
                    style={{ transform: `translateY(${bgMove}px) scale(1.4)` }}
                />
                <div className="crt-overlay"></div>
                <div className="vignette-overlay"></div>
            </div>

            {/* Parallax Header */}
            <div className="about-header-container">
                <div
                    className="about-header-text"
                    style={{ transform: `translateX(${aboutMove}px)` }}
                >
                    ABOUT US
                </div>
            </div>

            {/* Journey Texts Reveal */}
            <div className="about-content-wrapper">
                <ParallaxStones sectionRef={sectionRef} count={5} />

                <ScrollRevealText
                    className="about-text-container"
                    text={ABOUT_TEXT_1}
                    highlightCondition={(word) => word.includes('Boogy')}
                />

                <ScrollRevealText
                    className="about-text-container-small"
                    text={ABOUT_TEXT_2}
                />
            </div>

            {/* Scrolling Stats Section */}
            <AboutStatsMarquee />

            {/* Continuing Journey Narrative */}
            <div className="about-content-wrapper narrative-continuation">
                <ParallaxStones sectionRef={sectionRef} count={4} />

                <ScrollRevealText
                    className="about-text-container-small"
                    text={ABOUT_TEXT_3}
                />

                <ScrollRevealText
                    className="about-text-container-small"
                    text={ABOUT_TEXT_4}
                    highlightCondition={(word) => word.includes('Boogy')}
                />

                <ScrollRevealText
                    className="about-text-container-small"
                    text={ABOUT_TEXT_5}
                    highlightCondition={(word) => word.includes('Boogy')}
                />
            </div>

            {/* Our Team Section */}
            <div className="about-team-container">
                <h3 className="stats-section-title">OUR_TEAM</h3>
                <ParallaxStones sectionRef={sectionRef} count={3} />
                <ScrollRevealText
                    className="about-text-container-small"
                    text={ABOUT_TEXT_6}
                />

                <TeamSlider />
            </div>
        </section>
    );
};

export default AboutUsSection;
