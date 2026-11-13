import React from 'react';
import { Icon } from '../components/Icons';
import { NotificationItem, CollegeEvent } from '../types';

interface EventUpdatesViewProps {
  notifications: NotificationItem[];
  events: CollegeEvent[];
  onMarkAsRead: (id: string | number) => void;
  onMarkAllAsRead: () => void;
  onViewEvent: (event: CollegeEvent) => void;
}

export const EventUpdatesView: React.FC<EventUpdatesViewProps> = ({
  notifications,
  events,
  onMarkAsRead,
  onMarkAllAsRead,
  onViewEvent,
}) => {
  const eventMap = new Map(events.map((e) => [e.id, e]));

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'postpone':
        return <span className="badge badge-postponed">Rescheduled</span>;
      case 'venue':
        return <span className="badge badge-venue">Venue Relocated</span>;
      case 'cancel':
        return <span className="badge badge-cancelled">Cancelled</span>;
      default:
        return <span className="badge badge-upcoming">Campus Alert</span>;
    }
  };

  const getIconInfo = (type: string) => {
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

  // Sort upcoming events for Today's timeline
  const timelineEvents = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Event Updates & Announcements
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Real-time change logs, reschedule notices, and auditorium relocations (Page 5 of CampusPulse)
          </p>
        </div>

        {notifications.some((n) => !n.is_read) && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onMarkAllAsRead}
            style={{ fontSize: '0.85rem' }}
          >
            <Icon name="check-circle" size={15} /> Mark All as Read
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.1fr', gap: '1.75rem' }}>
        {/* LEFT COLUMN: CHANGE LOG & ALERTS FEED */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {notifications.map((item) => {
              const iconInfo = getIconInfo(item.update_type || item.type || 'alert');
              const relatedEvent = item.event_id ? eventMap.get(item.event_id) : undefined;

              return (
                <div
                  key={item.id}
                  className={`card update-card-item ${!item.is_read ? 'unread' : ''}`}
                  style={{ padding: '1.4rem' }}
                >
                  <div
                    className="update-icon-circle"
                    style={{ background: iconInfo.bg, color: iconInfo.color, width: '42px', height: '42px' }}
                  >
                    <Icon name={iconInfo.icon} size={20} />
                  </div>

                  <div className="update-content">
                    <div className="update-top-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h3 className="update-title" style={{ fontSize: '1rem' }}>{item.title}</h3>
                        {getNotificationBadge(item.update_type || item.type || 'alert')}
                      </div>
                      <span className="update-time">{item.created_at}</span>
                    </div>

                    <p className="update-body-text" style={{ fontSize: '0.875rem', margin: '0.5rem 0 0.85rem 0' }}>
                      {item.message}
                    </p>

                    {/* Change Comparison (Old -> New) */}
                    {item.old_value && item.new_value && (
                      <div className="change-compare-box" style={{ marginBottom: '1rem' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Previous Detail
                          </div>
                          <span style={{ textDecoration: 'line-through', color: 'var(--status-red-text)', fontWeight: 600 }}>
                            {item.old_value}
                          </span>
                        </div>
                        <Icon name="chevron-right" size={16} color="var(--primary)" />
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--status-green-text)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Updated Value
                          </div>
                          <span style={{ color: 'var(--status-green-text)', fontWeight: 800 }}>
                            {item.new_value}
                          </span>
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      {relatedEvent && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                          onClick={() => onViewEvent(relatedEvent)}
                        >
                          <Icon name="info" size={14} /> View Event
                        </button>
                      )}
                      {!item.is_read && (
                        <button
                          type="button"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.45rem 0.5rem',
                          }}
                          onClick={() => onMarkAsRead(item.id)}
                        >
                          <Icon name="check" size={14} /> Dismiss
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {notifications.length === 0 && (
              <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
                <div className="brand-icon-box" style={{ width: '56px', height: '56px', margin: '0 auto 1.25rem auto' }}>
                  <Icon name="bell" size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  All Caught Up!
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  There are no recent schedule changes, postponed events, or venue relocations.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: TIMELINE & PINNED HIGHLIGHTS */}
        <div>
          {/* TIMELINE CARD */}
          <div className="today-timeline-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Icon name="clock" size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Upcoming Schedule Timeline
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {timelineEvents.map((ev) => (
                <div key={ev.id} className="timeline-item">
                  <div className="timeline-time-col">
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>{ev.time}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ev.date}</span>
                  </div>
                  <div className="timeline-content-col">
                    <div
                      className="timeline-event-name"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onViewEvent(ev)}
                    >
                      {ev.title}
                    </div>
                    <div className="timeline-event-sub">
                      <Icon name="map-pin" size={11} /> {ev.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PINNED EVENTS CARD */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Icon name="award" size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Key Campus Spotlights
              </h3>
            </div>

            {events.slice(0, 3).map((ev) => (
              <div key={ev.id} className="pinned-item-box">
                <div>
                  <div className="pinned-item-title">{ev.title}</div>
                  <div className="pinned-item-time">{ev.date} • {ev.venue}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                  onClick={() => onViewEvent(ev)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
