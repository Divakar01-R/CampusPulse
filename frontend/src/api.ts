// CampusPulse API Client - Connects React Frontend to FastAPI Backend

import { User } from './types';

const API_BASE = '/api';
const STORAGE_KEY = 'campuspulse_active_user';

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to save user session:', err);
  }
}

export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear user session:', err);
  }
}

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Failed to reach API health endpoint');
  return res.json();
}

export async function loginUser(email: string, password: string, role?: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Login failed');
  if (data.user) {
    setCurrentUser(data.user);
  }
  return data;
}

export async function registerUser(formData: any) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Registration failed');
  if (data.user) {
    setCurrentUser(data.user);
  }
  return data;
}

export async function fetchEvents(params?: { search?: string; category?: string; status?: string; department?: string }) {
  const url = new URL(`${window.location.origin}${API_BASE}/events`);
  if (params?.search) url.searchParams.set('search', params.search);
  if (params?.category && params.category !== 'All') url.searchParams.set('category', params.category);
  if (params?.status && params.status !== 'All') url.searchParams.set('status', params.status);
  if (params?.department && params.department !== 'All') url.searchParams.set('department', params.department);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function fetchEventById(eventId: string | number) {
  const res = await fetch(`${API_BASE}/events/${eventId}`);
  if (!res.ok) throw new Error('Failed to fetch event details');
  return res.json();
}

export async function createEvent(data: any) {
  const user = getCurrentUser();
  const payload = {
    ...data,
    organizer_id: user ? String(user.id) : data.organizer_id || '1',
    organizer_name: user ? user.name : data.organizer_name || 'Faculty Lead',
  };
  const res = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.detail || 'Failed to create event');
  return resData;
}

export async function updateEvent(eventId: string | number, data: any) {
  const user = getCurrentUser();
  const organizerId = user ? String(user.id) : undefined;
  const url = organizerId ? `${API_BASE}/events/${eventId}?organizer_id=${encodeURIComponent(organizerId)}` : `${API_BASE}/events/${eventId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.detail || 'Failed to update event');
  return resData;
}

export async function postponeEvent(eventId: string | number, newDate: string, newTime: string, reason: string) {
  const user = getCurrentUser();
  const res = await fetch(`${API_BASE}/events/${eventId}/postpone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      faculty_id: user ? String(user.id) : '2',
      new_date: newDate,
      new_time: newTime,
      reason,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Failed to postpone event');
  return data;
}

export async function changeEventVenue(eventId: string | number, newVenue: string, reason: string) {
  const user = getCurrentUser();
  const res = await fetch(`${API_BASE}/events/${eventId}/change-venue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      faculty_id: user ? String(user.id) : '2',
      new_venue: newVenue,
      reason,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Failed to change venue');
  return data;
}

export async function cancelEvent(eventId: string | number, reason: string) {
  const user = getCurrentUser();
  const res = await fetch(`${API_BASE}/events/${eventId}/cancel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      faculty_id: user ? String(user.id) : '2',
      reason,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Failed to cancel event');
  return data;
}

export async function deleteEvent(eventId: string | number) {
  const user = getCurrentUser();
  const facultyId = user ? String(user.id) : '2';
  const url = `${API_BASE}/events/${eventId}?faculty_id=${encodeURIComponent(facultyId)}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.detail || 'Failed to delete event');
  return resData;
}

export async function fetchRegistrations(studentId?: string | number) {
  const user = getCurrentUser();
  const sid = studentId || (user ? user.id : '1');
  const url = `${API_BASE}/registrations/my?student_id=${encodeURIComponent(String(sid))}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch registrations');
  return res.json();
}

export const fetchMyRegistrations = fetchRegistrations;

export async function createRegistration(eventId: string | number) {
  const user = getCurrentUser();
  if (!user) throw new Error('You must be logged in to register for an event');
  const res = await fetch(`${API_BASE}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: String(user.id), event_id: String(eventId) }),
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.detail || 'Registration failed');
  return resData;
}

export const registerForEvent = createRegistration;

export async function cancelRegistration(registrationId: string | number) {
  const res = await fetch(`${API_BASE}/registrations/${registrationId}`, {
    method: 'DELETE',
  });
  const resData = await res.json();
  if (!res.ok) throw new Error(resData.detail || 'Cancellation failed');
  return resData;
}

export async function fetchNotifications(userId?: string | number, filterType?: string) {
  const user = getCurrentUser();
  const uid = userId || (user ? user.id : '1');
  const url = new URL(`${window.location.origin}${API_BASE}/notifications`);
  if (uid) url.searchParams.set('user_id', String(uid));
  if (filterType && filterType !== 'All') url.searchParams.set('filter_type', filterType);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function markNotificationRead(notifId: string | number) {
  const res = await fetch(`${API_BASE}/notifications/${notifId}/read`, {
    method: 'PUT',
  });
  return res.json();
}

export async function markAllNotificationsRead(userId?: string | number) {
  const user = getCurrentUser();
  const uid = userId || (user ? user.id : '1');
  const url = `${API_BASE}/notifications/read-all?user_id=${encodeURIComponent(String(uid))}`;
  const res = await fetch(url, {
    method: 'PUT',
  });
  return res.json();
}

export async function fetchEventRoster(eventId: string | number) {
  const user = getCurrentUser();
  const facultyId = user ? String(user.id) : '2';
  const url = `${API_BASE}/events/${eventId}/registrations?faculty_id=${encodeURIComponent(facultyId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch roster');
  return res.json();
}

export async function fetchHistory(eventId?: string | number) {
  const url = eventId ? `${API_BASE}/history?event_id=${encodeURIComponent(String(eventId))}` : `${API_BASE}/history`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch event history');
  return res.json();
}

export async function fetchUserStats(userId: string | number) {
  const res = await fetch(`${API_BASE}/stats/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
