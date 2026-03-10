import React, { useState, useEffect } from 'react';

const GlitchText = ({ text, isActive, isHighlighted, className, style, showVowels }) => {
    const [glitchCharIdx, setGlitchCharIdx] = useState(-1);
    const [glitchChar, setGlitchChar] = useState('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

    useEffect(() => {
        if (!isActive) {
            setGlitchCharIdx(-1);
            return;
        }

        const glitchInterval = setInterval(() => {
            // Adjust probability: highlighted text glitches more often
            const probability = isHighlighted ? 0.96 : 0.985;

            if (Math.random() > probability) {
                const idx = Math.floor(Math.random() * text.length);
                if (text[idx] !== ' ') {
                    setGlitchCharIdx(idx);
                    setGlitchChar(chars[Math.floor(Math.random() * chars.length)]);

                    const duration = Math.random() * 80 + 40;
                    setTimeout(() => setGlitchCharIdx(-1), duration);
                }
            }
        }, 300);

        return () => clearInterval(glitchInterval);
    }, [isActive, isHighlighted, text]);

    return (
        <span className={className} style={style}>
            {text.split('').map((char, charIdx) => {
                if (glitchCharIdx === charIdx) {
                    return (
                        <span key={charIdx} style={{ opacity: 0.8, filter: 'blur(1px)', color: isHighlighted ? '#aef2a3' : 'inherit' }}>
                            {glitchChar}
                        </span>
                    );
                }
                const isTargetChar = char.toUpperCase() === 'O';
                if (showVowels && isTargetChar) {
                    return <span key={charIdx} className="serif-vowel">{char}</span>;
                }
                return <span key={charIdx}>{char}</span>;
            })}
        </span>
    );
};

export default GlitchText;
