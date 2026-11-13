import React, { useState, useEffect, useCallback } from 'react';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { TicketModal, EventDetailsModal } from './components/Modals';
import {
  CreateEventModal,
  EditEventModal,
  PostponeModal,
  ChangeVenueModal,
  CancelEventModal,
  RosterModal,
} from './components/FacultyModals';
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { StudentRegisterView } from './views/StudentRegisterView';
import { FacultyRegisterView } from './views/FacultyRegisterView';
import { DashboardView } from './views/DashboardView';
import { AllEventsView } from './views/AllEventsView';
import { MyRegistrationsView } from './views/MyRegistrationsView';
import { EventUpdatesView } from './views/EventUpdatesView';
import { RemindersView } from './views/RemindersView';
import { ProfileView } from './views/ProfileView';
import { FacultyPortalView } from './views/FacultyPortalView';
import { MobileSimulatorView } from './views/MobileSimulatorView';
import { Icon } from './components/Icons';
import { User, CollegeEvent, Registration, NotificationItem } from './types';
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  fetchEvents,
  fetchMyRegistrations,
  createRegistration,
  cancelRegistration,
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  createEvent,
  updateEvent,
  postponeEvent,
  changeEventVenue,
  cancelEvent,
  deleteEvent,
  fetchEventRoster,
  loginUser,
} from './api';

interface ToastItem {
  id: number;
  title: string;
  message: string;
  type: string;
}

