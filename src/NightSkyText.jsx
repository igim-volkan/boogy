import React, { useEffect, useRef, useState } from 'react';
import './nightsky.css';
import { Link } from 'react-router-dom';

const TEXT_CONTENT = "WE BROUGHT TOGETHER THE MOST TALENTED PROFESSIONALS TO TURN IDEAS THAT PUSH THE LIMITS OF IMAGINATION INTO REALITY. BY COMBINING CREATIVITY WITH EXCELLENCE, WE ARE HERE TO DELIVER UNIQUE EXPERIENCES AT EVERY EVENT.";
import GlitchText from './GlitchText';
import ParallaxStones from './ParallaxStones';

const NightSkyText = () => {
    const canvasRef = useRef(null);
    const textSectionRef = useRef(null);
    const audioCtxRef = useRef(null);
    const words = TEXT_CONTENT.split(' ');
    const [activeWordsCount, setActiveWordsCount] = useState(0);

    const playHoverSound = () => {
        try {
            const audio = new Audio('/click.wav');
            audio.volume = 0.1;
            audio.play().catch(e => console.log("Audio play failed, user interaction needed:", e));
        } catch (e) {
            console.log("Audio play failed:", e);
        }
    };

    // Canvas Logic for Star Trail
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let particles = [];
        let mouse = { x: null, y: null };
        let timeOffset = 0; // Global time for twinkle

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseSize = Math.random() * 1.5 + 0.3;
                this.size = this.baseSize;
                this.baseOpacity = Math.random() * 0.12 + 0.05;
                this.opacity = this.baseOpacity;

                // Twinkle/Shimmer properties
                this.twinkleSpeed = Math.random() * 0.05 + 0.01;
                this.twinkleOffset = Math.random() * Math.PI * 2;
                this.shimmerChance = Math.random();

                // Very slight drift/movement for "fluidity"
                this.vx = (Math.random() - 0.5) * 0.08;
                this.vy = (Math.random() - 0.5) * 0.08;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                // Apply slight drift
                this.x += this.vx;
                this.y += this.vy;

                // Independent pulse
                const twinkleVal = (Math.sin(timeOffset * this.twinkleSpeed + this.twinkleOffset) + 1) / 2;

                // Periodic random "shimmer" (quick flash/blink)
                let shimmerMod = 0;
                if (this.shimmerChance > 0.8 && Math.random() > 0.985) {
                    shimmerMod = Math.random() * 0.5;
                }

                const targetBaseOpacity = this.baseOpacity + (twinkleVal * 0.25) + shimmerMod;

                // Mouse interaction
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDistance = 200;

                    if (distance < maxDistance) {
                        let intensity = 1 - (distance / maxDistance);

                        // Add some jitter/shimmer specifically when mouse is nearby
                        const noise = (Math.random() - 0.5) * 0.3 * intensity;

                        this.opacity = targetBaseOpacity + (intensity * 1.0) + noise;
                        this.size = this.baseSize + (intensity * 2.8);
                    } else {
                        // Return to base state slowly
                        this.opacity -= 0.04;
                        if (this.opacity < targetBaseOpacity) this.opacity = targetBaseOpacity;

                        this.size -= 0.2;
                        if (this.size < this.baseSize) this.size = this.baseSize;
                    }
                } else {
                    // Decay back to base moving target when mouse leaves
                    this.opacity -= 0.04;
                    if (this.opacity < targetBaseOpacity) this.opacity = targetBaseOpacity;

                    this.size -= 0.2;
                    if (this.size < this.baseSize) this.size = this.baseSize;
                }

                // Wraparound check for drift
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 2000;
            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const resizeCanvas = () => {
            if (textSectionRef.current) {
                canvas.width = textSectionRef.current.clientWidth;
                canvas.height = textSectionRef.current.clientHeight;
                initParticles();
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            timeOffset++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Scroll Text Logic
    useEffect(() => {
        const handleScroll = () => {
            if (!textSectionRef.current) return;

            const rect = textSectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // start: reveal begins as soon as the section top enters the bottom
            const start = windowHeight * 1.0;
            // end: reveal finishes when section is halfway off the top (putting text at viewport top)
            const end = -rect.height * 0.5;

            const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

            const totalWords = words.length;
            // Progress is mapped directly to word count
            const count = Math.min(Math.floor(progress * totalWords), totalWords);

            setActiveWordsCount(count);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init
        return () => window.removeEventListener('scroll', handleScroll);
    }, [words.length]);

    const VOWELS = ['A', 'E', 'I', 'O', 'U'];



    return (
        <section className="nightsky-section" ref={textSectionRef}>
            <canvas ref={canvasRef} className="nightsky-canvas" />
            <ParallaxStones sectionRef={textSectionRef} count={8} />

            <div className="nightsky-text-container">
                {words.map((word, i) => {
                    const isHighlighted = i >= 20 && i <= 22;
                    return (
                        <GlitchText
                            key={i}
                            text={word}
                            isActive={false}
                            isHighlighted={isHighlighted}
                            showVowels={true}
                            className={`brutalist-word ${i < activeWordsCount ? 'active' : ''}`}
                            style={isHighlighted && i < activeWordsCount ? { color: '#aef2a3', textShadow: '0 0 20px rgba(174, 242, 163, 0.4)' } : {}}
                        />
                    );
                })}
            </div>

            <div className="details-btn-wrapper">
                <Link to="/about" className="details-btn" onMouseEnter={playHoverSound}>
                    <span className="btn-corner top-left"></span>
                    <span className="btn-corner top-right"></span>
                    <span className="btn-corner bottom-left"></span>
                    <span className="btn-corner bottom-right"></span>
                    <span className="details-btn-text">DETAILS</span>
                </Link>
            </div>
        </section>
    );
};

export default NightSkyText;
