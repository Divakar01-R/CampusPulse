import React, { useState, useMemo } from 'react';
import { Icon } from '../components/Icons';
import { CollegeEvent, Registration } from '../types';

interface AllEventsViewProps {
  events: CollegeEvent[];
  registrations: Registration[];
  searchQuery: string;
  onClearSearch: () => void;
  onViewEvent: (event: CollegeEvent) => void;
  onViewTicket: (reg: Registration) => void;
  onRegisterEvent: (eventId: string | number) => void;
}

export const AllEventsView: React.FC<AllEventsViewProps> = ({
  events,
  registrations,
  searchQuery,
  onClearSearch,
  onViewEvent,
  onViewTicket,
  onRegisterEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [sortBy, setSortBy] = useState('date-asc');

  const registeredEventIds = useMemo(
    () => new Set(registrations.map((r) => r.event_id)),
    [registrations]
  );

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Academic', 'Workshop'];
  const departments = [
    'All',
    'Computer Science & Engineering',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Business Administration',
    'Biotechnology',
    'Student Council',
    'Fine Arts Club',
    'Sports Committee',
  ];

  // Perform multi-field search and filtering
  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return events.filter((ev) => {
      // Category filter
      if (selectedCategory !== 'All' && ev.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Department filter
      if (selectedDepartment !== 'All' && ev.department !== selectedDepartment) {
        return false;
      }
      // Search query across title, description, category, department, organizer, venue
      if (q) {
        const matchesTitle = ev.title.toLowerCase().includes(q);
        const matchesDesc = (ev.description || '').toLowerCase().includes(q);
        const matchesCat = (ev.category || '').toLowerCase().includes(q);
        const matchesDept = (ev.department || '').toLowerCase().includes(q);
        const matchesOrg = (ev.organizer || '').toLowerCase().includes(q);
        const matchesVenue = (ev.venue || '').toLowerCase().includes(q);

        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesDept && !matchesOrg && !matchesVenue) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-asc') return a.date.localeCompare(b.date);
      if (sortBy === 'date-desc') return b.date.localeCompare(a.date);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'popularity') return (b.registered_count || 0) - (a.registered_count || 0);
      return 0;
    });
  }, [events, searchQuery, selectedCategory, selectedDepartment, sortBy]);

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
      {/* Top Controls Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Explore College Events
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Browse, search, and reserve passes for upcoming campus activities
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
            <select
              className="form-control"
              style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-asc">Date (Earliest first)</option>
              <option value="date-desc">Date (Latest first)</option>
              <option value="popularity">Most Popular</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Pills and Department Selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="filter-pills-bar">
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Dept:</span>
            <select
              className="form-control"
              style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search status indicator */}
        {searchQuery.trim() && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.65rem 1rem',
              background: '#F0EEFF',
              borderRadius: '10px',
              border: '1px solid #DDD6FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.875rem',
            }}
          >
            <div>
              Showing results matching "<strong>{searchQuery}</strong>" ({filteredEvents.length} found)
            </div>
            <button
              type="button"
              onClick={onClearSearch}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Icon name="x" size={14} /> Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Events Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredEvents.map((event) => {
          const isRegistered = registeredEventIds.has(event.id);
          const userReg = registrations.find((r) => r.event_id === event.id);
          const capacity = event.capacity || event.total_seats || 100;
          const percentFilled = Math.min(100, Math.round(((event.registered_count || 0) / capacity) * 100));
          const isFull = event.registered_count >= capacity;

          return (
            <div
              key={event.id}
              className="card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                    {event.category}
                  </span>
                  {getStatusBadge(event.status)}
                </div>

                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    lineHeight: 1.3,
                  }}
                  onClick={() => onViewEvent(event)}
                >
                  {event.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {event.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="calendar" size={14} color="var(--primary)" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="map-pin" size={14} color="var(--primary)" />
                    <span>{event.venue}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="award" size={14} color="var(--primary)" />
                    <span>{event.organizer} ({event.department})</span>
                  </div>
                </div>

                {/* Seats meter */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    <span>Capacity Filled</span>
                    <span>{event.registered_count} / {event.capacity} seats</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#F0EEFF', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${percentFilled}%`,
                        height: '100%',
                        background: percentFilled > 90 ? 'var(--status-red-text)' : 'var(--primary)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.6rem' }}
                  onClick={() => onViewEvent(event)}
                >
                  <Icon name="info" size={15} /> Details
                </button>

                {isRegistered ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ flex: 1.2, padding: '0.6rem', background: 'linear-gradient(135deg, #10B981, #059669)' }}
                    onClick={() => userReg && onViewTicket(userReg)}
                  >
                    <Icon name="ticket" size={15} /> My Ticket
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ flex: 1.2, padding: '0.6rem' }}
                    onClick={() => onRegisterEvent(event.id)}
                    disabled={isFull || event.status === 'cancelled'}
                  >
                    {isFull ? (
                      'Event Full'
                    ) : event.status === 'cancelled' ? (
                      'Cancelled'
                    ) : (
                      <>
                        <Icon name="check-circle" size={15} /> Register
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', marginTop: '1.5rem' }}>
          <div className="brand-icon-box" style={{ width: '64px', height: '64px', margin: '0 auto 1.25rem auto' }}>
            <Icon name="search" size={32} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            No Matching Events Found
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
            {searchQuery.trim()
              ? `We couldn't find any events matching "${searchQuery}". Try searching by title, category, venue, or department.`
              : 'There are no events matching the selected filters.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            {searchQuery.trim() && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClearSearch}
              >
                Clear Search Query
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onClearSearch();
                setSelectedCategory('All');
                setSelectedDepartment('All');
              }}
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