export default function App() {
  const [currentUserState, setCurrentUserState] = useState<User | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');
  const [events, setEvents] = useState<CollegeEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Modals state
  const [modalType, setModalType] = useState<
    'ticket' | 'details' | 'create' | 'edit' | 'postpone' | 'venue' | 'cancel' | 'roster' | null
  >(null);
  const [selectedEvent, setSelectedEvent] = useState<CollegeEvent | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [rosterData, setRosterData] = useState<any[]>([]);

  // Toast Helper
  const showToast = useCallback((title: string, message: string, type: string = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  // Initial Data Loading
  const loadData = useCallback(async (user: User | null) => {
    try {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);

      const fetchedNotifs = await fetchNotifications();
      setNotifications(fetchedNotifs);

      if (user) {
        try {
          const myRegs = await fetchMyRegistrations();
          setRegistrations(myRegs);
        } catch {
          setRegistrations([]);
        }
      } else {
        setRegistrations([]);
      }
    } catch (err: any) {
      console.error('Failed to load initial data:', err);
    }
  }, []);

  // Initialize User Session on Mount
  useEffect(() => {
    const initSession = async () => {
      let user = getCurrentUser();
      if (!user) {
        // Auto-seed demo student session so the user gets instant interactive experience
        try {
          const res = await loginUser('alex.morgan@college.edu', 'Password123!');
          user = res.user;
          if (user) setCurrentUser(user);
        } catch {
          // If login fails, create fallback user object
          user = {
            id: 1,
            name: 'Alex Morgan',
            email: 'alex.morgan@college.edu',
            role: 'student',
            student_reg_no: 'STU-2024-001',
            department: 'Computer Science & Engineering',
            year_of_study: '3rd Year',
            phone: '+1 (555) 019-2834',
          };
          setCurrentUser(user);
        }
      }
      setCurrentUserState(user);
      loadData(user);
    };

    initSession();
  }, [loadData]);

  // Handle Search Input Change without losing focus
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // If user begins typing while not on events or dashboard, navigate to events
    if (query.trim().length > 0 && currentRoute !== 'events' && currentRoute !== 'dashboard') {
      setCurrentRoute('events');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // User Authentication Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUserState(user);
    setCurrentUser(user);
    loadData(user);
    showToast('Signed In', `Welcome back, ${user.name}!`, 'success');
    if (user.role === 'faculty') {
      setCurrentRoute('organiser');
    } else {
      setCurrentRoute('dashboard');
    }
  };

  const handleRegisterSuccess = (user: User) => {
    setCurrentUserState(user);
    setCurrentUser(user);
    loadData(user);
    showToast('Registration Successful', `Welcome to CampusPulse, ${user.name}!`, 'success');
    if (user.role === 'faculty') {
      setCurrentRoute('organiser');
    } else {
      setCurrentRoute('dashboard');
    }
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUserState(null);
    setRegistrations([]);
    showToast('Signed Out', 'You have been safely signed out.', 'info');
    setCurrentRoute('landing');
  };

  // Student Event Registration
  const handleRegisterForEvent = async (eventId: string | number) => {
    if (!currentUserState) {
      showToast('Login Required', 'Please sign in to register for events.', 'cancel');
      setCurrentRoute('login');
      return;
    }

    try {
      const res = await createRegistration(eventId);
      showToast('Registration Confirmed! 🎟️', `Your pass #${res.registration.ticket_id} has been generated.`, 'success');

      // Update local state
      setRegistrations((prev) => [res.registration, ...prev]);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? { ...e, registered_count: (e.registered_count || 0) + 1 }
            : e
        )
      );

      // Open digital admission ticket
      setSelectedRegistration(res.registration);
      setModalType('ticket');
    } catch (err: any) {
      showToast('Registration Error', err.message || 'Could not register for event', 'cancel');
    }
  };

  // Cancel Event Registration
  const handleCancelRegistration = async (regId: string | number) => {
    try {
      const reg = registrations.find((r) => r.id === regId);
      await cancelRegistration(regId);
      showToast('Registration Cancelled', 'Your admission pass has been revoked and the seat restored.', 'info');

      setRegistrations((prev) => prev.filter((r) => r.id !== regId));
      if (reg) {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === reg.event_id
              ? { ...e, registered_count: Math.max(0, (e.registered_count || 1) - 1) }
              : e
          )
        );
      }
    } catch (err: any) {
      showToast('Error', err.message || 'Could not cancel registration', 'cancel');
    }
  };

  // Notifications
  const handleMarkAsRead = async (notifId: string | number) => {
    try {
      await markNotificationRead(notifId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, is_read: true } : n))
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      showToast('Notifications Cleared', 'All updates marked as read.', 'success');
    } catch (err: any) {
      console.error(err);
    }
  };

  // Faculty Event Management Handlers
  const handleCreateEventSubmit = async (formData: any) => {
    try {
      const res = await createEvent(formData);
      showToast('Event Published! 🎉', `"${res.event.title}" is now open for registration.`, 'success');
      setEvents((prev) => [res.event, ...prev]);
      // Reload notifications as new event alerts are generated
      const updatedNotifs = await fetchNotifications();
      setNotifications(updatedNotifs);
    } catch (err: any) {
      showToast('Failed to Create Event', err.message || 'Error occurred', 'cancel');
      throw err;
    }
  };

  const handleEditEventSubmit = async (formData: any) => {
    if (!selectedEvent) return;
    try {
      const res = await updateEvent(selectedEvent.id, formData);
      showToast('Event Updated', `Changes to "${res.event.title}" saved.`, 'success');
      setEvents((prev) => prev.map((e) => (e.id === res.event.id ? res.event : e)));
    } catch (err: any) {
      showToast('Update Failed', err.message || 'Could not update event', 'cancel');
      throw err;
    }
  };

  const handlePostponeEventSubmit = async (newDate: string, newTime: string, reason: string) => {
    if (!selectedEvent) return;
    try {
      const res = await postponeEvent(selectedEvent.id, newDate, newTime, reason);
      showToast('Schedule Postponed ⚠️', `Event rescheduled to ${newDate} at ${newTime}. Attendees notified.`, 'warning');
      setEvents((prev) => prev.map((e) => (e.id === res.event.id ? res.event : e)));
      const updatedNotifs = await fetchNotifications();
      setNotifications(updatedNotifs);
    } catch (err: any) {
      showToast('Postpone Failed', err.message || 'Error occurred', 'cancel');
      throw err;
    }
  };

  const handleChangeVenueSubmit = async (newVenue: string, reason: string) => {
    if (!selectedEvent) return;
    try {
      const res = await changeEventVenue(selectedEvent.id, newVenue, reason);
      showToast('Venue Relocated 📍', `Event relocated to ${newVenue}. Attendees notified.`, 'info');
      setEvents((prev) => prev.map((e) => (e.id === res.event.id ? res.event : e)));
      const updatedNotifs = await fetchNotifications();
      setNotifications(updatedNotifs);
    } catch (err: any) {
      showToast('Relocation Failed', err.message || 'Error occurred', 'cancel');
      throw err;
    }
  };

  const handleCancelEventSubmit = async (reason: string) => {
    if (!selectedEvent) return;
    try {
      const res = await cancelEvent(selectedEvent.id, reason);
      showToast('Event Cancelled ⛔', `"${selectedEvent.title}" has been cancelled and notifications sent.`, 'cancel');
      setEvents((prev) => prev.map((e) => (e.id === res.event.id ? res.event : e)));
      const updatedNotifs = await fetchNotifications();
      setNotifications(updatedNotifs);
    } catch (err: any) {
      showToast('Cancellation Failed', err.message || 'Error occurred', 'cancel');
      throw err;
    }
  };

  const handleDeleteEventSubmit = async (eventId: string | number) => {
    try {
      await deleteEvent(eventId);
      showToast('Event Deleted', 'Event permanently removed from database.', 'info');
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err: any) {
      showToast('Deletion Failed', err.message || 'Error occurred', 'cancel');
    }
  };

  const handleOpenRoster = async (ev: CollegeEvent) => {
    setSelectedEvent(ev);
    try {
      const roster = await fetchEventRoster(ev.id);
      setRosterData(roster);
      setModalType('roster');
    } catch (err: any) {
      showToast('Roster Error', err.message || 'Could not load roster', 'cancel');
    }
  };

  // Full-page views that don't need the dashboard sidebar
  if (currentRoute === 'landing') {
    return (
      <LandingView
        onNavigate={(route) => setCurrentRoute(route)}
        currentUser={currentUserState}
      />
    );
  }

  if (currentRoute === 'login') {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onNavigate={(route) => setCurrentRoute(route)}
        onShowToast={showToast}
      />
    );
  }

  if (currentRoute === 'register-student') {
    return (
      <StudentRegisterView
        onRegisterSuccess={handleRegisterSuccess}
        onNavigate={(route) => setCurrentRoute(route)}
        onShowToast={showToast}
      />
    );
  }

  if (currentRoute === 'register-faculty') {
    return (
      <FacultyRegisterView
        onRegisterSuccess={handleRegisterSuccess}
        onNavigate={(route) => setCurrentRoute(route)}
        onShowToast={showToast}
      />
    );
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="app-layout">
      {/* SIDEBAR NAVIGATION (Pages 3, 4, 5, etc.) */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={(route) => setCurrentRoute(route)}
        currentUser={currentUserState}
        unreadCount={unreadCount}
        registrationsCount={registrations.length}
        onLogout={handleLogout}
        onRequestNotificationPermission={() => {
          showToast('Alerts Enabled', 'Browser push notifications have been activated for event updates.', 'success');
        }}
      />

      <div className="main-wrapper">
        {/* TOPBAR WITH SEARCH INPUT (Controlled React component, maintains focus!) */}
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          onFocusSearch={() => {
            if (currentRoute !== 'events' && currentRoute !== 'dashboard') {
              setCurrentRoute('events');
            }
          }}
          unreadCount={unreadCount}
          currentUser={currentUserState}
          onNavigate={(route) => setCurrentRoute(route)}
        />

        {/* MAIN BODY CONTENT */}
        <main className="page-body">
          {currentRoute === 'dashboard' && (
            <DashboardView
              user={currentUserState || { id: 0, name: 'Student', email: '', role: 'student' }}
              events={events}
              registrations={registrations}
              notifications={notifications}
              onViewEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('details');
              }}
              onViewTicket={(reg) => {
                setSelectedRegistration(reg);
                setModalType('ticket');
              }}
              onRegisterEvent={handleRegisterForEvent}
              onNavigate={(route) => setCurrentRoute(route)}
              onShowToast={showToast}
            />
          )}

          {currentRoute === 'events' && (
            <AllEventsView
              events={events}
              registrations={registrations}
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
              onViewEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('details');
              }}
              onViewTicket={(reg) => {
                setSelectedRegistration(reg);
                setModalType('ticket');
              }}
              onRegisterEvent={handleRegisterForEvent}
            />
          )}

          {currentRoute === 'registrations' && (
            <MyRegistrationsView
              events={events}
              registrations={registrations}
              onViewEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('details');
              }}
              onViewTicket={(reg) => {
                setSelectedRegistration(reg);
                setModalType('ticket');
              }}
              onCancelRegistration={handleCancelRegistration}
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}

          {currentRoute === 'updates' && (
            <EventUpdatesView
              notifications={notifications}
              events={events}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onViewEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('details');
              }}
            />
          )}

          {currentRoute === 'reminders' && (
            <RemindersView
              events={events}
              registrations={registrations}
              onViewEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('details');
              }}
              onViewTicket={(reg) => {
                setSelectedRegistration(reg);
                setModalType('ticket');
              }}
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}

          {currentRoute === 'profile' && currentUserState && (
            <ProfileView
              user={currentUserState}
              registrations={registrations}
              onNavigate={(route) => setCurrentRoute(route)}
              onLogout={handleLogout}
            />
          )}

          {currentRoute === 'organiser' && (
            <FacultyPortalView
              user={currentUserState || { id: 0, name: 'Faculty Lead', email: '', role: 'faculty' }}
              events={events}
              onCreateEvent={() => setModalType('create')}
              onEditEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('edit');
              }}
              onPostponeEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('postpone');
              }}
              onChangeVenue={(ev) => {
                setSelectedEvent(ev);
                setModalType('venue');
              }}
              onCancelEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('cancel');
              }}
              onViewRoster={handleOpenRoster}
              onDeleteEvent={handleDeleteEventSubmit}
            />
          )}

          {currentRoute === 'mobile' && (
            <MobileSimulatorView
              user={currentUserState || { id: 0, name: 'Alex Morgan', email: '', role: 'student' }}
              events={events}
              registrations={registrations}
              notifications={notifications}
              onViewEvent={(ev) => {
                setSelectedEvent(ev);
                setModalType('details');
              }}
              onViewTicket={(reg) => {
                setSelectedRegistration(reg);
                setModalType('ticket');
              }}
              onRegisterEvent={handleRegisterForEvent}
            />
          )}
        </main>
      </div>

      {/* MODAL DIALOGS */}
      {modalType === 'ticket' && selectedRegistration && (
        <TicketModal
          registration={selectedRegistration}
          user={currentUserState}
          onClose={() => {
            setModalType(null);
            setSelectedRegistration(null);
          }}
        />
      )}

      {modalType === 'details' && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isRegistered={registrations.some((r) => r.event_id === selectedEvent.id)}
          onRegister={() => {
            handleRegisterForEvent(selectedEvent.id);
            setModalType(null);
          }}
          onViewTicket={() => {
            const reg = registrations.find((r) => r.event_id === selectedEvent.id);
            if (reg) {
              setSelectedRegistration(reg);
              setModalType('ticket');
            }
          }}
          onClose={() => {
            setModalType(null);
            setSelectedEvent(null);
          }}
        />
      )}

      {modalType === 'create' && (
        <CreateEventModal
          currentUser={currentUserState}
          onClose={() => setModalType(null)}
          onSubmit={handleCreateEventSubmit}
        />
      )}

      {modalType === 'edit' && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => {
            setModalType(null);
            setSelectedEvent(null);
          }}
          onSubmit={handleEditEventSubmit}
        />
      )}

      {modalType === 'postpone' && selectedEvent && (
        <PostponeModal
          event={selectedEvent}
          onClose={() => {
            setModalType(null);
            setSelectedEvent(null);
          }}
          onSubmit={handlePostponeEventSubmit}
        />
      )}

      {modalType === 'venue' && selectedEvent && (
        <ChangeVenueModal
          event={selectedEvent}
          onClose={() => {
            setModalType(null);
            setSelectedEvent(null);
          }}
          onSubmit={handleChangeVenueSubmit}
        />
      )}

      {modalType === 'cancel' && selectedEvent && (
        <CancelEventModal
          event={selectedEvent}
          onClose={() => {
            setModalType(null);
            setSelectedEvent(null);
          }}
          onSubmit={handleCancelEventSubmit}
        />
      )}

      {modalType === 'roster' && selectedEvent && (
        <RosterModal
          event={selectedEvent}
          roster={rosterData}
          onClose={() => {
            setModalType(null);
            setSelectedEvent(null);
          }}
        />
      )}

      {/* TOAST NOTIFICATIONS */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast-alert">
            <Icon
              name={
                t.type === 'success'
                  ? 'check-circle'
                  : t.type === 'cancel'
                  ? 'alert-triangle'
                  : t.type === 'warning'
                  ? 'clock'
                  : 'info'
              }
              size={20}
              color={
                t.type === 'success'
                  ? '#10B981'
                  : t.type === 'cancel'
                  ? '#DC2626'
                  : t.type === 'warning'
                  ? '#D97706'
                  : 'var(--primary)'
              }
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                {t.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
