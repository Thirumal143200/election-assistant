import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, Clock, ShieldCheck, Users } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const [daysLeft, setDaysLeft] = useState(42);

  useEffect(() => {
    // Just a fun mock effect to simulate a dynamic countdown
    const timer = setInterval(() => {
      setDaysLeft(prev => prev > 0 ? prev : 42);
    }, 86400000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-section">
      {/* Decorative floating background elements */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="hero-content animate-fade-in-up">
        <div className="badge glass animate-float">
          <Sparkles size={16} className="text-accent" />
          <span>Your Guide to Democracy</span>
        </div>

        <h1 className="hero-title">
          Master the <span className="text-gradient shimmer-text">Election Process</span>
        </h1>
        
        <p className="hero-subtitle">
          Interactive timelines, flashcards, and a smart AI assistant to help you understand how your vote shapes the future.
        </p>

        <div className="hero-stats">
          <div className="stat-card glass animate-fade-in" style={{animationDelay: '0.1s'}}>
            <Clock className="stat-icon text-accent" />
            <div className="stat-value">{daysLeft}</div>
            <div className="stat-label">Days to Election</div>
          </div>
          <div className="stat-card glass animate-fade-in" style={{animationDelay: '0.2s'}}>
            <Users className="stat-icon text-success" />
            <div className="stat-value">900M+</div>
            <div className="stat-label">Eligible Voters</div>
          </div>
          <div className="stat-card glass animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Activity className="stat-icon text-warning" />
            <div className="stat-value">7</div>
            <div className="stat-label">Polling Phases</div>
          </div>
          <div className="stat-card glass animate-fade-in" style={{animationDelay: '0.4s'}}>
            <ShieldCheck className="stat-icon text-info" />
            <div className="stat-value">100%</div>
            <div className="stat-label">Secure EVMs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
