import React from 'react';
import { Icon } from '../components/Icons';
import { User } from '../types';

interface LandingViewProps {
  onNavigate: (route: string) => void;
  currentUser?: User | null;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate, currentUser }) => {
  return (
    <div>
      <div className="landing-hero">
        <div className="circle-blur-1" />
        <div className="circle-blur-2" />

        <nav className="landing-nav">
          <div className="landing-logo">
            <div className="brand-icon-box" style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.25)' }}>
              <Icon name="activity" size={22} />
            </div>
            <span>CampusPulse</span>
          </div>

          <div className="landing-nav-links">
            <a href="#" className="landing-nav-link" onClick={(e) => { e.preventDefault(); onNavigate('events'); }}>
              Explore Events
            </a>
            <a href="#" className="landing-nav-link" onClick={(e) => { e.preventDefault(); onNavigate('mobile'); }}>
              Mobile App
            </a>
            {currentUser ? (
              <a href="#" className="landing-nav-link" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
                Go to Dashboard
              </a>
            ) : (
              <a href="#" className="landing-nav-link" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>
                Sign In
              </a>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate(currentUser ? 'dashboard' : 'login')}
              type="button"
            >
              {currentUser ? 'Open App' : 'Get Started'}
            </button>
          </div>
        </nav>

        <div className="hero-main-content">
          <div className="hero-pill-badge">
            <Icon name="sparkles" size={16} />
            <span>Campus Event Management 2.0</span>
          </div>

          <h1 className="hero-heading">
            Discover, Register & Track <br /> All College Events
          </h1>

          <p className="hero-subheading">
            Live schedule updates, instant seat reservations, digital admission QR passes, and automated schedule alert tracking built for students and faculty.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn btn-ticket-hero"
              onClick={() => onNavigate('dashboard')}
              type="button"
            >
              <Icon name="activity" size={20} />
              <span>Launch Dashboard</span>
            </button>

            <button
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
              }}
              onClick={() => onNavigate('events')}
              type="button"
            >
              <Icon name="search" size={20} />
              <span>Browse Catalog</span>
            </button>
          </div>

          <div className="hero-features-preview">
            <div className="hero-feature-card">
              <div className="hero-feat-icon">
                <Icon name="clock" size={24} />
              </div>
              <div className="hero-feat-title">Real-Time Sync</div>
              <div className="hero-feat-desc">Immediate alerts when workshops or hackathons are postponed or relocated.</div>
            </div>

            <div className="hero-feature-card">
              <div className="hero-feat-icon">
                <Icon name="ticket" size={24} />
              </div>
              <div className="hero-feat-title">Digital Pass & QR</div>
              <div className="hero-feat-desc">Instant verified entry passes with scannable vector admission codes.</div>
            </div>

            <div className="hero-feature-card">
              <div className="hero-feat-icon">
                <Icon name="smartphone" size={24} />
              </div>
              <div className="hero-feat-title">Mobile Ready</div>
              <div className="hero-feat-desc">Designed natively for smartphone viewports with fast bottom tab navigation.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
