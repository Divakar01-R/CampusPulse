import React, { useState } from 'react';
import { Icon } from '../components/Icons';
import { CollegeEvent, Registration, NotificationItem, User } from '../types';
import { CountdownDisplay } from '../utils/countdown';

interface DashboardViewProps {
  user: User;
  events: CollegeEvent[];
  registrations: Registration[];
  notifications: NotificationItem[];
  onViewEvent: (event: CollegeEvent) => void;
  onViewTicket: (reg: Registration) => void;
  onRegisterEvent: (eventId: string | number) => void;
  onNavigate: (route: string) => void;
  onShowToast: (title: string, message: string, type?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  events,
  registrations,
  notifications,
  onViewEvent,
  onViewTicket,
  onRegisterEvent,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Find next upcoming registered event or first upcoming event for the hero countdown
  const registeredEventIds = new Set(registrations.map((r) => r.event_id));
  const myRegisteredEvents = events.filter((e) => registeredEventIds.has(e.id));
  const featuredEvent = myRegisteredEvents.length > 0 ? myRegisteredEvents[0] : events[0];
  const featuredRegistration = featuredEvent
    ? registrations.find((r) => r.event_id === featuredEvent.id)
    : undefined;

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Academic', 'Workshop'];

  const filteredEvents = events.filter((e) => {
    if (selectedCategory === 'All') return true;
    return e.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'postponed':
        return <span className="badge badge-postponed">Postponed</span>;
      case 'venue_changed':
        return <span className="badge badge-venue">Venue Changed</span>;
      case 'cancelled':
        return <span className="badge badge-cancelled">Cancelled</span>;
      default:
        return <span className="badge badge-upcoming">Upcoming</span>;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'postpone':
        return { icon: 'clock', bg: 'var(--status-amber-bg)', color: 'var(--status-amber-text)' };
      case 'venue':
        return { icon: 'map-pin', bg: 'var(--status-purple-bg)', color: 'var(--status-purple-text)' };
      case 'cancel':
        return { icon: 'alert-triangle', bg: 'var(--status-red-bg)', color: 'var(--status-red-text)' };
      default:
        return { icon: 'bell', bg: 'var(--status-blue-bg)', color: 'var(--status-blue-text)' };
    }
  };

  return (
    <div className="dashboard-content" style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* FEATURED EVENT BANNER WITH LIVE COUNTDOWN (PAGE 3) */}
      {featuredEvent && (
        <div className="card featured-reminder-card">
          <div className="featured-top-tag">
            <Icon name="clock" size={14} />
            <span>{featuredRegistration ? 'Next Registered Event' : 'Featured Campus Spotlight'}</span>
          </div>

          <h1 className="featured-title">{featuredEvent.title}</h1>

          <div className="featured-details">
            <div className="featured-item">
              <Icon name="calendar" size={16} />
              <span>{featuredEvent.date} • {featuredEvent.time}</span>
            </div>
            <div className="featured-item">
              <Icon name="map-pin" size={16} />
              <span>{featuredEvent.venue}</span>
            </div>
            <div className="featured-item">
              <Icon name="user" size={16} />
              <span>{featuredEvent.organizer} ({featuredEvent.department})</span>
            </div>
          </div>

          <div className="featured-countdown-row">
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem', opacity: 0.85 }}>
                Time Remaining Until Start
              </div>
              <CountdownDisplay dateStr={featuredEvent.date} timeStr={featuredEvent.time} />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {featuredRegistration ? (
                <button
                  type="button"
                  className="btn-ticket-hero"
                  onClick={() => onViewTicket(featuredRegistration)}
                >
                  <Icon name="ticket" size={18} /> View Ticket Pass
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-ticket-hero"
                  onClick={() => onRegisterEvent(featuredEvent.id)}
                >
                  <Icon name="check-circle" size={18} /> Register Now
                </button>
              )}
              <button
                type="button"
                style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
                onClick={() => onViewEvent(featuredEvent)}
              >
                <Icon name="info" size={18} /> Event Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATS METRIC CARDS (PAGE 3) */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => onNavigate('registrations')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon purple">
            <Icon name="check-circle" size={24} />
          </div>
          <div>
            <div className="stat-value">{registrations.length}</div>
            <div className="stat-label">Registered Events</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => onNavigate('events')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon green">
            <Icon name="calendar" size={24} />
          </div>
          <div>
            <div className="stat-value">{events.length}</div>
            <div className="stat-label">Upcoming Events</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => onNavigate('reminders')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon amber">
            <Icon name="bell" size={24} />
          </div>
          <div>
            <div className="stat-value">{registrations.length}</div>
            <div className="stat-label">Active Reminders</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => onNavigate('updates')} style={{ cursor: 'pointer' }}>
          <div className="stat-icon blue">
            <Icon name="award" size={24} />
          </div>
          <div>
            <div className="stat-value">{notifications.filter((n) => !n.is_read).length}</div>
            <div className="stat-label">Unread Updates</div>
          </div>
        </div>
      </div>

      {/* 2-COLUMN DASHBOARD LAYOUT (PAGE 3) */}
      <div className="dashboard-grid">
        {/* LEFT COLUMN: UPCOMING EVENTS */}
        <div>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Icon name="compass" size={20} color="var(--primary)" />
                Upcoming Campus Events
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Explore live college workshops, hackathons, and competitions
              </p>
            </div>
            <span className="see-all-link" onClick={() => onNavigate('events')}>
              View All ({events.length}) <Icon name="chevron-right" size={14} />
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="filter-pills-bar" style={{ marginBottom: '1.25rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Event Cards List */}
          <div className="events-column">
            {filteredEvents.slice(0, 5).map((event) => {
              const isRegistered = registeredEventIds.has(event.id);
              const userReg = registrations.find((r) => r.event_id === event.id);
              const dateParts = event.date.split('-'); // e.g. 2026-11-20
              const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
              const monthNum = parseInt(dateParts[1], 10);
              const monthStr = !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12 ? monthNames[monthNum - 1] : 'NOV';
              const dayStr = dateParts[2] || '20';

              return (
                <div key={event.id} className="event-card-item">
                  <div className="event-date-box">
                    <span className="event-month">{monthStr}</span>
                    <span className="event-day">{dayStr}</span>
                  </div>

                  <div className="event-details-area">
                    <div className="event-tags-row">
                      <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                        {event.category}
                      </span>
                      {getStatusBadge(event.status)}
                    </div>

                    <h3 className="event-title-text" onClick={() => onViewEvent(event)}>
                      {event.title}
                    </h3>

                    <div className="event-meta-info">
                      <div className="event-meta-item">
                        <Icon name="clock" size={13} />
                        <span>{event.time}</span>
                      </div>
                      <div className="event-meta-item">
                        <Icon name="map-pin" size={13} />
                        <span>{event.venue}</span>
                      </div>
                      <div className="event-meta-item">
                        <Icon name="users" size={13} />
                        <span>{event.registered_count} / {event.capacity || event.total_seats || 100} registered</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {isRegistered ? (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
                        onClick={() => userReg && onViewTicket(userReg)}
                      >
                        <Icon name="ticket" size={14} /> My Ticket
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
                        onClick={() => onRegisterEvent(event.id)}
                        disabled={event.registered_count >= (event.capacity || event.total_seats || 100)}
                      >
                        {event.registered_count >= (event.capacity || event.total_seats || 100) ? 'Full' : 'Register'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: LATEST UPDATES & PINNED */}
        <div>
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Icon name="bell" size={20} color="var(--primary)" />
                Latest Updates
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Real-time college alerts and schedule notices
              </p>
            </div>
            <span className="see-all-link" onClick={() => onNavigate('updates')}>
              All Alerts <Icon name="chevron-right" size={14} />
            </span>
          </div>

          <div className="updates-list">
            {notifications.slice(0, 4).map((item) => {
              const iconStyle = getNotificationIcon(item.update_type || item.type || 'alert');
              return (
                <div key={item.id} className={`update-card-item ${!item.is_read ? 'unread' : ''}`}>
                  <div className="update-icon-circle" style={{ background: iconStyle.bg, color: iconStyle.color }}>
                    <Icon name={iconStyle.icon} size={18} />
                  </div>
                  <div className="update-content">
                    <div className="update-top-row">
                      <span className="update-title">{item.title}</span>
                      <span className="update-time">{item.created_at}</span>
                    </div>
                    <p className="update-body-text">{item.message}</p>
                    {item.old_value && item.new_value && (
                      <div className="change-compare-box">
                        <span style={{ textDecoration: 'line-through', color: 'var(--status-red-text)', fontWeight: 600 }}>
                          {item.old_value}
                        </span>
                        <Icon name="chevron-right" size={12} color="var(--text-muted)" />
                        <span style={{ color: 'var(--status-green-text)', fontWeight: 700 }}>
                          {item.new_value}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {notifications.length === 0 && (
              <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Icon name="bell" size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                <p>No new campus updates at this time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
