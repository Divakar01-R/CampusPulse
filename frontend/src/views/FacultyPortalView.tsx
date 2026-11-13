import React, { useState } from 'react';
import { Icon } from '../components/Icons';
import { CollegeEvent, User } from '../types';

interface FacultyPortalViewProps {
  user: User;
  events: CollegeEvent[];
  onCreateEvent: () => void;
  onEditEvent: (event: CollegeEvent) => void;
  onPostponeEvent: (event: CollegeEvent) => void;
  onChangeVenue: (event: CollegeEvent) => void;
  onCancelEvent: (event: CollegeEvent) => void;
  onViewRoster: (event: CollegeEvent) => void;
  onDeleteEvent: (eventId: string | number) => void;
}

export const FacultyPortalView: React.FC<FacultyPortalViewProps> = ({
  user,
  events,
  onCreateEvent,
  onEditEvent,
  onPostponeEvent,
  onChangeVenue,
  onCancelEvent,
  onViewRoster,
  onDeleteEvent,
}) => {
  const [filterDepartment, setFilterDepartment] = useState('All');

  const filteredEvents = events.filter((e) => {
    if (filterDepartment === 'All') return true;
    return e.department === filterDepartment;
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

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Faculty Event Operations Portal
            </h1>
            <span className="badge" style={{ background: '#ECFDF5', color: '#059669', fontWeight: 700 }}>
              Admin Privileges
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Authorized portal for {user.name} ({user.department || 'All Departments'}). Publish events, manage schedules, and track rosters.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onCreateEvent}
          style={{ padding: '0.75rem 1.4rem' }}
        >
          <Icon name="plus" size={18} /> Create New Event
        </button>
      </div>

      {/* Events Table Card */}
      <div className="card" style={{ padding: '1.75rem', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Managed Campus Events ({filteredEvents.length})
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter Dept:</span>
            <select
              className="form-control"
              style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Biotechnology">Biotechnology</option>
            </select>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.775rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Event Details</th>
              <th style={{ padding: '0.75rem 1rem' }}>Schedule & Venue</th>
              <th style={{ padding: '0.75rem 1rem' }}>Department</th>
              <th style={{ padding: '0.75rem 1rem' }}>Registrations</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((ev) => (
              <tr key={ev.id} style={{ borderBottom: '1px solid var(--border-subtle)', verticalAlign: 'middle' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                    {ev.title}
                  </div>
                  <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.7rem' }}>
                    {ev.category}
                  </span>
                </td>

                <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    <Icon name="calendar" size={13} color="var(--primary)" />
                    <span>{ev.date} at {ev.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                    <Icon name="map-pin" size={13} />
                    <span>{ev.venue}</span>
                  </div>
                </td>

                <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                  <div>{ev.department}</div>
                  <div style={{ fontSize: '0.75rem' }}>{ev.organizer}</div>
                </td>

                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                    {ev.registered_count} / {ev.capacity}
                  </div>
                  <button
                    type="button"
                    onClick={() => onViewRoster(ev)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontSize: '0.775rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: '0.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <Icon name="users" size={12} /> View Roster
                  </button>
                </td>

                <td style={{ padding: '1rem' }}>
                  {getStatusBadge(ev.status)}
                </td>

                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                      title="Edit event information"
                      onClick={() => onEditEvent(ev)}
                    >
                      <Icon name="edit" size={13} /> Edit
                    </button>

                    <button
                      type="button"
                      style={{
                        background: 'var(--status-amber-bg)',
                        color: 'var(--status-amber-text)',
                        border: '1px solid var(--status-amber-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.35rem 0.65rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                      title="Postpone event schedule"
                      onClick={() => onPostponeEvent(ev)}
                    >
                      <Icon name="clock" size={13} /> Postpone
                    </button>

                    <button
                      type="button"
                      style={{
                        background: 'var(--status-purple-bg)',
                        color: 'var(--status-purple-text)',
                        border: '1px solid var(--status-purple-border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.35rem 0.65rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                      title="Relocate venue"
                      onClick={() => onChangeVenue(ev)}
                    >
                      <Icon name="map-pin" size={13} /> Relocate
                    </button>

                    {ev.status !== 'cancelled' ? (
                      <button
                        type="button"
                        style={{
                          background: 'var(--status-red-bg)',
                          color: 'var(--status-red-text)',
                          border: '1px solid var(--status-red-border)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                        title="Cancel event and notify attendees"
                        onClick={() => onCancelEvent(ev)}
                      >
                        <Icon name="alert-triangle" size={13} /> Cancel
                      </button>
                    ) : (
                      <button
                        type="button"
                        style={{
                          background: '#FEE2E2',
                          color: '#991B1B',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                        title="Permanently remove event"
                        onClick={() => {
                          if (window.confirm(`Delete "${ev.title}" permanently?`)) {
                            onDeleteEvent(ev.id);
                          }
                        }}
                      >
                        <Icon name="trash" size={13} /> Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEvents.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No events found for this filter. Click "Create New Event" above to create one.
          </div>
        )}
      </div>
    </div>
  );
};
