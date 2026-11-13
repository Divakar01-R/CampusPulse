import React, { useState } from 'react';
import { Icon } from '../components/Icons';
import { CollegeEvent, Registration } from '../types';

interface MyRegistrationsViewProps {
  events: CollegeEvent[];
  registrations: Registration[];
  onViewEvent: (event: CollegeEvent) => void;
  onViewTicket: (reg: Registration) => void;
  onCancelRegistration: (regId: string | number) => void;
  onNavigate: (route: string) => void;
}

export const MyRegistrationsView: React.FC<MyRegistrationsViewProps> = ({
  events,
  registrations,
  onViewEvent,
  onViewTicket,
  onCancelRegistration,
  onNavigate,
}) => {
  // Calendar state
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 10 is November (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Preference switches state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [rescheduleAlerts, setRescheduleAlerts] = useState(true);
  const [venueAlerts, setVenueAlerts] = useState(true);

  // Build map of event_id -> CollegeEvent
  const eventMap = new Map(events.map((e) => [e.id, e]));

  // Find events for each registration
  const myEventsWithReg = registrations.map((reg) => ({
    registration: reg,
    event: eventMap.get(reg.event_id),
  })).filter((item): item is { registration: Registration; event: CollegeEvent } => item.event !== undefined);

  // Calendar calculations
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(currentYear, currentMonth, 1).getDay();

  // Set of day numbers that have registered events in this month
  const eventDaysInMonth = new Set<number>();
  myEventsWithReg.forEach(({ event }) => {
    const parts = event.date.split('-');
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      if (y === currentYear && m === currentMonth) {
        eventDaysInMonth.add(d);
      }
    }
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  // Filter events if a specific calendar day is clicked
  const displayedEvents = selectedDay !== null
    ? myEventsWithReg.filter(({ event }) => {
        const parts = event.date.split('-');
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10) - 1;
          const d = parseInt(parts[2], 10);
          return y === currentYear && m === currentMonth && d === selectedDay;
        }
        return false;
      })
    : myEventsWithReg;

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          My Registered Events
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Manage your schedule, digital entry passes, and campus reminders (Page 4 of CampusPulse)
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.1fr', gap: '1.75rem' }}>
        {/* LEFT COLUMN: REGISTERED EVENTS LIST */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Enrolled Schedule ({myEventsWithReg.length})
            </h2>
            {selectedDay !== null && (
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.825rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Clear Day Filter ({monthNames[currentMonth]} {selectedDay})
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {displayedEvents.map(({ registration, event }) => {
              const dateParts = event.date.split('-');
              const monthAbbrs = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
              const monthNum = parseInt(dateParts[1], 10);
              const monthStr = !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12 ? monthAbbrs[monthNum - 1] : 'NOV';
              const dayStr = dateParts[2] || '20';

              return (
                <div key={registration.id} className="card" style={{ padding: '1.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                    <div className="event-date-box">
                      <span className="event-month">{monthStr}</span>
                      <span className="event-day">{dayStr}</span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                          {event.category}
                        </span>
                        <span className="badge badge-confirmed">Confirmed</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Reg #{registration.id.toString().padStart(5, '0')}
                        </span>
                      </div>

                      <h3
                        style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem', cursor: 'pointer' }}
                        onClick={() => onViewEvent(event)}
                      >
                        {event.title}
                      </h3>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Icon name="clock" size={13} color="var(--primary)" />
                          <span>{event.time}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Icon name="map-pin" size={13} color="var(--primary)" />
                          <span>{event.venue}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Icon name="user" size={13} color="var(--primary)" />
                          <span>{event.organizer}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                          onClick={() => onViewTicket(registration)}
                        >
                          <Icon name="ticket" size={15} /> View Entry Pass
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                          onClick={() => onViewEvent(event)}
                        >
                          <Icon name="info" size={15} /> Event Info
                        </button>
                        <button
                          type="button"
                          style={{
                            background: 'var(--status-red-bg)',
                            color: 'var(--status-red-text)',
                            border: '1px solid var(--status-red-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.5rem 1rem',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to cancel your registration for "${event.title}"? Your seat will be restored for other students.`)) {
                              onCancelRegistration(registration.id);
                            }
                          }}
                        >
                          <Icon name="trash" size={14} /> Cancel Pass
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {displayedEvents.length === 0 && (
              <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
                <div className="brand-icon-box" style={{ width: '56px', height: '56px', margin: '0 auto 1.25rem auto' }}>
                  <Icon name="calendar" size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {selectedDay !== null
                    ? `No registered events on ${monthNames[currentMonth]} ${selectedDay}`
                    : 'No Registrations Found'}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '360px', margin: '0 auto 1.5rem auto' }}>
                  {selectedDay !== null
                    ? 'Click another date on the calendar or view all registered events.'
                    : "You haven't signed up for any events yet. Explore upcoming campus events and reserve your pass!"}
                </p>
                {selectedDay !== null ? (
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedDay(null)}>
                    Show All My Events
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={() => onNavigate('events')}>
                    <Icon name="search" size={16} /> Explore Events
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MONTHLY CALENDAR & PREFERENCES */}
        <div>
          {/* INTERACTIVE CALENDAR CARD */}
          <div className="calendar-card">
            <div className="calendar-header">
              <span className="calendar-month-title">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <div className="calendar-nav-btns">
                <button type="button" className="cal-nav-btn" onClick={handlePrevMonth} aria-label="Previous month">
                  <Icon name="chevron-left" size={16} />
                </button>
                <button type="button" className="cal-nav-btn" onClick={handleNextMonth} aria-label="Next month">
                  <Icon name="chevron-right" size={16} />
                </button>
              </div>
            </div>

            <div className="calendar-weekdays">
              {weekdays.map((w) => (
                <div key={w}>{w}</div>
              ))}
            </div>

            <div className="calendar-days-grid">
              {/* Empty leading day cells */}
              {Array.from({ length: firstDayWeekday }).map((_, i) => (
                <div key={`empty-${i}`} className="cal-day-cell other-month" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const hasEvent = eventDaysInMonth.has(dayNum);
                const isSelected = selectedDay === dayNum;

                return (
                  <div
                    key={`day-${dayNum}`}
                    className={`cal-day-cell ${hasEvent ? 'has-event' : ''} ${isSelected ? 'today' : ''}`}
                    onClick={() => {
                      if (hasEvent) {
                        setSelectedDay(dayNum === selectedDay ? null : dayNum);
                      }
                    }}
                    style={{
                      cursor: hasEvent ? 'pointer' : 'default',
                      border: isSelected ? '2px solid var(--primary)' : undefined,
                    }}
                    title={hasEvent ? `Event on ${monthNames[currentMonth]} ${dayNum}` : undefined}
                  >
                    <span>{dayNum}</span>
                    {hasEvent && <span className="cal-event-dot" />}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
              <span>Purple dots indicate days with registered events</span>
            </div>
          </div>

          {/* NOTIFICATION PREFERENCES CARD */}
          <div className="preferences-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Icon name="bell" size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Reminder Preferences
              </h3>
            </div>

            <div className="pref-row">
              <div>
                <div className="pref-label-title">24-Hour Email Reminder</div>
                <div className="pref-label-desc">Receive itinerary 1 day before start</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="pref-row">
              <div>
                <div className="pref-label-title">1-Hour Device Push Notification</div>
                <div className="pref-label-desc">Alert 60 minutes prior to door opening</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="pref-row">
              <div>
                <div className="pref-label-title">Schedule Postponement Alerts</div>
                <div className="pref-label-desc">Instant notification if event is delayed</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={rescheduleAlerts}
                  onChange={(e) => setRescheduleAlerts(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>

            <div className="pref-row">
              <div>
                <div className="pref-label-title">Venue Relocation Alerts</div>
                <div className="pref-label-desc">Directions update if auditorium changes</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={venueAlerts}
                  onChange={(e) => setVenueAlerts(e.target.checked)}
                />
                <span className="slider" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
