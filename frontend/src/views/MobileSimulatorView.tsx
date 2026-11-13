import React, { useState } from 'react';
import { Icon } from '../components/Icons';
import { CollegeEvent, Registration, NotificationItem, User } from '../types';
import { CountdownDisplay } from '../utils/countdown';

interface MobileSimulatorViewProps {
  user: User;
  events: CollegeEvent[];
  registrations: Registration[];
  notifications: NotificationItem[];
  onViewEvent: (event: CollegeEvent) => void;
  onViewTicket: (reg: Registration) => void;
  onRegisterEvent: (eventId: number) => void;
}

export const MobileSimulatorView: React.FC<MobileSimulatorViewProps> = ({
  user,
  events,
  registrations,
  notifications,
  onViewEvent,
  onViewTicket,
  onRegisterEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'alerts' | 'profile'>('home');

  const registeredEventIds = new Set(registrations.map((r) => r.event_id));
  const myRegisteredEvents = events.filter((e) => registeredEventIds.has(e.id));
  const heroEvent = myRegisteredEvents[0] || events[0];

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          Mobile Responsive Interface
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Exact Page 6 PDF design — interactive smartphone viewport preview with working bottom navigation
        </p>
      </div>

      <div className="mobile-simulator-overlay">
        <div className="mobile-device-frame">
          {/* Top Speaker / Camera Notch */}
          <div className="mobile-notch" />

          {/* Screen Content */}
          <div className="mobile-screen-content">
            {activeTab === 'home' && (
              <div>
                {/* Greeting Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Welcome back</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {user.name.split(' ')[0]} 👋
                    </div>
                  </div>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    {user.name[0]}
                  </div>
                </div>

                {/* Hero Countdown Card */}
                {heroEvent && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #5845F5 0%, #8751F5 100%)',
                      borderRadius: '18px',
                      padding: '1.25rem',
                      color: '#FFFFFF',
                      marginBottom: '1.25rem',
                      boxShadow: '0 8px 20px rgba(88, 69, 245, 0.25)',
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '999px', marginBottom: '0.5rem' }}>
                      Spotlight Countdown
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.4rem', color: '#FFFFFF' }}>
                      {heroEvent.title}
                    </h3>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: '0.85rem' }}>
                      <Icon name="map-pin" size={12} /> {heroEvent.venue}
                    </div>
                    <CountdownDisplay dateStr={heroEvent.date} timeStr={heroEvent.time} />
                  </div>
                )}

                {/* Quick Stats Pill Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{registrations.length}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Registered</div>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10B981' }}>{events.length}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Live Events</div>
                  </div>
                </div>

                {/* Upcoming Events Carousel Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>Upcoming Events</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>See all</span>
                </div>

                {/* Mobile Events List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {events.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '14px',
                        padding: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                          {ev.category}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                          {ev.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {ev.date} • {ev.venue}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.7rem' }}
                        onClick={() => onViewEvent(ev)}
                      >
                        Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  My Passes & Schedule
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {registrations.map((r) => {
                    const ev = events.find((e) => e.id === r.event_id);
                    if (!ev) return null;
                    return (
                      <div key={r.id} style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10B981', marginBottom: '0.25rem' }}>
                          ● Confirmed Pass #{r.id}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                          {ev.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                          {ev.date} at {ev.venue}
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ width: '100%', padding: '0.45rem', fontSize: '0.75rem' }}
                          onClick={() => onViewTicket(r)}
                        >
                          <Icon name="ticket" size={13} /> View QR Ticket
                        </button>
                      </div>
                    );
                  })}
                  {registrations.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      No registered events yet.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  Event Alerts
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '0.85rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        {n.message}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 600 }}>
                        {n.created_at}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    margin: '0 auto 0.75rem auto',
                  }}
                >
                  {user.name[0]}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{user.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{user.email}</p>

                <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '1rem', textAlign: 'left', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div><strong>Role:</strong> {user.role === 'faculty' ? 'Faculty / Organizer' : 'Student'}</div>
                  <div><strong>Department:</strong> {user.department || 'CSE'}</div>
                  <div><strong>ID:</strong> {user.student_reg_no || user.faculty_id || 'STU-001'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Bar */}
          <div className="mobile-bottom-nav">
            <button
              type="button"
              className={`mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <Icon name="home" size={20} />
              <span>Home</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-btn ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              <Icon name="calendar" size={20} />
              <span>Schedule</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-btn ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveTab('alerts')}
            >
              <Icon name="bell" size={20} />
              <span>Alerts</span>
            </button>
            <button
              type="button"
              className={`mobile-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <Icon name="user" size={20} />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

