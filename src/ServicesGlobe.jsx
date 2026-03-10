import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import './services.css';
import GlitchText from './GlitchText';

const ServicesGlobe = () => {
    const globeEl = useRef();
    const audioCtxRef = useRef(null);
    const [hoveredService, setHoveredService] = useState(null);

    useEffect(() => {
        // Initialize Web Audio API for a soft, thin futuristic tick
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtxRef.current = new AudioContext();
        }
        // Auto-rotate
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 1.5;
            globeEl.current.controls().enableZoom = false; // Disable zooming
        }
    }, []);

    const playHoverSound = (serviceName) => {
        setHoveredService(serviceName);
        try {
            const audio = new Audio('/click.wav');
            audio.volume = 0.1;
            audio.play().catch(e => console.log("Audio play failed, user interaction needed:", e));
        } catch (e) {
            console.log("Audio play failed:", e);
        }
    };

    const handleMouseLeave = () => {
        setHoveredService(null);
    };

    return (
        <div className="services-globe-container">
            <div className="globe-wrapper">
                <Globe
                    ref={globeEl}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    backgroundColor="rgba(0,0,0,0)"
                    atmosphereColor="#aef2a3"
                    atmosphereDayColor="#aef2a3"
                    width={1400}
                    height={1400}
                />
            </div>

            <div className="services-list" onMouseLeave={handleMouseLeave}>
                {['SPECIAL EVENTS & LAUNCHES', 'CORPORATE EVENTS', 'MEETINGS & EXHIBITIONS', 'GLOBAL DMC', 'FESTIVALS & ROADSHOWS', 'SPORTS EVENTS'].map((service, idx) => (
                    <div
                        key={idx}
                        className="service-item-wrapper"
                        onMouseEnter={() => playHoverSound(service)}
                    >
                        <div className={`service-item ${hoveredService === service ? 'hovered' : ''}`}>
                            <GlitchText text={service} isActive={false} />
                        </div>
                        {hoveredService === service && (
                            <span className="coming-soon-badge-inline">COMING SOON</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesGlobe;
