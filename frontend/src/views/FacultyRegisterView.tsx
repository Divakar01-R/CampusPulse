import React, { useState } from 'react';
import { Icon } from '../components/Icons';
import { registerUser } from '../api';
import { User } from '../types';

interface FacultyRegisterViewProps {
  onRegisterSuccess: (user: User) => void;
  onNavigate: (route: string) => void;
  onShowToast: (title: string, message: string, type?: string) => void;
}

export const FacultyRegisterView: React.FC<FacultyRegisterViewProps> = ({
  onRegisterSuccess,
  onNavigate,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
        role: 'faculty',
        name,
        email,
        faculty_id: facultyId,
        department,
        designation,
        phone,
        password,
        confirm_password: confirmPassword,
      });
      onShowToast('Faculty Account Created! 🎓', `Welcome to CampusPulse Faculty Portal, ${res.user.name}!`, 'success');
      onRegisterSuccess(res.user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed');
      onShowToast('Registration Failed', err.message || 'Could not register faculty account', 'cancel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '580px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div className="brand-icon-box" style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #10B981, #059669)' }}>
            <Icon name="award" size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Faculty & Organizer Registration</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Create an authorized event manager / departmental organizer account</p>
          </div>
        </div>

        {errorMessage && (
          <div style={{ background: 'var(--status-red-bg)', color: 'var(--status-red-text)', border: '1px solid var(--status-red-border)', borderRadius: '10px', padding: '0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Dr. Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Official College Email *</label>
              <input
                type="email"
                className="form-control"
                placeholder="sarah.jenkins@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Faculty ID *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. FAC-2024-089"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
                <option value="Physics & Mathematics">Physics & Mathematics</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Designation *</label>
              <select
                className="form-control"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              >
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Head of Department">Head of Department</option>
                <option value="Faculty Advisor">Faculty Advisor</option>
                <option value="Event Coordinator">Event Coordinator</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 (555) 234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                className="form-control"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.875rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Icon name="clock" size={16} /> Creating Faculty Account...
                </>
              ) : (
                <>
                  <Icon name="check-circle" size={16} /> Create Faculty Account
                </>
              )}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

