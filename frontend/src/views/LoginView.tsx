import React, { useState } from 'react';
import { Icon } from '../components/Icons';
import { loginUser } from '../api';
import { User } from '../types';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (route: string) => void;
  onShowToast: (title: string, message: string, type?: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onNavigate, onShowToast }) => {
  const [role, setRole] = useState<'student' | 'faculty'>('student');
  const [email, setEmail] = useState('alex.morgan@college.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSwitch = (newRole: 'student' | 'faculty') => {
    setRole(newRole);
    setErrorMessage('');
    if (newRole === 'student') {
      setEmail('alex.morgan@college.edu');
      setPassword('password123');
    } else {
      setEmail('sarah.jenkins@college.edu');
      setPassword('password123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await loginUser(email, password, role);
      onShowToast('Welcome back!', `Signed in as ${res.user.name} (${res.user.role})`, 'success');
      onLoginSuccess(res.user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
      onShowToast('Authentication Failed', err.message || 'Invalid email or password', 'cancel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      {/* Left Branding & Value Prop Banner (PDF Page 2) */}
      <div className="login-left-banner">
        <div className="circle-blur-1" />

        <div>
          <div className="brand-logo" style={{ paddingLeft: 0 }}>
            <div className="brand-icon-box" style={{ background: 'rgba(255,255,255,0.25)' }}>
              <Icon name="activity" size={24} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>CampusPulse</span>
          </div>

          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.15, color: '#FFFFFF', marginTop: '2.5rem', maxWidth: '440px' }}>
            Never miss a campus event again.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginTop: '1rem', maxWidth: '400px', lineHeight: 1.6 }}>
            Centralized college event hub with automated change tracking and smart reminders.
          </p>
        </div>

        {/* Feature Bullets from PDF Page 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '3rem 0', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.12)', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="clock" size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Smart Reminders</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>1-day, 1-hour & 10-minute automated alerts</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.12)', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="bell" size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Live Event Updates</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Instant push notifications for venue & schedule changes</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.12)', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="calendar" size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>My Schedule</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Interactive monthly calendar & digital QR tickets</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
          © 2026 CampusPulse System • College Event Platform
        </div>
      </div>

      {/* Right Form Panel (PDF Page 2) */}
      <div className="login-right-form">
        <div className="login-card-inner">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Welcome back 👋
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.75rem' }}>
            Select your role and enter your college credentials
          </p>

          {/* Role Selector Pills */}
          <div className="role-selector-pills">
            <button
              className={`role-pill-btn ${role === 'student' ? 'active' : ''}`}
              onClick={() => handleRoleSwitch('student')}
              type="button"
            >
              <Icon name="user" size={16} /> Student
            </button>
            <button
              className={`role-pill-btn ${role === 'faculty' ? 'active' : ''}`}
              onClick={() => handleRoleSwitch('faculty')}
              type="button"
            >
              <Icon name="shield" size={16} /> Faculty / Organiser
            </button>
          </div>

          {/* Demo Account Autofill Button */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div
              className="demo-account-chip"
              onClick={() => handleRoleSwitch('student')}
              role="button"
              tabIndex={0}
            >
              <Icon name="sparkles" size={14} /> Student Demo (Alex)
            </div>
            <div
              className="demo-account-chip"
              onClick={() => handleRoleSwitch('faculty')}
              role="button"
              tabIndex={0}
            >
              <Icon name="sparkles" size={14} /> Faculty Demo (Prof. Sarah)
            </div>
          </div>

          {errorMessage && (
            <div style={{ background: 'var(--status-red-bg)', color: 'var(--status-red-text)', border: '1px solid var(--status-red-border)', borderRadius: '10px', padding: '0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                {role === 'student' ? 'College Student Email' : 'Official Faculty Email'}
              </label>
              <div className="input-with-icon">
                <span className="input-icon-left"><Icon name="mail" size={18} /></span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <a
                  href="#"
                  style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}
                  onClick={(e) => {
                    e.preventDefault();
                    onShowToast('Password Reset', 'A reset link has been dispatched to your college email.');
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="input-with-icon">
                <span className="input-icon-left"><Icon name="lock" size={18} /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> Remember me
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }} disabled={loading}>
              {loading ? 'Authenticating...' : `Sign In as ${role === 'student' ? 'Student' : 'Faculty'} `}
              <Icon name="arrowRight" size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            <button
              type="button"
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
              onClick={handleSubmit}
            >
              <Icon name="shield" size={18} /> College Single Sign-On (SSO)
            </button>
          </form>

          {/* Registration Links */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <a
                href="#"
                style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}
                onClick={(e) => { e.preventDefault(); onNavigate('register-student'); }}
              >
                Register as Student
              </a>
              <span>•</span>
              <a
                href="#"
                style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}
                onClick={(e) => { e.preventDefault(); onNavigate('register-faculty'); }}
              >
                Register as Faculty
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

