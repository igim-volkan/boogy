import React, { useRef, useState } from 'react';
import './team-slider.css';
import LogoSymbol from './LogoSymbol';

const TEAM_MEMBERS = [
    { id: 1, name: "Fatih Dağıstanlı", role: "Founding Partner", image: "/team/FATIH-DAGISTANLI.jpg" },
    { id: 2, name: "Sinan Ezber", role: "Senior Event Manager", image: "/team/SINAN-EZBER.jpg" },
    { id: 3, name: "Özkan Öztürk", role: "Event Designer", image: "/team/OZKAN-OZTURK.jpg" },
    { id: 4, name: "Kaan Erhan", role: "Event Productions Director", image: "/team/KAAN-ERHAN.jpg" },
    { id: 5, name: "Zeynep Yaren Yavaş", role: "Event Manager", image: "/team/ZEYNEP-YAREN-YAVAS.jpg" },
    { id: 6, name: "Leman Lüle", role: "Accountant", image: "/team/LEMAN-LULE.jpg" },
    { id: 7, name: "Emre Tüzün", role: "Director of Public Affairs", image: "/team/EMRE-TUZUN.jpg" },
    { id: 8, name: "İrem Avcı", role: "Event Manager", image: "/team/IREM-AVCI.jpg" },
    { id: 9, name: "Reha Üner", role: "Consultant", image: "/team/REHA-UNER.jpg" },
    { id: 10, name: "Melise Çiçek", role: "Creative Director", image: "/team/MELISE-CICEK.jpg" },
    { id: 11, name: "Paris", role: "Friends", image: "/team/PARIS.jpg" },
    { id: 12, name: "Mars", role: "Friends", image: "/team/MARS.jpg" }
];

const TeamSlider = () => {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast multiplier
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    // Touch support for mobile
    const handleTouchStart = (e) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !sliderRef.current) return;
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div className="team-slider-wrapper">
            <div
                className={`team-slider-container ${isDragging ? 'dragging' : ''}`}
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {TEAM_MEMBERS.map((member) => (
                    <div key={member.id} className="team-card">
                        <div className="team-photo-placeholder">
                            {member.image ? (
                                <img src={member.image} alt={member.name} className="team-photo-img" />
                            ) : (
                                <LogoSymbol className="team-logo-bg" color="#1a1a1a" />
                            )}
                            <div className="team-glitch-overlay"></div>
                        </div>
                        <div className="team-info">
                            <h4 className="team-name">{member.name}</h4>
                            <p className="team-role">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slider-hint">
                <span>&larr;</span> DRAG TO EXPLORE <span>&rarr;</span>
            </div>
        </div>
    );
};

export default TeamSlider;
