import React, { useEffect, useRef, useState } from 'react';
import GlitchText from './GlitchText';

const ScrollRevealText = ({ text, className, highlightCondition = () => false }) => {
    const textRef = useRef(null);
    const [activeWordsCount, setActiveWordsCount] = useState(0);
    const words = text.split(' ');

    useEffect(() => {
        const handleScroll = () => {
            if (!textRef.current) return;
            const rect = textRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Adjust start and end points of the reveal animation
            // Start revealing slightly below center, finish near top
            const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight * 0.7), 0), 1);
            setActiveWordsCount(Math.ceil(progress * words.length));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initialized immediately
        return () => window.removeEventListener('scroll', handleScroll);
    }, [words.length]);

    return (
        <div className={className} ref={textRef}>
            {words.map((word, i) => (
                <span key={i} className={`word ${i < activeWordsCount ? 'active' : ''}`}>
                    <GlitchText
                        text={word}
                        isActive={false}
                        isHighlighted={highlightCondition(word)}
                    />
                </span>
            ))}
        </div>
    );
};

export default ScrollRevealText;
