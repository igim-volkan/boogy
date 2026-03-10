import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const NAV_LINKS = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'CONTACT US', path: '/contact' },
];

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            {/* Hamburger for mobile */}
            <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            </button>

            {/* Nav Links */}
            <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                {NAV_LINKS.map((link) => (
                    <li key={link.path} className="navbar-item">
                        <Link
                            to={link.path}
                            className={`navbar-link ${location.pathname === link.path ? 'current' : ''}`}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
