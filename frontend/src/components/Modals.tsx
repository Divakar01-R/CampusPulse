import React, { useState } from 'react';
import { Icon } from './Icons';
import { CollegeEvent, Registration, User } from '../types';
import { generateQRCodeSVG } from '../utils/qr';

interface TicketModalProps {
  registration: Registration;
  user: User | null;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ registration, user, onClose }) => {
  const qrSvg = generateQRCodeSVG(registration.qr_code_data || registration.ticket_id, 160);

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="ticket" size={20} />
            <span>Digital Event Admission Pass</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <Icon name="xCircle" size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="ticket-wrapper">
            <div className="ticket-top">
              <div className="ticket-notch-left" />
              <div className="ticket-notch-right" />
              <div style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                CampusPulse Official Pass
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.2 }}>{registration.event_title}</div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.95 }}>
                Ticket ID: <strong>{registration.ticket_id}</strong>
              </div>
            </div>

            <div className="ticket-body">
              <div className="qr-code-box" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Scan at entrance venue terminal for verified check-in
              </div>

              <div style={{ background: '#F8F7FE', borderRadius: '12px', padding: '1rem', textAlign: 'left', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Attendee:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{user?.name || registration.student_name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Department:</span>
                  <strong>{user?.department || 'Engineering'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Event Date:</span>
                  <strong>{registration.event_date}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Timing:</span>
                  <strong>{registration.event_time}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Venue:</span>
                  <strong style={{ color: 'var(--primary)' }}>{registration.venue}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-outline" onClick={() => window.print()} type="button">
            <Icon name="printer" size={16} /> Print Pass
          </button>
          <button className="btn-primary" onClick={onClose} type="button">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

interface EventDetailsModalProps {
  event: CollegeEvent;
  isRegistered: boolean;
  onRegister: () => void;
  onViewTicket: () => void;
  onClose: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isRegistered,
  onRegister,
  onViewTicket,
  onClose,
}) => {
  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-upcoming">{event.status}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              {event.category}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <Icon name="xCircle" size={20} />
          </button>
        </div>

        <div className="modal-body">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
            {event.title}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {event.description}
          </p>

          <div style={{ background: '#F8F7FE', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Date & Time</span>
              <strong>{event.date} • {event.time}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Venue</span>
              <strong style={{ color: 'var(--primary)' }}>{event.venue}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Organizer</span>
              <strong>{event.organizer_name}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Available Seats</span>
              <strong>{event.available_seats} remaining of {event.total_seats}</strong>
            </div>
          </div>

          <div style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.65rem' }}>
            Participation Guidelines & Rules:
          </div>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {(event.rules && event.rules.length > 0 ? event.rules : [
              'Bring valid college photo ID card',
              'Arrive at venue 15 minutes prior to scheduled start',
              'Certificate issued upon session completion'
            ]).map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose} type="button">Close</button>
          {isRegistered ? (
            <button className="btn-secondary" onClick={onViewTicket} type="button">
              <Icon name="ticket" size={16} /> View Confirmed Pass
            </button>
          ) : (
            <button
              className="btn-primary"
              disabled={event.available_seats === 0 || event.status === 'Cancelled'}
              style={{ opacity: (event.available_seats === 0 || event.status === 'Cancelled') ? 0.5 : 1 }}
              onClick={onRegister}
              type="button"
            >
              {event.status === 'Cancelled' ? 'Cancelled' : event.available_seats === 0 ? 'Fully Booked' : 'Register for Event'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

