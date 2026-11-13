# 🎓 CAMPUSPULSE – COLLEGE EVENT MANAGEMENT SYSTEM
> **Tagline:** Never Miss a Campus Event Again.

---

## 🌟 Overview & Design Replication

**CampusPulse** is an end-to-end collegiate event management and smart reminder platform built with exact visual fidelity to the 6-page UI/UX design specifications, powered by a **FastAPI Python backend**, **SQLite persistent database**, and an **interactive, offline-resilient Single-Page Application (SPA)**.

### 🎨 Exact Visual Design System
- **Primary Color:** `#5845F5` (Vibrant Indigo-Purple)
- **Secondary Color:** `#8751F5` (Rich Violet)
- **Accent Gradient:** `linear-gradient(135deg, #5845F5 0%, #8751F5 50%, #A45AF7 100%)`
- **Page Background:** `#F6F4FF` (Ultra-light Lavender)
- **Cards & Surfaces:** `#FFFFFF` with `rounded-2xl` / `rounded-3xl` and soft lavender drop-shadows
- **Typography:** Dark Navy `#191735` with muted metadata in `#77758D`
- **Status Indicator Badges:**
  - 🟢 **Upcoming / Confirmed:** Soft Green (`#ECFDF5`, text `#059669`)
  - 🟡 **Postponed / Rescheduled:** Soft Amber (`#FFFBEB`, text `#D97706`)
  - 🟣 **Venue Changed:** Soft Purple (`#F5F3FF`, text `#7C3AED`)
  - 🔴 **Cancelled:** Soft Red (`#FEF2F2`, text `#DC2626`)
  - ⚪ **Fully Booked:** Slate Gray (`#F1F5F9`, text `#64748B`)

---

## 📑 6 Reference Pages Implemented

### 1. Page 1 – Landing Page (`/landing`)
- CampusPulse heart pulse branding
- College Event Management System hero headline
- Purple gradient background with floating blurred glowing orbs
- 4 core feature cards: **Smart Reminders**, **Event Updates**, **My Schedule**, and **Mobile Friendly**
- Real-time campus statistics counter (12+ events, 100% notification delivery, 1,200+ students)
- Direct CTA buttons: **"Get Started Now"** and **"Browse Events"**

### 2. Page 2 – Student/Organiser Authentication (`/login`)
- Split 2-column layout:
  - **Left Section:** Rich purple gradient with value proposition cards (Smart Reminders, Live Event Updates, My Schedule)
  - **Right Section:** Welcome back card, Student/Organiser role toggle pills, demo account one-click autofill, college email & password inputs with show/hide password toggle, remember me checkbox, College SSO login, and account creation link.
- **Demo Accounts Provided:**
  - **Student:** `alex.morgan@college.edu` (Pass: `password123`)
  - **Organiser:** `sarah.jenkins@college.edu` (Pass: `password123`)

### 3. Page 3 – Student Dashboard (`/dashboard`)
- **Left Sidebar:** Logo, Dashboard, All Events, My Registrations (with dynamic count badge), Reminders, Event Updates (with red unread count badge), Mobile App, Organiser Portal, and **Manage Alerts** promotional card.
- **Top Navigation:** Search bar with shortcut hint, live date indicator, real-time notification bell with unread badge, student profile card, and quick action buttons.
- **Featured Reminder Card:** Displays next immediate registered event (e.g., *CodeSprint 24H Hackathon*), reminder status badge, date, time, venue, **live ticking countdown timer (Days : Hours : Mins : Secs)**, and **View Ticket** button.
- **4 Metric Stat Cards:** Registered Events, Upcoming This Month, New Updates, and Events Attended.
- **2-Column Split:**
  - *Upcoming College Events* with date blocks, tags, available seats, and direct registration.
  - *Latest Event Updates* feed showing venue relocations, postponements, and ticket confirmations.

