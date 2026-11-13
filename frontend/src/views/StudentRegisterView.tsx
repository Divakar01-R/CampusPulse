import React, { useState } from 'react';
import { Icon } from '../components/Icons';
import { registerUser } from '../api';
import { User } from '../types';

interface StudentRegisterViewProps {
  onRegisterSuccess: (user: User) => void;
  onNavigate: (route: string) => void;
  onShowToast: (title: string, message: string, type?: string) => void;
}

export const StudentRegisterView: React.FC<StudentRegisterViewProps> = ({
  onRegisterSuccess,
  onNavigate,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [regNo, setRegNo] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState('1st Year');
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
        role: 'student',
        name,
        email,
        student_reg_no: regNo,
        department,
        year_of_study: yearOfStudy,
        phone,
        password,
        confirm_password: confirmPassword,
      });
      onShowToast('Account Created! 🎉', `Welcome to CampusPulse, ${res.user.name}!`, 'success');
      onRegisterSuccess(res.user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed');
      onShowToast('Registration Failed', err.message || 'Could not register student account', 'cancel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '580px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div className="brand-icon-box" style={{ width: '38px', height: '38px' }}>
            <Icon name="user" size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Student Registration</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Create your official collegiate attendee account</p>
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
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">College Email *</label>
              <input
                type="email"
                className="form-control"
                placeholder="john.doe@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Student Register No *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 2024CS1092"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="AI & Data Science">AI & Data Science</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Year of Study *</label>
              <select className="form-control" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} required>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 (555) 123-4567"
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

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Registering Account...' : 'Create Student Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <a href="#" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>
            Sign In here
          </a>
        </div>
      </div>
    </div>
  );
};

