import React, { useEffect, useRef, useState } from 'react';
import './experience.css';

const ExperienceSection = () => {
    const [isTitleInView, setIsTitleInView] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsTitleInView(true);
                }
            },
            { threshold: 0.2 }
        );

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="experience-section">
            <div className="experience-container">
                <div className="experience-title-column">
                    <div className="title-reveal-wrapper" ref={titleRef}>
                        <h2 className={`experience-title ${isTitleInView ? 'in-view' : ''}`}>
                            <span className="title-small">IMAGES FADE, SOUNDS<br />ARE FORGOTTEN, BUT</span>
                            <span className="title-big">EXPERIENCES REMAIN</span>
                        </h2>
                    </div>
                </div>

                <div className="experience-text-column">
                    <p className="experience-description">
                        Because a truly unforgettable experience creates stories that will be told, shared, and admired for years to come. To ensure that brands stay memorable, we have followed a proven approach for many years.
                        <br /><br />
                        <span style={{ marginLeft: '40px' }}>At Boogy</span>, we design events tailored to the essence of each brand and every product. With our experienced team, who have worked together for many years, we make sure these events are unforgettable and, more importantly, contribute positively to the brand’s goals. Because we never forget one simple truth: creating an unforgettable moment leaves a far more lasting impression than even the most beautiful sound or the most striking image.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
