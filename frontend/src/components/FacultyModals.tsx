import React, { useState } from 'react';
import { Icon } from './Icons';
import { CollegeEvent, User } from '../types';

interface CreateEventModalProps {
  currentUser: User | null;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ currentUser, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technical');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:30 AM');
  const [endTime, setEndTime] = useState('04:30 PM');
  const [venue, setVenue] = useState('');
  const [department, setDepartment] = useState(currentUser?.department || 'Computer Science');
  const [totalSeats, setTotalSeats] = useState(100);
  const [deadline, setDeadline] = useState('');
  const [rules, setRules] = useState('Valid college ID mandatory\nBring personal laptop if workshop');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        title,
        description,
        category,
        date,
        start_time: startTime,
        end_time: endTime,
        venue,
        department,
        total_seats: Number(totalSeats),
        registration_deadline: deadline,
        rules: rules.split('\n').filter((r) => r.trim()),
        organizer_id: currentUser?.id,
        organizer_name: currentUser?.name || 'Faculty Lead',
      });
      onClose();
    } catch (err: any) {
      alert(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: '620px' }}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="plus" size={20} />
            <span>Create New College Event</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <Icon name="xCircle" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Event Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. CodeSprint 24H Hackathon"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="Technical">Technical</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Symposium">Symposium</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Total Seats / Capacity *</label>
                <input
                  type="number"
                  className="form-control"
                  min="5"
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Start Time *</label>
                <input type="text" className="form-control" placeholder="09:00 AM" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">End Time *</label>
                <input type="text" className="form-control" placeholder="04:30 PM" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Campus Venue *</label>
                <input type="text" className="form-control" placeholder="e.g. Centenary Auditorium" value={venue} onChange={(e) => setVenue(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Hosting Department *</label>
                <input type="text" className="form-control" placeholder="e.g. Information Technology" value={department} onChange={(e) => setDepartment(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Registration Deadline (Optional)</label>
              <input type="text" className="form-control" placeholder="YYYY-MM-DD HH:MM (e.g. 2026-11-20 18:00)" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea className="form-control" rows={2} placeholder="Event overview, learning outcomes, mentors..." value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Participation Rules (one per line)</label>
              <textarea className="form-control" rows={2} value={rules} onChange={(e) => setRules(e.target.value)} />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Event to CampusPulse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EditEventModalProps {
  event: CollegeEvent;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({ event, onClose, onSubmit }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [category, setCategory] = useState(event.category);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [venue, setVenue] = useState(event.venue);
  const [department, setDepartment] = useState(event.department || '');
  const [totalSeats, setTotalSeats] = useState(event.total_seats);
  const [status, setStatus] = useState(event.status);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        title,
        description,
        category,
        date,
        time,
        venue,
        department,
        total_seats: Number(totalSeats),
        status,
      });
      onClose();
    } catch (err: any) {
      alert(err.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <div className="modal-title">Edit Event Details</div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <Icon name="xCircle" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Event Title *</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Status *</label>
                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Registration Open">Registration Open</option>
                  <option value="Fully Booked">Fully Booked</option>
                  <option value="Postponed">Postponed</option>
                  <option value="Venue Changed">Venue Changed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Time *</label>
                <input type="text" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Venue *</label>
                <input type="text" className="form-control" value={venue} onChange={(e) => setVenue(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Total Seats *</label>
                <input type="number" className="form-control" value={totalSeats} onChange={(e) => setTotalSeats(Number(e.target.value))} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea className="form-control" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface PostponeModalProps {
  event: CollegeEvent;
  onClose: () => void;
  onSubmit: (newDate: string, newTime: string, reason: string) => Promise<void>;
}

export const PostponeModal: React.FC<PostponeModalProps> = ({ event, onClose, onSubmit }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState(event.time);
  const [reason, setReason] = useState('Clash with semester examination schedule');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(newDate, newTime, reason);
      onClose();
    } catch (err: any) {
      alert(err.message || 'Failed to postpone event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="clock" size={20} />
            <span>Postpone / Reschedule Event</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <Icon name="xCircle" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Rescheduling will update the event date in the database, adjust registered student countdowns, and generate live notifications for all attendees.
            </p>

            <div className="form-group">
              <label className="form-label">Event</label>
              <input type="text" className="form-control" value={event.title} disabled style={{ background: '#F1F5F9' }} />
            </div>

            <div className="form-group">
              <label className="form-label">Current Scheduled Date</label>
              <input type="text" className="form-control" value={`${event.date} • ${event.time}`} disabled style={{ background: '#F1F5F9' }} />
            </div>

            <div className="form-group">
              <label className="form-label">Revised Event Date *</label>
              <input type="date" className="form-control" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Revised Timing</label>
              <input type="text" className="form-control" value={newTime} onChange={(e) => setNewTime(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Postponement *</label>
              <textarea className="form-control" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} required />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Postponement & Notify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ChangeVenueModalProps {
  event: CollegeEvent;
  onClose: () => void;
  onSubmit: (newVenue: string, reason: string) => Promise<void>;
}

export const ChangeVenueModal: React.FC<ChangeVenueModalProps> = ({ event, onClose, onSubmit }) => {
  const [newVenue, setNewVenue] = useState('');
  const [reason, setReason] = useState('Relocated for higher seating capacity and AV equipment');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(newVenue, reason);
      onClose();
    } catch (err: any) {
      alert(err.message || 'Failed to change venue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="mapPin" size={20} />
            <span>Relocate Event Venue</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <Icon name="xCircle" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Event</label>
              <input type="text" className="form-control" value={event.title} disabled style={{ background: '#F1F5F9' }} />
            </div>

            <div className="form-group">
              <label className="form-label">Current Venue</label>
              <input type="text" className="form-control" value={event.venue} disabled style={{ background: '#F1F5F9' }} />
            </div>

            <div className="form-group">
              <label className="form-label">New Venue *</label>
              <input type="text" className="form-control" placeholder="e.g. Mechanical Seminar Hall 2" value={newVenue} onChange={(e) => setNewVenue(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Venue Relocation *</label>
              <textarea className="form-control" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} required />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Venue Relocation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CancelEventModalProps {
  event: CollegeEvent;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void>;
}

export const CancelEventModal: React.FC<CancelEventModalProps> = ({ event, onClose, onSubmit }) => {
  const [reason, setReason] = useState('Administrative rescheduling required');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(reason);
      onClose();
    } catch (err: any) {
      alert(err.message || 'Failed to cancel event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div className="modal-title" style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="xCircle" size={20} />
            <span>Cancel Event</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <Icon name="xCircle" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <p style={{ fontSize: '0.875rem', color: '#DC2626', fontWeight: 600, marginBottom: '1rem' }}>
              Cancelling this event will halt all registrations and dispatch cancellation alerts to registered students.
            </p>

            <div className="form-group">
              <label className="form-label">Event</label>
              <input type="text" className="form-control" value={event.title} disabled style={{ background: '#F1F5F9' }} />
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Cancellation *</label>
              <textarea className="form-control" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} required />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Dismiss</button>
            <button type="submit" className="btn-danger" disabled={loading}>
              {loading ? 'Cancelling...' : 'Confirm Cancellation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface RosterModalProps {
  event: CollegeEvent;
  roster: any[];
  onClose: () => void;
}

export const RosterModal: React.FC<RosterModalProps> = ({ event, roster, onClose }) => {
  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{event.title} — Registration Roster</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {roster.length} Verified Student Registrations
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <Icon name="xCircle" size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {roster.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No students have registered for this event yet.
            </div>
          ) : (
            <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '8px' }}>Student</th>
                  <th style={{ padding: '8px' }}>Reg No</th>
                  <th style={{ padding: '8px' }}>Ticket ID</th>
                  <th style={{ padding: '8px' }}>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((r, i) => (
                  <tr key={r.registration_id || i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '8px' }}>
                      <div style={{ fontWeight: 700 }}>{r.student_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.student_email}</div>
                    </td>
                    <td style={{ padding: '8px', fontWeight: 600 }}>{r.student_reg_no || 'N/A'}</td>
                    <td style={{ padding: '8px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)' }}>{r.ticket_id}</td>
                    <td style={{ padding: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.registration_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-outline" onClick={() => window.print()} type="button">Print Roster</button>
          <button className="btn-primary" onClick={onClose} type="button">Close</button>
        </div>
      </div>
    </div>
  );
};

