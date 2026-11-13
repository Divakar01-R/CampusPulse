import React from 'react';
import { Icon } from './Icons';
import { User } from '../types';

interface TopbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onFocusSearch: () => void;
  unreadCount: number;
  currentUser: User | null;
  onNavigate: (route: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  searchQuery,
  setSearchQuery,
  onFocusSearch,
  unreadCount,
  currentUser,
  onNavigate,
}) => {
  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="topbar">
      <div className="search-container">
        <Icon name="search" size={18} className="text-muted" />
        <input
          type="text"
          className="search-input"
          placeholder="Search events by title, description, venue, department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={onFocusSearch}
          autoComplete="off"
          spellCheck={false}
        />
        {searchQuery ? (
          <button
            type="button"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
            onClick={() => setSearchQuery('')}
            title="Clear Search"
          >
            <Icon name="xCircle" size={16} />
          </button>
        ) : (
          <span className="search-kbd">⌘K</span>
        )}
      </div>

      <div className="topbar-actions">
        <div className="date-pill">
          <Icon name="calendar" size={16} />
          <span>{currentDateStr}</span>
        </div>

        {/* Notifications Icon with Unread Badge */}
        <div
          className="icon-btn-round"
          title="Event Updates & Alerts"
          onClick={() => onNavigate('updates')}
          role="button"
          tabIndex={0}
        >
          <Icon name="bell" size={18} />
          {unreadCount > 0 && <span className="badge-dot" />}
        </div>

        {/* Profile Card / Shortcut */}
        {currentUser && (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
            onClick={() => onNavigate('profile')}
            role="button"
            tabIndex={0}
          >
            <img
              src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`}
              className="user-avatar"
              style={{ width: '36px', height: '36px' }}
              alt={currentUser.name}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                {currentUser.role === 'faculty' || currentUser.role === 'organiser'
                  ? currentUser.designation || 'Faculty Member'
                  : currentUser.year_of_study || 'Student'}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

