import React, { useEffect, useState, useRef } from 'react';
import './parallax.css';

import stone1 from './assets/stone1.png';
import stone2 from './assets/stone2.png';
import stone3 from './assets/stone3.png';
import stone4 from './assets/stone4.png';
import stone5 from './assets/stone5.png';

const STONES = [stone1, stone2, stone3, stone4, stone5];

const ParallaxStones = ({ count = 5, sectionRef }) => {
    const [stones, setStones] = useState([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Generate random initial positions and properties
        const newStones = Array.from({ length: count }).map((_, i) => ({
            id: i,
            img: STONES[i % STONES.length],
            top: Math.random() * 100, // percentage within container
            left: Math.random() * 90 + 5, // percentage, keep away from edges
            size: Math.random() * 100 + 50, // 50px to 150px
            speed: Math.random() * 0.2 + 0.05,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            initialRotation: Math.random() * 360,
            zIndex: Math.random() > 0.5 ? 3 : 1, // some in front, some behind text
            blur: Math.random() * 2 // slight depth of field
        }));
        setStones(newStones);

        const handleScroll = () => {
            if (sectionRef && sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                // We only care about scroll relative to the section
                // When rect.top is 0, we are at the start of the section
                setScrollY(-rect.top);
            } else {
                setScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [count, sectionRef]);

    return (
        <div className="parallax-stones-container">
            {stones.map((stone) => {
                const translateY = scrollY * stone.speed;
                const rotate = stone.initialRotation + (scrollY * stone.rotationSpeed);

                return (
                    <div
                        key={stone.id}
                        className="parallax-stone-wrapper"
                        style={{
                            top: `${stone.top}%`,
                            left: `${stone.left}%`,
                            transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
                            zIndex: stone.zIndex,
                        }}
                    >
                        <img
                            src={stone.img}
                            alt="floating stone"
                            className="parallax-stone"
                            style={{
                                width: `${stone.size}px`,
                                filter: `blur(${stone.blur}px) drop-shadow(0 10px 30px rgba(0,0,0,0.6))`,
                                opacity: 0.8
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ParallaxStones;
