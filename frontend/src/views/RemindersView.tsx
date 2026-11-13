import React from 'react';
import { Icon } from '../components/Icons';
import { CollegeEvent, Registration } from '../types';
import { CountdownDisplay } from '../utils/countdown';

interface RemindersViewProps {
  events: CollegeEvent[];
  registrations: Registration[];
  onViewEvent: (event: CollegeEvent) => void;
  onViewTicket: (reg: Registration) => void;
  onNavigate: (route: string) => void;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  events,
  registrations,
  onViewEvent,
  onViewTicket,
  onNavigate,
}) => {
  const eventMap = new Map(events.map((e) => [e.id, e]));

  const myRegisteredItems = registrations
    .map((r) => ({
      reg: r,
      event: eventMap.get(r.event_id),
    }))
    .filter((item): item is { reg: Registration; event: CollegeEvent } => item.event !== undefined);

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          Smart Event Reminders
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Active live countdowns and itinerary clocks for all your enrolled college sessions
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {myRegisteredItems.map(({ reg, event }) => (
          <div key={reg.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  {event.category}
                </span>
                <span className="badge badge-confirmed">Reminder Active</span>
              </div>

              <h3
                style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', cursor: 'pointer' }}
                onClick={() => onViewEvent(event)}
              >
                {event.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Icon name="calendar" size={14} color="var(--primary)" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Icon name="map-pin" size={14} color="var(--primary)" />
                  <span>{event.venue}</span>
                </div>
              </div>

              {/* Countdown box */}
              <div style={{ background: 'linear-gradient(135deg, #5845F5 0%, #8751F5 100%)', borderRadius: '14px', padding: '1rem', color: '#FFFFFF', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em', opacity: 0.85, marginBottom: '0.4rem' }}>
                  Starts in:
                </div>
                <CountdownDisplay dateStr={event.date} timeStr={event.time} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.55rem' }}
                onClick={() => onViewTicket(reg)}
              >
                <Icon name="ticket" size={15} /> Entry Pass
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1, padding: '0.55rem' }}
                onClick={() => onViewEvent(event)}
              >
                <Icon name="info" size={15} /> Info
              </button>
            </div>
          </div>
        ))}
      </div>

      {myRegisteredItems.length === 0 && (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div className="brand-icon-box" style={{ width: '64px', height: '64px', margin: '0 auto 1.25rem auto' }}>
            <Icon name="bell" size={32} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Active Event Reminders
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
            You have not registered for any upcoming events yet. Register for hackathons, workshops, or sports to track countdowns here.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('events')}>
            <Icon name="search" size={16} /> Browse Upcoming Events
          </button>
        </div>
      )}
    </div>
  );
};

