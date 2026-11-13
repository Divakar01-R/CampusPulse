import React from 'react';
import { Icon } from '../components/Icons';
import { User, Registration } from '../types';

interface ProfileViewProps {
  user: User;
  registrations: Registration[];
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  registrations,
  onNavigate,
  onLogout,
}) => {
  const isFaculty = user.role === 'faculty';
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.25s ease' }}>
      {/* Profile Header Card */}
      <div className="card" style={{ padding: '2.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(135deg, #5845F5 0%, #8751F5 100%)',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', marginTop: '35px', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '24px',
              background: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(88, 69, 245, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--primary)',
              border: '4px solid #FFFFFF',
            }}
          >
            {initials}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {user.name}
              </h1>
              <span
                className="badge"
                style={{
                  background: isFaculty ? '#ECFDF5' : 'var(--primary-light)',
                  color: isFaculty ? '#059669' : 'var(--primary)',
                  fontWeight: 700,
                }}
              >
                {isFaculty ? 'Faculty / Organizer' : 'Collegiate Student'}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{user.email}</p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onLogout}
            style={{ fontSize: '0.85rem' }}
          >
            <Icon name="log-out" size={15} /> Sign Out
          </button>
        </div>

        {/* Detailed Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
              Department
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {user.department || 'Computer Science & Engineering'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
              {isFaculty ? 'Faculty ID' : 'Student Register Number'}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {isFaculty ? user.faculty_id || 'FAC-2024-089' : user.student_reg_no || 'STU-2024-001'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
              {isFaculty ? 'Designation' : 'Year of Study'}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {isFaculty ? user.designation || 'Assistant Professor' : user.year_of_study || '3rd Year'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
              Phone Contact
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {user.phone || '+1 (555) 019-2834'}
            </div>
          </div>
        </div>
      </div>

      {/* Account Activity Summary */}
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
          Account Activity & Status
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#FAF8FF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E8E5F8', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
              {registrations.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Enrolled Events</div>
          </div>

          <div style={{ background: '#ECFDF5', padding: '1.25rem', borderRadius: '12px', border: '1px solid #A7F3D0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669' }}>
              100%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Verification Level</div>
          </div>

          <div style={{ background: '#EFF6FF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #BFDBFE', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2563EB' }}>
              Active
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Campus Standing</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('registrations')}>
            <Icon name="ticket" size={16} /> View My Passes
          </button>
          {isFaculty && (
            <button type="button" className="btn btn-secondary" onClick={() => onNavigate('organiser')}>
              <Icon name="award" size={16} /> Open Organizer Workspace
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

