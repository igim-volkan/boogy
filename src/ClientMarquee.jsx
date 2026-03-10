import React from 'react';
import './marquee.css';

const CLIENT_LOGOS = [
    { id: 'adidas', url: '/clients/client-adidas.svg' },
    { id: 'akbank', url: '/clients/client-akbank.svg' },
    { id: 'denizbank', url: '/clients/client-denizbank.svg' },
    { id: 'garanti', url: '/clients/client-garanti.svg' },
    { id: 'goodyear', url: '/clients/client-goodyear.svg' },
    { id: 'mercedes', url: '/clients/client-mercedes.svg' },
    { id: 'mey', url: '/clients/client-mey.svg' },
    { id: 'motor', url: '/clients/client-motor.svg' },
    { id: 'nestle', url: '/clients/client-nestle.svg' },
    { id: 'nike', url: '/clients/client-nike.svg' },
    { id: 'sabanci', url: '/clients/client-sabanci.svg' },
    { id: 'tff', url: '/clients/client-tff.svg' },
    { id: 'tobb', url: '/clients/client-tobb.svg' },
    { id: 'ulker', url: '/clients/client-ulker.svg' },
    { id: 'yildiz', url: '/clients/client-yildiz.svg' },
];

const ClientMarquee = () => {
    // Duplicate for seamless loop
    const doubledLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

    return (
        <section className="client-marquee-section">
            <div className="marquee-label">OUR_CLIENTS</div>
            <div className="marquee-outer">
                <div className="marquee-inner">
                    {doubledLogos.map((logo, idx) => (
                        <div key={`${logo.id}-${idx}`} className="logo-item">
                            <img src={logo.url} alt={logo.id} className="marquee-logo-img" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientMarquee;
