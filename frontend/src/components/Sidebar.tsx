import React from 'react';
import { Icon } from './Icons';
import { User } from '../types';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  currentUser: User | null;
  unreadCount: number;
  registrationsCount: number;
  onLogout: () => void;
  onRequestNotificationPermission: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  currentUser,
  unreadCount,
  registrationsCount,
  onLogout,
  onRequestNotificationPermission,
}) => {
  const isFaculty = currentUser?.role === 'faculty' || currentUser?.role === 'organiser';

  return (
    <aside className="sidebar">
      <a
        href="#"
        className="brand-logo"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('dashboard');
        }}
      >
        <div className="brand-icon-box">
          <Icon name="activity" size={22} />
        </div>
        <div>
          <div className="brand-text">CampusPulse</div>
          <div className="brand-tag">Event System</div>
        </div>
      </a>

      <div className="sidebar-nav">
        <a
          href="#"
          className={`nav-item ${currentRoute === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('dashboard');
          }}
        >
          <Icon name="activity" size={18} />
          <span>Dashboard</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentRoute === 'events' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('events');
          }}
        >
          <Icon name="calendar" size={18} />
          <span>All Events</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentRoute === 'registrations' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('registrations');
          }}
        >
          <Icon name="ticket" size={18} />
          <span>My Registrations</span>
          {registrationsCount > 0 && (
            <span className="nav-badge" style={{ background: 'var(--primary)' }}>
              {registrationsCount}
            </span>
          )}
        </a>

        <a
          href="#"
          className={`nav-item ${currentRoute === 'reminders' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('reminders');
          }}
        >
          <Icon name="clock" size={18} />
          <span>Reminders</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentRoute === 'updates' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('updates');
          }}
        >
          <Icon name="bell" size={18} />
          <span>Event Updates</span>
          {unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
        </a>

        <a
          href="#"
          className={`nav-item ${currentRoute === 'profile' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('profile');
          }}
        >
          <Icon name="user" size={18} />
          <span>Profile</span>
        </a>

        <a
          href="#"
          className={`nav-item ${currentRoute === 'mobile' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('mobile');
          }}
        >
          <Icon name="smartphone" size={18} />
          <span>Mobile App</span>
        </a>

        {/* Faculty / Organiser Portal Link */}
        <a
          href="#"
          className={`nav-item ${currentRoute === 'organiser' ? 'active' : ''}`}
          style={{ marginTop: '0.5rem', background: isFaculty ? '#F5F3FF' : undefined }}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('organiser');
          }}
        >
          <Icon name="shield" size={18} style={{ color: 'var(--primary)' }} />
          <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Faculty Portal</span>
        </a>
      </div>

      {/* Promotional Manage Alerts Card (PDF Page 3) */}
      <div className="sidebar-promo-card">
        <div className="promo-title">
          <Icon name="sparkles" size={14} /> Manage Alerts
        </div>
        <div className="promo-desc">
          Get automated desktop push reminders for emergency venue relocations and timing shifts.
        </div>
        <button className="promo-btn" type="button" onClick={onRequestNotificationPermission}>
          Enable Alerts <Icon name="chevronRight" size={14} />
        </button>
      </div>

      {/* User Card at Bottom */}
      {currentUser && (
        <div className="sidebar-user">
          <img
            src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`}
            className="user-avatar"
            alt={currentUser.name}
          />
          <div className="user-info">
            <div className="user-name">{currentUser.name}</div>
            <div className="user-role">
              {isFaculty ? currentUser.designation || 'Faculty Lead' : currentUser.year_of_study || 'Student'}
            </div>
          </div>
          <button className="logout-btn" title="Sign Out" onClick={onLogout} type="button">
            <Icon name="logOut" size={18} />
          </button>
        </div>
      )}
    </aside>
  );
};