### 4. Page 4 – My Registered Events (`/registrations`)
- Filter pills: **All Events**, **This Week**, **Next Week**, and **Past**.
- Grouped schedule view by week with date blocks, duration, status badges, and ticket IDs.
- Individual reminder toggles per event: **[1 Day]**, **[1 Hour]**, and **[10 Mins]**.
- **Interactive Monthly Calendar:** Month/year title with previous/next month navigation, weekday grid, today's date highlighted, and dots for registered event dates.
- **Reminder Preferences Panel:** Global toggles for 1-day, 1-hour, 10-minute alerts, email digest, and **Desktop Push Notification** permission integration.

### 5. Page 5 – Live Event Updates Centre (`/updates`)
- Filter categories: **All Updates**, **Venue Changes**, **Postponements**, **Time Changes**, **New Events**, and **Registered Only**.
- **Live Change Cards:** Displays the original vs updated information with an arrow (`Original ➔ Updated`) and reason for update.
- **Today's Timeline:** Chronological hourly schedule of today's campus activities and deadlines.
- **Pinned Priority Events:** Quick access to pinned events with one-click modal opening.

### 6. Page 6 – Mobile Responsive Interface (`/mobile`)
- Realistic phone device mockup (iPhone-styled frame with bezel, dynamic notch, and curved corners).
- Mobile greeting, mobile reminder countdown card, upcoming events carousel, and event alerts.
- **Fixed Bottom Navigation Bar:** Home, Events, Mine (with ticket badge), Alerts, and quick switch.
- 100% responsive on all mobile, tablet, and desktop viewports.

---

## 🚀 Enhanced Features Implemented

1. **All Events / Discovery Page (`/events`):** Multi-filter by category (Technical, Workshop, Hackathon, Seminar, Cultural, Sports, Symposium, Competition), status filter, live search, and seat progress bars.
2. **Event Details Modal:** Full agenda, department, available seats, organizer contact, guidelines & rules, and registration button.
3. **Smart Event Reminders:** Browser Notification API integration (`Notification.requestPermission()`) with reliable in-app toast notification fallback.
4. **Live Event Change Notifications:** When an organiser changes a venue, postpones, or cancels an event, real-time alerts are dispatched, status badges change, and registered students receive instant notifications.
5. **Event History Audit Log:** Tracks previous values, updated values, timestamp, and official reason for changes.
6. **Digital Event Admission Ticket:** Generates a perforated ticket with student info, unique ticket ID (e.g. `CP-2026-HACK-8491`), and an **interactive SVG QR code** with print/save support.
7. **Pin Important Events:** Pin and unpin events for persistent priority access.
8. **Organiser Dashboard (`/organiser`):**
   - Create new events
   - Postpone events with new date, time, and reason
   - Relocate venues with new venue and reason
   - Cancel events with cancellation notice
   - View student registration rosters

---

## 💻 How to Run CampusPulse

### Option 1: Quick One-Click Launch (Recommended)
Double-click `start.bat` in the project root folder.
This will start the FastAPI backend server on `http://127.0.0.1:8000` and automatically open your default browser.

### Option 2: Run via Python CLI
```bash
python run_backend.py
```
Then navigate to `http://localhost:8000` in any web browser.

### Option 3: Direct Browser Launch (Zero-Setup)
Simply double-click `index.html` in File Explorer or open it in Chrome, Edge, Firefox, or Safari. The entire platform runs with complete offline resilience, local persistence, and live interactive state!

---

## 🗄️ Database Schema & Architecture

- **Backend:** Python 3, FastAPI, Uvicorn, SQLite3, Pydantic
- **Frontend:** Vanilla ES6 / React Architecture, Tailwind-compatible CSS system, Lucide SVG vector repository
- **Database (`backend/campuspulse.db`):**
  - `users`: ID, name, email, password, role, department, year, avatar
  - `events`: ID, title, description, category, date, time, venue, seats, status, original values, rules
  - `registrations`: ID, student_id, event_id, ticket_id, qr_code_data, status
  - `notifications`: ID, user_id, event_id, type, title, message, old_value, new_value, read
  - `event_history`: ID, event_id, change_type, previous_values, updated_values, reason
  - `reminder_preferences`: student_id, event_id, one_day, one_hour, ten_minute, email_digest
  - `pinned_events`: student_id, event_id

