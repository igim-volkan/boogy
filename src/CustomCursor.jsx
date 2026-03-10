import React, { useEffect, useState, useRef } from 'react';
import './cursor.css';

const CustomCursor = () => {
    const mainCursor = useRef(null);
    const secondaryCursor = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setPosition({ x: clientX, y: clientY });
            setCoords({ x: Math.round(clientX), y: Math.round(clientY) });

            if (mainCursor.current) {
                mainCursor.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                window.getComputedStyle(target).cursor === 'pointer' ||
                window.getComputedStyle(target).cursor === 'crosshair' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON';
            setIsPointer(isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Secondary cursor with lag/inertia
    useEffect(() => {
        let currentX = 0;
        let currentY = 0;
        let targetX = position.x;
        let targetY = position.y;

        const animate = () => {
            targetX = position.x;
            targetY = position.y;

            // Linear interpolation for smooth lag
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;

            if (secondaryCursor.current) {
                secondaryCursor.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            }
            requestAnimationFrame(animate);
        };
        const animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, [position]);

    return (
        <div className={`cursor-manager ${isPointer ? 'is-pointer' : ''}`}>
            {/* Direct precision dot */}
            <div className="main-cursor" ref={mainCursor}>
                <div className="cursor-dot"></div>
            </div>

            {/* Lagging HUD element */}
            <div className="secondary-cursor" ref={secondaryCursor}>
                <div className="cursor-ring"></div>
                <div className="cursor-crosshair-h"></div>
                <div className="cursor-crosshair-v"></div>
                <div className="cursor-coords">
                    {coords.x}, {coords.y}
                </div>
            </div>
        </div>
    );
};

export default CustomCursor;
