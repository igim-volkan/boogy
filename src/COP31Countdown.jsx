import React, { useState, useEffect } from 'react';
import './cop31-countdown.css';

const TARGET_DATE = new Date('2026-11-09T00:00:00').getTime();

const COP31Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const now = Date.now();
            const diff = Math.max(TARGET_DATE - now, 0);

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, []);

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <div className="cop31-card">
            <div className="cop31-badge">UPCOMING EVENT</div>
            <h3 className="cop31-title">COP31</h3>
            <p className="cop31-subtitle">United Nations Climate Change Conference</p>
            <p className="cop31-location">İstanbul, Türkiye — November 2026</p>

            <div className="cop31-timer">
                <div className="timer-block">
                    <span className="timer-value">{pad(timeLeft.days)}</span>
                    <span className="timer-label">DAYS</span>
                </div>
                <span className="timer-sep">:</span>
                <div className="timer-block">
                    <span className="timer-value">{pad(timeLeft.hours)}</span>
                    <span className="timer-label">HRS</span>
                </div>
                <span className="timer-sep">:</span>
                <div className="timer-block">
                    <span className="timer-value">{pad(timeLeft.minutes)}</span>
                    <span className="timer-label">MIN</span>
                </div>
                <span className="timer-sep">:</span>
                <div className="timer-block">
                    <span className="timer-value">{pad(timeLeft.seconds)}</span>
                    <span className="timer-label">SEC</span>
                </div>
            </div>
        </div>
    );
};

export default COP31Countdown;
