// CAMPUSPULSE – CORE APPLICATION ENGINE
// Complete Visual Replication & Real-time Functional Architecture

(function() {
  'use strict';

  // --- SVG ICON REPOSITORY (Lucide-compatible SVG vectors) ---
  const ICONS = {
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    alertTriangle: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
    xCircle: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    pin: '<line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
    refreshCw: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
  };

  function getIcon(name, size = 18, className = "") {
    const path = ICONS[name] || ICONS.activity;
    return `<svg class="svg-icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  }

  // --- APPLICATION STATE ---
  const state = {
    user: {
      id: "student-001",
      name: "Alex Morgan",
      email: "alex.morgan@college.edu",
      role: "student",
      department: "Computer Science & Engineering",
      year: "3rd Year, Sec B",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    currentRoute: "dashboard", // 'landing', 'login', 'dashboard', 'events', 'registrations', 'updates', 'mobile', 'organiser'
    events: [],
    registrations: [],
    notifications: [],
    history: [],
    reminders: {},
    pinnedEventIds: ["ev-001", "ev-002"],
    
    // Filters & Navigation
    searchQuery: "",
    categoryFilter: "All",
    statusFilter: "All",
    regFilter: "All",
    updateFilter: "All",
    
    // Calendar Navigation
    calendarDate: new Date(),
    
    // Modals
    activeModal: null, // 'ticket', 'details', 'createEvent', 'editEvent', 'changeVenue', 'postpone', 'cancelEvent', 'roster'
    modalData: null,
    
    // Mobile View Active Tab
    mobileTab: "home"
  };

  // --- SAMPLE SEED DATA (Used for offline resilience & initial state) ---
  const today = new Date();
  const formatOffset = (days) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const SEED_EVENTS = [
    {
      id: "ev-001",
      title: "CodeSprint 24H Hackathon",
      description: "The flagship annual collegiate hackathon bringing together 300+ developers, designers, and innovators to solve real-world problems in Web3, AI, and Sustainability. Mentors from top tech giants, cash pool of $5,000, and internship opportunities.",
      category: "Hackathon",
      date: formatOffset(1),
      time: "09:00 AM - 09:00 AM (Next Day)",
      venue: "Innovation Hub - Main Arena",
      organizer_id: "organiser-001",
      organizer_name: "Prof. Sarah Jenkins (Tech Council)",
      available_seats: 12,
      total_seats: 120,
      registered_count: 108,
      status: "Upcoming",
      original_date: null,
      original_time: null,
      original_venue: null,
      rules: ["Teams of 2 to 4 members", "Bring college ID card and laptop", "Original code only, GitHub repos timestamped", "Food and overnight snacks provided"],
      banner: "gradient-purple",
      is_featured: 1
    },
    {
      id: "ev-002",
      title: "IoT with ESP32 Workshop",
      description: "Hands-on workshop exploring microcontroller programming, cloud sensor telemetry, and MQTT architecture using ESP32. Hardware kits provided for every participant.",
      category: "Workshop",
      date: formatOffset(2),
      time: "10:00 AM - 01:30 PM",
      venue: "Electronics Block - Room 304",
      organizer_id: "organiser-002",
      organizer_name: "David Chen (Robotics Club)",
      available_seats: 0,
      total_seats: 60,
      registered_count: 60,
      status: "Venue Changed",
      original_date: formatOffset(2),
      original_time: "10:00 AM - 01:30 PM",
      original_venue: "IoT Hardware Lab 2",
      rules: ["Individual participation", "Basic C/C++ knowledge recommended", "Laptops required with Arduino IDE installed"],
      banner: "gradient-indigo",
      is_featured: 1
    },
    {
      id: "ev-003",
      title: "UI/UX Design Showcase & Sprint",
      description: "A creative design sprint where students redesign campus utility apps. Industry judges from top product design firms will review portfolios and live mockups.",
      category: "Competition",
      date: formatOffset(4),
      time: "02:00 PM - 06:00 PM",
      venue: "Design Studio - Block C",
      organizer_id: "organiser-001",
      organizer_name: "Prof. Sarah Jenkins",
      available_seats: 34,
      total_seats: 80,
      registered_count: 46,
      status: "Registration Open",
      original_date: null,
      original_time: null,
      original_venue: null,
      rules: ["Figma or Adobe XD familiarity required", "Design files must be submitted via Figma Community link", "Solo or duo entries welcome"],
      banner: "gradient-violet",
      is_featured: 0
    },
    {
      id: "ev-004",
      title: "AI and ML in Healthcare Seminar",
      description: "Distinguished keynote lecture by Dr. Aris Thorne on computer vision for oncology diagnostics and edge computing in wearable medical telemetry.",
      category: "Seminar",
      date: formatOffset(6),
      time: "11:00 AM - 01:00 PM",
      venue: "Centenary Auditorium",
      organizer_id: "organiser-001",
      organizer_name: "Prof. Sarah Jenkins",
      available_seats: 150,
      total_seats: 250,
      registered_count: 100,
      status: "Upcoming",
      original_date: null,
      original_time: null,
      original_venue: null,
      rules: ["Open to all departments and faculty", "Q&A session with the keynote speaker", "E-certificate of participation issued"],
      banner: "gradient-blue",
      is_featured: 0
    },
    {
      id: "ev-005",
      title: "Rhythm 2026 Cultural Fest: Battle of Bands",
      description: "The most anticipated musical showdown of the semester! 8 shortlisted college bands rock the open amphitheatre. Food trucks, light shows, and celebrity guest judge.",
      category: "Cultural",
      date: formatOffset(10),
      time: "05:30 PM - 10:00 PM",
      venue: "Open Air Amphitheatre",
      organizer_id: "organiser-001",
      organizer_name: "Cultural Society Lead",
      available_seats: 45,
      total_seats: 500,
      registered_count: 455,
      status: "Upcoming",
      original_date: null,
      original_time: null,
      original_venue: null,
      rules: ["Passes required at the entry gate", "No outside bottles allowed", "College ID card mandatory"],
      banner: "gradient-pink",
      is_featured: 1
    },
    {
      id: "ev-006",
      title: "National Technical Symposium: InnovateX",
      description: "Paper presentations, circuit debugging, reverse engineering challenges, and technical quiz competitions spanning 6 engineering departments.",
      category: "Symposium",
      date: formatOffset(14),
      time: "09:00 AM - 05:00 PM",
      venue: "Main Convention Centre",
      organizer_id: "organiser-001",
      organizer_name: "Prof. Sarah Jenkins",
      available_seats: 80,
      total_seats: 300,
      registered_count: 220,
      status: "Postponed",
      original_date: formatOffset(7),
      original_time: "09:00 AM - 05:00 PM",
      original_venue: "Main Convention Centre",
      rules: ["Formal attire required for paper presentation", "IEEE formatting standards for manuscripts"],
      banner: "gradient-purple",
      is_featured: 0
    },
    {
      id: "ev-007",
      title: "Inter-College Speed Coding Duel",
      description: "Rapid 1v1 bracket-style competitive algorithmic coding. 15 minutes per round. Dynamic programming, graph theory, and edge-case mastery.",
      category: "Competition",
      date: formatOffset(18),
      time: "03:00 PM - 07:00 PM",
      venue: "Computer Lab 5 & 6",
      organizer_id: "organiser-002",
      organizer_name: "David Chen",
      available_seats: 0,
      total_seats: 64,
      registered_count: 64,
      status: "Fully Booked",
      original_date: null,
      original_time: null,
      original_venue: null,
      rules: ["Languages permitted: C++, Java, Python3", "Automated test harness evaluation", "Leaderboard live streamed"],
      banner: "gradient-amber",
      is_featured: 0
    },
    {
      id: "ev-008",
      title: "Monochrome Campus Photography Contest",
      description: "Capture the architecture, student life, and shadows of our campus in high-contrast black & white photography. Exhibition of top 25 entries in Student Center.",
      category: "Competition",
      date: formatOffset(22),
      time: "10:00 AM - 04:00 PM",
      venue: "Student Art Gallery",
      organizer_id: "organiser-001",
      organizer_name: "Fine Arts Club",
      available_seats: 60,
      total_seats: 100,
      registered_count: 40,
      status: "Registration Open",
      original_date: null,
      original_time: null,
      original_venue: null,
      rules: ["EXIF data must be preserved", "RAW or high-res JPEG upload required", "Minor contrast adjustment permitted"],
      banner: "gradient-cyan",
      is_featured: 0
    },
    {
      id: "ev-009",
      title: "Cloud DevOps & Kubernetes Masterclass",
      description: "Comprehensive review of CI/CD pipelines, container orchestration, and Helm charts for modern cloud applications.",
      category: "Technical",
      date: formatOffset(-5),
      time: "02:00 PM - 05:00 PM",
      venue: "Seminar Hall A",
      organizer_id: "organiser-002",
      organizer_name: "David Chen",
      available_seats: 0,
      total_seats: 120,
      registered_count: 120,
      status: "Completed",
      original_date: null,
      original_time: null,
      original_venue: null,
      rules: ["Session completed", "Certificates and code repositories distributed via email"],
      banner: "gradient-gray",
      is_featured: 0
    },
    {
      id: "ev-010",
      title: "Autonomous Drone Racing Cup",
      description: "High-speed obstacle course navigation for autonomous micro-quadcopters. Postponed to next semester due to arena maintenance.",
      category: "Sports",
      date: formatOffset(-3),
      time: "01:00 PM - 06:00 PM",
      venue: "Sports Complex Stadium",
      organizer_id: "organiser-002",
      organizer_name: "David Chen",
      available_seats: 0,
      total_seats: 50,
      registered_count: 42,
      status: "Cancelled",
      original_date: null,
      original_time: null,
      original_venue: null,
      rules: ["Safety goggles compulsory", "Registration refunds processed automatically"],
      banner: "gradient-red",
      is_featured: 0
    }
  ];

  const SEED_REGISTRATIONS = [
    {
      id: "reg-001",
      student_id: "student-001",
      event_id: "ev-001",
      event_title: "CodeSprint 24H Hackathon",
      event_date: formatOffset(1),
      event_time: "09:00 AM - 09:00 AM (Next Day)",
      venue: "Innovation Hub - Main Arena",
      event_status: "Upcoming",
      ticket_id: "CP-2026-HACK-8491",
      qr_code_data: "CAMPUSPULSE:TICKET:CP-2026-HACK-8491:ev-001:student-001:Alex Morgan:CodeSprint 24H Hackathon",
      status: "Confirmed",
      reminders: { one_day: 1, one_hour: 1, ten_minute: 1 }
    },
    {
      id: "reg-002",
      student_id: "student-001",
      event_id: "ev-002",
      event_title: "IoT with ESP32 Workshop",
      event_date: formatOffset(2),
      event_time: "10:00 AM - 01:30 PM",
      venue: "Electronics Block - Room 304 (Moved from Lab 2)",
      event_status: "Venue Changed",
      ticket_id: "CP-2026-IOT-3129",
      qr_code_data: "CAMPUSPULSE:TICKET:CP-2026-IOT-3129:ev-002:student-001:Alex Morgan:IoT with ESP32 Workshop",
      status: "Confirmed",
      reminders: { one_day: 1, one_hour: 1, ten_minute: 0 }
    },
    {
      id: "reg-003",
      student_id: "student-001",
      event_id: "ev-005",
      event_title: "Rhythm 2026 Cultural Fest: Battle of Bands",
      event_date: formatOffset(10),
      event_time: "05:30 PM - 10:00 PM",
      venue: "Open Air Amphitheatre",
      event_status: "Upcoming",
      ticket_id: "CP-2026-CULT-9912",
      qr_code_data: "CAMPUSPULSE:TICKET:CP-2026-CULT-9912:ev-005:student-001:Alex Morgan:Rhythm 2026 Cultural Fest",
      status: "Confirmed",
      reminders: { one_day: 1, one_hour: 0, ten_minute: 0 }
    },
    {
      id: "reg-004",
      student_id: "student-001",
      event_id: "ev-006",
      event_title: "National Technical Symposium: InnovateX",
      event_date: formatOffset(14),
      event_time: "09:00 AM - 05:00 PM",
      venue: "Main Convention Centre",
      event_status: "Postponed",
      ticket_id: "CP-2026-SYMP-5521",
      qr_code_data: "CAMPUSPULSE:TICKET:CP-2026-SYMP-5521:ev-006:student-001:Alex Morgan:National Technical Symposium",
      status: "Confirmed",
      reminders: { one_day: 1, one_hour: 1, ten_minute: 1 }
    }
  ];

  const SEED_NOTIFICATIONS = [
    {
      id: "notif-001",
      event_id: "ev-002",
      type: "venue_change",
      title: "Venue Relocated: IoT Workshop",
      message: "Due to high lab equipment requirements, the IoT with ESP32 Workshop has been moved from IoT Hardware Lab 2 to Electronics Block - Room 304.",
      old_value: "IoT Hardware Lab 2",
      new_value: "Electronics Block - Room 304",
      read: 0,
      time_ago: "2 hours ago"
    },
    {
      id: "notif-002",
      event_id: "ev-006",
      type: "postponement",
      title: "Event Postponed: InnovateX Symposium",
      message: "National Technical Symposium has been rescheduled from next week to a revised date due to academic mid-term exams.",
      old_value: formatOffset(7),
      new_value: formatOffset(14),
      read: 0,
      time_ago: "5 hours ago"
    },
    {
      id: "notif-003",
      event_id: "ev-001",
      type: "registration_confirmed",
      title: "Ticket Confirmed: CodeSprint 24H Hackathon",
      message: "Your registration for CodeSprint 24H Hackathon is confirmed. Your digital ticket ID is CP-2026-HACK-8491.",
      old_value: null,
      new_value: "CP-2026-HACK-8491",
      read: 0,
      time_ago: "14 hours ago"
    },
    {
      id: "notif-004",
      event_id: "ev-003",
      type: "new_event",
      title: "New Event Announced: UI/UX Showcase",
      message: "Department of Design has opened registrations for the Spring UI/UX Showcase sprint with cash prizes.",
      old_value: null,
      new_value: null,
      read: 1,
      time_ago: "1 day ago"
    },
    {
      id: "notif-005",
      event_id: "ev-010",
      type: "cancellation",
      title: "Event Cancelled: Autonomous Drone Racing Cup",
      message: "We regret to inform you that the Drone Racing event has been cancelled for this semester due to arena maintenance.",
      old_value: "Scheduled for Sports Complex",
      new_value: "Cancelled",
      read: 1,
      time_ago: "2 days ago"
    }
  ];

  const SEED_HISTORY = [
    {
      id: "hist-001",
      event_id: "ev-002",
      event_title: "IoT with ESP32 Workshop",
      change_type: "venue_change",
      previous_values: { venue: "IoT Hardware Lab 2" },
      updated_values: { venue: "Electronics Block - Room 304" },
      reason: "Relocated to accommodate 60 active microcontrollers and power outlets.",
      updated_at: "Today, 10:30 AM"
    },
    {
      id: "hist-002",
      event_id: "ev-006",
      event_title: "National Technical Symposium: InnovateX",
      change_type: "postponement",
      previous_values: { date: formatOffset(7) },
      updated_values: { date: formatOffset(14) },
      reason: "Rescheduled to avoid conflict with University Mid-Semester Examinations.",
      updated_at: "Today, 08:15 AM"
    },
    {
      id: "hist-003",
      event_id: "ev-010",
      event_title: "Autonomous Drone Racing Cup",
      change_type: "cancellation",
      previous_values: { status: "Upcoming" },
      updated_values: { status: "Cancelled" },
      reason: "Arena safety nets under mandatory university maintenance.",
      updated_at: "2 days ago"
    }
  ];

  // --- PERSISTENCE & INITIALIZATION ---
  function loadLocalState() {
    try {
      const storedEvents = localStorage.getItem("cp_events");
      state.events = storedEvents ? JSON.parse(storedEvents) : SEED_EVENTS;
      
      const storedRegs = localStorage.getItem("cp_registrations");
      state.registrations = storedRegs ? JSON.parse(storedRegs) : SEED_REGISTRATIONS;
      
      const storedNotifs = localStorage.getItem("cp_notifications");
      state.notifications = storedNotifs ? JSON.parse(storedNotifs) : SEED_NOTIFICATIONS;
      
      const storedHistory = localStorage.getItem("cp_history");
      state.history = storedHistory ? JSON.parse(storedHistory) : SEED_HISTORY;
      
      const storedUser = localStorage.getItem("cp_user");
      if (storedUser) state.user = JSON.parse(storedUser);
      
      const storedPins = localStorage.getItem("cp_pinned");
      if (storedPins) state.pinnedEventIds = JSON.parse(storedPins);
    } catch(e) {
      console.warn("Storage fallback initialized", e);
      state.events = SEED_EVENTS;
      state.registrations = SEED_REGISTRATIONS;
      state.notifications = SEED_NOTIFICATIONS;
      state.history = SEED_HISTORY;
    }
  }

  function saveLocalState() {
    try {
      localStorage.setItem("cp_events", JSON.stringify(state.events));
      localStorage.setItem("cp_registrations", JSON.stringify(state.registrations));
      localStorage.setItem("cp_notifications", JSON.stringify(state.notifications));
      localStorage.setItem("cp_history", JSON.stringify(state.history));
      localStorage.setItem("cp_user", JSON.stringify(state.user));
      localStorage.setItem("cp_pinned", JSON.stringify(state.pinnedEventIds));
    } catch(e) {}
  }

  // --- FASTAPI BACKEND SYNC (Graceful REST fetch with fallback) ---
  async function syncWithBackend() {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const events = await res.json();
        if (Array.isArray(events) && events.length > 0) {
          state.events = events;
        }
      }
      
      const regRes = await fetch(`/api/registrations?student_id=${state.user.id}`);
      if (regRes.ok) {
        const regs = await regRes.json();
        if (Array.isArray(regs) && regs.length > 0) {
          state.registrations = regs;
        }
      }

      const notifRes = await fetch(`/api/notifications?user_id=${state.user.id}`);
      if (notifRes.ok) {
        const notifs = await notifRes.json();
        if (Array.isArray(notifs) && notifs.length > 0) {
          state.notifications = notifs;
        }
      }
      render();
    } catch(err) {
      // Backend not yet running or offline; local storage handles everything flawlessly
    }
  }

  // --- AUDIO & TOAST NOTIFICATION ENGINE ---
  function showToast(title, message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-alert";
    
    let iconName = "bell";
    if (type === "venue") iconName = "mapPin";
    if (type === "postpone") iconName = "clock";
    if (type === "success") iconName = "checkCircle";
    if (type === "cancel") iconName = "xCircle";

    toast.innerHTML = `
      <div style="color: var(--primary);">${getIcon(iconName, 24)}</div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.875rem; color: var(--text-main);">${title}</div>
        <div style="font-size: 0.775rem; color: var(--text-muted); margin-top: 2px;">${message}</div>
      </div>
      <button style="background: none; border: none; color: #94A3B8; cursor: pointer; padding: 4px;" onclick="this.parentElement.remove()">
        ${getIcon("xCircle", 16)}
      </button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.4s ease";
      setTimeout(() => toast.remove(), 400);
    }, 5500);

    // Browser Notification if granted
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(`CampusPulse: ${title}`, {
          body: message,
          icon: "/static/favicon.ico"
        });
      } catch(e) {}
    }
  }

  // --- COUNTDOWN TIMER CALCULATION ---
  function calculateCountdown(targetDateStr, targetTimeStr) {
    if (!targetDateStr) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
    
    // Parse time like "09:00 AM"
    let hours = 9, minutes = 0;
    if (targetTimeStr) {
      const match = targetTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        hours = parseInt(match[1]);
        minutes = parseInt(match[2]);
        if (match[3].toUpperCase() === "PM" && hours < 12) hours += 12;
        if (match[3].toUpperCase() === "AM" && hours === 12) hours = 0;
      }
    }

    const target = new Date(targetDateStr);
    target.setHours(hours, minutes, 0, 0);

    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const remHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const remMinutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours: remHours, minutes: remMinutes, seconds, isPast: false };
  }

  // Format 2-digit number
  const pad2 = (n) => String(n).padStart(2, '0');

  // --- QR CODE GENERATOR (Clean Scalable SVG Matrix) ---
  function generateQRCodeSVG(text, size = 150) {
    // Deterministic pseudo-random matrix based on input text hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    
    const modules = 21; // standard QR dimension
    const cellSize = size / modules;
    let rects = '';

    // Draw position detection patterns (corners)
    function drawFinder(startX, startY) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          if (isOuter || isInner) {
            rects += `<rect x="${(startX + c) * cellSize}" y="${(startY + r) * cellSize}" width="${cellSize}" height="${cellSize}" fill="#191735" />`;
          }
        }
      }
    }

    drawFinder(0, 0);
    drawFinder(modules - 7, 0);
    drawFinder(0, modules - 7);

    // Data dots
    let seed = Math.abs(hash);
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        const inFinder = (r < 8 && c < 8) || (r < 8 && c >= modules - 8) || (r >= modules - 8 && c < 8);
        if (!inFinder) {
          seed = (seed * 9301 + 49297) % 233280;
          if ((seed / 233280) > 0.5) {
            rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#191735" />`;
          }
        }
      }
    }

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size}" style="border-radius: 8px;">
      <rect width="100%" height="100%" fill="#FFFFFF"/>
      ${rects}
    </svg>`;
  }

  // --- EVENT HANDLERS & BUSINESS LOGIC ---
  window.app = {
    navigate: (route) => {
      state.currentRoute = route;
      window.scrollTo(0, 0);
      render();
    },

    setMobileTab: (tab) => {
      state.mobileTab = tab;
      render();
    },

    setUserRole: (role) => {
      if (role === "student") {
        state.user = {
          id: "student-001",
          name: "Alex Morgan",
          email: "alex.morgan@college.edu",
          role: "student",
          department: "Computer Science & Engineering",
          year: "3rd Year, Sec B",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        };
      } else {
        state.user = {
          id: "organiser-001",
          name: "Prof. Sarah Jenkins",
          email: "sarah.jenkins@college.edu",
          role: "organiser",
          department: "Student Affairs & Tech Council",
          year: "Faculty Advisor",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
        };
      }
      saveLocalState();
      render();
    },

    login: (role = "student") => {
      window.app.setUserRole(role);
      state.currentRoute = role === "organiser" ? "organiser" : "dashboard";
      showToast("Welcome back!", `Signed in as ${state.user.name} (${role})`, "success");
      render();
    },

    logout: () => {
      state.currentRoute = "landing";
      showToast("Signed Out", "You have been logged out safely.", "info");
      render();
    },

    setSearch: (query) => {
      state.searchQuery = query;
      render();
    },

    setCategoryFilter: (cat) => {
      state.categoryFilter = cat;
      render();
    },

    setStatusFilter: (status) => {
      state.statusFilter = status;
      render();
    },

    setRegFilter: (filter) => {
      state.regFilter = filter;
      render();
    },

    setUpdateFilter: (filter) => {
      state.updateFilter = filter;
      render();
    },

    changeCalendarMonth: (delta) => {
      const d = new Date(state.calendarDate);
      d.setMonth(d.getMonth() + delta);
      state.calendarDate = d;
      render();
    },

    togglePin: (eventId) => {
      const idx = state.pinnedEventIds.indexOf(eventId);
      if (idx >= 0) {
        state.pinnedEventIds.splice(idx, 1);
        showToast("Unpinned", "Event removed from pinned priority list.");
      } else {
        state.pinnedEventIds.push(eventId);
        showToast("Pinned!", "Event pinned to your dashboard quick access.");
      }
      saveLocalState();
      render();
    },

    toggleReminder: (regId, type) => {
      const reg = state.registrations.find(r => r.id === regId);
      if (reg) {
        if (!reg.reminders) reg.reminders = { one_day: 1, one_hour: 1, ten_minute: 1 };
        reg.reminders[type] = reg.reminders[type] ? 0 : 1;
        saveLocalState();
        showToast("Preferences Updated", `Reminder settings adjusted for ${reg.event_title}`);
        render();
      }
    },

    requestBrowserNotificationPermission: () => {
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            showToast("Notifications Enabled", "You will now receive urgent push alerts for venue & schedule changes!", "success");
          } else {
            showToast("Notice", "Notification permission was not granted. In-app alerts remain active.");
          }
          render();
        });
      }
    },

    registerForEvent: (eventId) => {
      // Prevent duplicates
      const existing = state.registrations.find(r => r.event_id === eventId && r.status === "Confirmed");
      if (existing) {
        showToast("Already Registered", "You already have a valid ticket for this event!", "info");
        window.app.openTicketModal(existing);
        return;
      }

      const ev = state.events.find(e => e.id === eventId);
      if (!ev) return;

      if (ev.status === "Cancelled" || ev.status === "Completed") {
        showToast("Registration Closed", `This event is ${ev.status.toLowerCase()}.`, "cancel");
        return;
      }
      if (ev.available_seats <= 0) {
        showToast("Fully Booked", "Sorry, no seats remain for this event.", "cancel");
        return;
      }

      // Decrement seats
      ev.registered_count += 1;
      ev.available_seats = Math.max(0, ev.total_seats - ev.registered_count);
      if (ev.available_seats === 0) ev.status = "Fully Booked";

      const catPrefix = (ev.category || "CAMP").substring(0, 4).toUpperCase();
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `CP-2026-${catPrefix}-${randNum}`;
      const regId = `reg-${Date.now().toString().slice(-6)}`;

      const newReg = {
        id: regId,
        student_id: state.user.id,
        event_id: ev.id,
        event_title: ev.title,
        event_date: ev.date,
        event_time: ev.time,
        venue: ev.venue,
        event_status: ev.status,
        ticket_id: ticketId,
        qr_code_data: `CAMPUSPULSE:TICKET:${ticketId}:${ev.id}:${state.user.id}:${state.user.name}:${ev.title}`,
        status: "Confirmed",
        reminders: { one_day: 1, one_hour: 1, ten_minute: 1 }
      };

      state.registrations.unshift(newReg);

      // Notification
      state.notifications.unshift({
        id: `notif-${Date.now()}`,
        event_id: ev.id,
        type: "registration_confirmed",
        title: `Ticket Confirmed: ${ev.title}`,
        message: `Your registration is confirmed. Ticket ID: ${ticketId}. Venue: ${ev.venue}`,
        old_value: null,
        new_value: ticketId,
        read: 0,
        time_ago: "Just now"
      });

      saveLocalState();
      showToast("Registration Confirmed! 🎉", `Digital ticket ${ticketId} generated.`, "success");

      // Open ticket directly
      window.app.openTicketModal(newReg);
      render();
    },

    cancelRegistration: (regId) => {
      const reg = state.registrations.find(r => r.id === regId);
      if (!reg) return;

      if (!confirm(`Are you sure you want to cancel your registration for "${reg.event_title}"?`)) {
        return;
      }

      // Restore seat count
      const ev = state.events.find(e => e.id === reg.event_id);
      if (ev) {
        ev.registered_count = Math.max(0, ev.registered_count - 1);
        ev.available_seats = ev.total_seats - ev.registered_count;
        if (ev.status === "Fully Booked") ev.status = "Upcoming";
      }

      state.registrations = state.registrations.filter(r => r.id !== regId);
      saveLocalState();
      showToast("Registration Cancelled", `Cancelled ticket for ${reg.event_title}`);
      window.app.closeModal();
      render();
    },

    // --- ORGANISER LIVE ACTIONS (Venue change, postpone, cancel, create) ---
    openOrganiserAction: (actionType, eventId) => {
      const ev = state.events.find(e => e.id === eventId);
      state.activeModal = actionType;
      state.modalData = ev ? { ...ev } : null;
      render();
    },

    submitVenueChange: (eventId, newVenue, reason) => {
      const ev = state.events.find(e => e.id === eventId);
      if (!ev || !newVenue) return;

      const oldVenue = ev.venue;
      ev.original_venue = oldVenue;
      ev.venue = newVenue;
      ev.status = "Venue Changed";

      // Log history
      state.history.unshift({
        id: `hist-${Date.now()}`,
        event_id: ev.id,
        event_title: ev.title,
        change_type: "venue_change",
        previous_values: { venue: oldVenue },
        updated_values: { venue: newVenue },
        reason: reason || "Relocated to meet technical & space requirements",
        updated_at: "Just now"
      });

      // Generate notification to registered students
      state.notifications.unshift({
        id: `notif-${Date.now()}`,
        event_id: ev.id,
        type: "venue_change",
        title: `Venue Relocated: ${ev.title}`,
        message: `Venue changed from '${oldVenue}' to '${newVenue}'. Reason: ${reason || 'Technical upgrade'}`,
        old_value: oldVenue,
        new_value: newVenue,
        read: 0,
        time_ago: "Just now"
      });

      // Sync registration venue references
      state.registrations.forEach(r => {
        if (r.event_id === ev.id) {
          r.venue = newVenue;
          r.event_status = "Venue Changed";
        }
      });

      saveLocalState();
      showToast("Venue Change Published! ⚠️", `Students notified: ${ev.title} moved to ${newVenue}`, "venue");
      window.app.closeModal();
      render();
    },

    submitPostponement: (eventId, newDate, newTime, reason) => {
      const ev = state.events.find(e => e.id === eventId);
      if (!ev || !newDate) return;

      const oldDate = ev.date;
      const oldTime = ev.time;

      ev.original_date = oldDate;
      ev.original_time = oldTime;
      ev.date = newDate;
      if (newTime) ev.time = newTime;
      ev.status = "Postponed";

      state.history.unshift({
        id: `hist-${Date.now()}`,
        event_id: ev.id,
        event_title: ev.title,
        change_type: "postponement",
        previous_values: { date: oldDate, time: oldTime },
        updated_values: { date: newDate, time: newTime || oldTime },
        reason: reason || "Rescheduled due to university calendar alignment",
        updated_at: "Just now"
      });

      state.notifications.unshift({
        id: `notif-${Date.now()}`,
        event_id: ev.id,
        type: "postponement",
        title: `Event Postponed: ${ev.title}`,
        message: `${ev.title} has been rescheduled to ${newDate}. Reason: ${reason || 'Schedule adjustment'}`,
        old_value: oldDate,
        new_value: newDate,
        read: 0,
        time_ago: "Just now"
      });

      state.registrations.forEach(r => {
        if (r.event_id === ev.id) {
          r.event_date = newDate;
          if (newTime) r.event_time = newTime;
          r.event_status = "Postponed";
        }
      });

      saveLocalState();
      showToast("Postponement Published! 📅", `Students notified: ${ev.title} rescheduled to ${newDate}`, "postpone");
      window.app.closeModal();
      render();
    },

    submitCancellation: (eventId, reason) => {
      const ev = state.events.find(e => e.id === eventId);
      if (!ev) return;

      ev.status = "Cancelled";
      state.history.unshift({
        id: `hist-${Date.now()}`,
        event_id: ev.id,
        event_title: ev.title,
        change_type: "cancellation",
        previous_values: { status: "Upcoming" },
        updated_values: { status: "Cancelled" },
        reason: reason || "Cancelled by department authority",
        updated_at: "Just now"
      });

      state.notifications.unshift({
        id: `notif-${Date.now()}`,
        event_id: ev.id,
        type: "cancellation",
        title: `Event Cancelled: ${ev.title}`,
        message: `We regret to announce that ${ev.title} has been cancelled. Reason: ${reason || 'Administrative decision'}`,
        old_value: "Scheduled",
        new_value: "Cancelled",
        read: 0,
        time_ago: "Just now"
      });

      state.registrations.forEach(r => {
        if (r.event_id === ev.id) {
          r.event_status = "Cancelled";
        }
      });

      saveLocalState();
      showToast("Event Cancelled", `${ev.title} status marked as cancelled.`, "cancel");
      window.app.closeModal();
      render();
    },

    submitCreateEvent: (formData) => {
      const newId = `ev-${Date.now().toString().slice(-6)}`;
      const newEvent = {
        id: newId,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        organizer_id: state.user.id,
        organizer_name: state.user.name,
        available_seats: parseInt(formData.total_seats) || 100,
        total_seats: parseInt(formData.total_seats) || 100,
        registered_count: 0,
        status: "Upcoming",
        rules: formData.rules ? formData.rules.split("\n").filter(r => r.trim()) : ["Valid College ID required"],
        banner: "gradient-purple",
        is_featured: 0
      };

      state.events.unshift(newEvent);

      state.notifications.unshift({
        id: `notif-${Date.now()}`,
        event_id: newId,
        type: "new_event",
        title: `New Event: ${newEvent.title}`,
        message: `${state.user.name} announced ${newEvent.title} for ${newEvent.date} at ${newEvent.venue}.`,
        old_value: null,
        new_value: newEvent.date,
        read: 0,
        time_ago: "Just now"
      });

      saveLocalState();
      showToast("Event Created! 🚀", `Published ${newEvent.title} successfully.`, "success");
      window.app.closeModal();
      render();
    },

    // --- MODAL CONTROLS ---
    openTicketModal: (regOrEvent) => {
      let reg = regOrEvent;
      // If an event is passed, find user's registration
      if (!reg.ticket_id) {
        reg = state.registrations.find(r => r.event_id === regOrEvent.id && r.status === "Confirmed");
      }
      if (!reg) {
        showToast("No Ticket Found", "You must register first to view the digital ticket.", "info");
        return;
      }
      state.activeModal = "ticket";
      state.modalData = reg;
      render();
    },

    openDetailsModal: (event) => {
      state.activeModal = "details";
      state.modalData = event;
      render();
    },

    openRosterModal: (event) => {
      state.activeModal = "roster";
      state.modalData = event;
      render();
    },

    closeModal: () => {
      state.activeModal = null;
      state.modalData = null;
      render();
    },

    markNotificationRead: (notifId) => {
      const notif = state.notifications.find(n => n.id === notifId);
      if (notif) notif.read = 1;
      saveLocalState();
      render();
    },

    markAllNotificationsRead: () => {
      state.notifications.forEach(n => n.read = 1);
      saveLocalState();
      showToast("Notifications Read", "All notifications marked as read.");
      render();
    }
  };

  // --- HTML TEMPLATE RENDERERS FOR THE 6 PAGES ---

  // 1. PAGE 1: LANDING PAGE
  function renderLandingPage() {
    return `
      <div class="landing-hero">
        <div class="circle-blur-1"></div>
        <div class="circle-blur-2"></div>

        <nav class="landing-nav">
          <div class="landing-logo">
            <div class="brand-icon-box" style="width: 40px; height: 40px; background: rgba(255,255,255,0.25);">
              ${getIcon("activity", 22)}
            </div>
            <span>CampusPulse</span>
          </div>

          <div class="landing-nav-links">
            <a href="#" class="landing-nav-link" onclick="window.app.navigate('events'); return false;">Explore Events</a>
            <a href="#" class="landing-nav-link" onclick="window.app.navigate('mobile'); return false;">Mobile App</a>
            <a href="#" class="landing-nav-link" onclick="window.app.navigate('organiser'); return false;">Organisers</a>
            <button class="btn-hero-white" style="padding: 0.55rem 1.4rem; font-size: 0.875rem;" onclick="window.app.navigate('login')">
              Sign In ${getIcon("arrowRight", 16)}
            </button>
          </div>
        </nav>

        <div class="hero-main-content">
          <div class="hero-pill-badge">
            ${getIcon("sparkles", 16)} College Event Management & Real-Time Alert System
          </div>

          <h1 class="hero-heading">
            COLLEGE EVENT MANAGEMENT SYSTEM
          </h1>

          <p class="hero-subheading">
            Never miss a campus event again. Live notifications for venue relocations, instant postponement tracking, smart countdown reminders, and digital QR admission passes.
          </p>

          <div class="hero-cta-group">
            <button class="btn-hero-white" onclick="window.app.navigate('login')">
              Get Started Now ${getIcon("arrowRight", 18)}
            </button>
            <button class="btn-secondary" style="background: rgba(255,255,255,0.18); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.35); padding: 0.85rem 1.8rem; font-size: 1.05rem;" onclick="window.app.navigate('events')">
              ${getIcon("search", 18)} Browse 10+ Events
            </button>
          </div>

          <!-- 4 Core Feature Cards (PDF Page 1 reference) -->
          <div class="hero-features-preview">
            <div class="hero-feature-card">
              <div class="hero-feat-icon">${getIcon("clock", 22)}</div>
              <div class="hero-feat-title">Smart Reminders</div>
              <div class="hero-feat-desc">Automated 1-day, 1-hour, and 10-minute alerts so you are always ahead of time.</div>
            </div>

            <div class="hero-feature-card">
              <div class="hero-feat-icon">${getIcon("bell", 22)}</div>
              <div class="hero-feat-title">Event Updates</div>
              <div class="hero-feat-desc">Instant push notifications for venue switches, timing revisions, and postponements.</div>
            </div>

            <div class="hero-feature-card">
              <div class="hero-feat-icon">${getIcon("calendar", 22)}</div>
              <div class="hero-feat-title">My Schedule</div>
              <div class="hero-feat-desc">Personalized monthly calendar sync, QR event tickets, and attendance history.</div>
            </div>

            <div class="hero-feature-card">
              <div class="hero-feat-icon">${getIcon("smartphone", 22)}</div>
              <div class="hero-feat-title">Mobile Friendly</div>
              <div class="hero-feat-desc">Optimized interface with bottom navigation, responsive cards, and offline pass access.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Statistics Section -->
      <div style="max-width: 1100px; margin: -30px auto 4rem auto; position: relative; z-index: 20;">
        <div class="card" style="padding: 1.75rem 2.5rem; display: flex; justify-content: space-around; align-items: center; border-radius: 24px; box-shadow: 0 15px 35px rgba(88,69,245,0.12);">
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">12+</div>
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Active Campus Events</div>
          </div>
          <div style="width: 1px; height: 45px; background: var(--border-subtle);"></div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: #10B981;">100%</div>
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Change Notification Delivery</div>
          </div>
          <div style="width: 1px; height: 45px; background: var(--border-subtle);"></div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: var(--secondary);">1,200+</div>
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Registered Students</div>
          </div>
          <div style="width: 1px; height: 45px; background: var(--border-subtle);"></div>
          <div style="text-align: center;">
            <div style="font-size: 2rem; font-weight: 800; color: #F59E0B;">QR Codes</div>
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Instant Digital Admission</div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. PAGE 2: LOGIN AND REGISTRATION
  function renderLoginPage() {
    const isOrganiser = state.user.role === "organiser";
    return `
      <div class="login-screen">
        <!-- Left Branding & Value Prop Banner -->
        <div class="login-left-banner">
          <div class="circle-blur-1"></div>
          
          <div>
            <div class="brand-logo" style="padding-left: 0;">
              <div class="brand-icon-box" style="background: rgba(255,255,255,0.25);">
                ${getIcon("activity", 24)}
              </div>
              <span style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF;">CampusPulse</span>
            </div>
            
            <h2 style="font-size: 2.8rem; font-weight: 900; line-height: 1.15; color: #FFFFFF; margin-top: 2.5rem; max-width: 440px;">
              Never miss a campus event again.
            </h2>
            <p style="font-size: 1.1rem; color: rgba(255,255,255,0.85); margin-top: 1rem; max-width: 400px; line-height: 1.6;">
              Centralized college event hub with automated change tracking and smart reminders.
            </p>
          </div>

          <!-- Feature Bullets from PDF Page 2 -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin: 3rem 0; z-index: 10;">
            <div style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.12); padding: 1rem 1.25rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px);">
              <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;">
                ${getIcon("clock", 20)}
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">Smart Reminders</div>
                <div style="font-size: 0.8rem; opacity: 0.85;">1-day, 1-hour & 10-minute automated alerts</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.12); padding: 1rem 1.25rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px);">
              <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;">
                ${getIcon("bell", 20)}
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">Live Event Updates</div>
                <div style="font-size: 0.8rem; opacity: 0.85;">Instant push notifications for venue & schedule changes</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.12); padding: 1rem 1.25rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px);">
              <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;">
                ${getIcon("calendar", 20)}
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">My Schedule</div>
                <div style="font-size: 0.8rem; opacity: 0.85;">Interactive monthly calendar & digital QR tickets</div>
              </div>
            </div>
          </div>

          <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); z-index: 10;">
            © 2026 CampusPulse System • College Event Platform
          </div>
        </div>

        <!-- Right Form Panel -->
        <div class="login-right-form">
          <div class="login-card-inner">
            <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
              Welcome back 👋
            </h2>
            <p style="color: var(--text-muted); font-size: 0.925rem; margin-bottom: 1.75rem;">
              Select your role and enter your college credentials
            </p>

            <!-- Role Selector Pills -->
            <div class="role-selector-pills">
              <button class="role-pill-btn ${!isOrganiser ? 'active' : ''}" onclick="window.app.setUserRole('student')">
                ${getIcon("user", 16)} Student
              </button>
              <button class="role-pill-btn ${isOrganiser ? 'active' : ''}" onclick="window.app.setUserRole('organiser')">
                ${getIcon("shield", 16)} Organiser / Faculty
              </button>
            </div>

            <!-- Demo Account Autofill Button -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem;">
              <div class="demo-account-chip" onclick="document.getElementById('email-input').value = 'alex.morgan@college.edu'; document.getElementById('pass-input').value = 'password123'; window.app.setUserRole('student');">
                ${getIcon("sparkles", 14)} Autofill Demo Student (Alex)
              </div>
              <div class="demo-account-chip" onclick="document.getElementById('email-input').value = 'sarah.jenkins@college.edu'; document.getElementById('pass-input').value = 'password123'; window.app.setUserRole('organiser');">
                ${getIcon("sparkles", 14)} Demo Organiser (Sarah)
              </div>
            </div>

            <form onsubmit="window.app.login(state.user.role); return false;">
              <div class="form-group">
                <label class="form-label">College Email</label>
                <div class="input-with-icon">
                  <span class="input-icon-left">${getIcon("mail", 18)}</span>
                  <input type="email" id="email-input" class="form-control" value="${isOrganiser ? 'sarah.jenkins@college.edu' : 'alex.morgan@college.edu'}" required />
                </div>
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
                  <label class="form-label" style="margin-bottom: 0;">Password</label>
                  <a href="#" style="font-size: 0.8rem; font-weight: 600; color: var(--primary); text-decoration: none;" onclick="showToast('Password Reset', 'A password reset link has been dispatched to your college email.'); return false;">Forgot password?</a>
                </div>
                <div class="input-with-icon">
                  <span class="input-icon-left">${getIcon("lock", 18)}</span>
                  <input type="password" id="pass-input" class="form-control" value="password123" required />
                  <button type="button" class="input-icon-right" onclick="const p = document.getElementById('pass-input'); p.type = p.type === 'password' ? 'text' : 'password';">
                    ${getIcon("eye", 18)}
                  </button>
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); cursor: pointer;">
                  <input type="checkbox" checked style="accent-color: var(--primary); width: 16px; height: 16px;" /> Remember me
                </label>
              </div>

              <button type="submit" class="btn-primary" style="width: 100%; padding: 0.85rem; font-size: 1rem;">
                Sign In to CampusPulse ${getIcon("arrowRight", 18)}
              </button>

              <div style="display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0;">
                <div style="flex: 1; height: 1px; background: var(--border-subtle);"></div>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">or continue with</span>
                <div style="flex: 1; height: 1px; background: var(--border-subtle);"></div>
              </div>

              <button type="button" class="btn-outline" style="width: 100%; justify-content: center; padding: 0.75rem;" onclick="window.app.login(state.user.role)">
                ${getIcon("shield", 18)} College Single Sign-On (SSO)
              </button>
            </form>

            <div style="text-align: center; margin-top: 1.75rem; font-size: 0.875rem; color: var(--text-muted);">
              Don't have an account? <a href="#" style="color: var(--primary); font-weight: 700; text-decoration: none;" onclick="showToast('Create Account', 'Student enrollment is automatically provisioned via College SSO.'); return false;">Create account</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. PAGE 3: STUDENT DASHBOARD
  function renderDashboardPage() {
    // Next immediate registered event for the featured card
    const nextReg = state.registrations.find(r => r.status === "Confirmed");
    const nextEvent = nextReg ? state.events.find(e => e.id === nextReg.event_id) : state.events[0];
    
    // Countdown values
    const cd = calculateCountdown(nextEvent ? nextEvent.date : null, nextEvent ? nextEvent.time : null);

    // Upcoming events list (sample top 3)
    const upcomingEvents = state.events.filter(e => e.status !== "Completed" && e.status !== "Cancelled").slice(0, 4);

    // Unread notifications count
    const unreadCount = state.notifications.filter(n => !n.read).length;

    return `
      <div>
        <!-- Greeting Header -->
        <div class="page-greeting">
          <div>
            <h1 class="greeting-title">Good morning, ${state.user.name.split(' ')[0]}! 👋</h1>
            <p class="greeting-subtitle">You have ${state.registrations.length} events scheduled and ${unreadCount} new alerts.</p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn-primary" onclick="window.app.navigate('events')">
              ${getIcon("plus", 18)} Register for Event
            </button>
            <button class="btn-outline" onclick="window.app.navigate('mobile')">
              ${getIcon("smartphone", 18)} Mobile View
            </button>
          </div>
        </div>

        <!-- FEATURED REMINDER CARD (Exact visual replication of PDF Page 3) -->
        ${nextEvent ? `
          <div class="featured-reminder-card">
            <div class="featured-top-tag">
              ${getIcon("clock", 14)} Featured Reminder • ${nextEvent.status}
            </div>
            
            <h2 class="featured-title">${nextEvent.title}</h2>
            
            <div class="featured-details">
              <div class="featured-item">
                ${getIcon("calendar", 16)} <span>${nextEvent.date}</span>
              </div>
              <div class="featured-item">
                ${getIcon("clock", 16)} <span>${nextEvent.time}</span>
              </div>
              <div class="featured-item">
                ${getIcon("mapPin", 16)} <span>${nextEvent.venue}</span>
              </div>
            </div>

            <div class="featured-countdown-row">
              <div class="countdown-container">
                <div class="timer-unit-box">
                  <div class="timer-value" id="cd-days">${pad2(cd.days)}</div>
                  <div class="timer-label">Days</div>
                </div>
                <div class="timer-colon">:</div>
                <div class="timer-unit-box">
                  <div class="timer-value" id="cd-hours">${pad2(cd.hours)}</div>
                  <div class="timer-label">Hours</div>
                </div>
                <div class="timer-colon">:</div>
                <div class="timer-unit-box">
                  <div class="timer-value" id="cd-mins">${pad2(cd.minutes)}</div>
                  <div class="timer-label">Mins</div>
                </div>
                <div class="timer-colon">:</div>
                <div class="timer-unit-box">
                  <div class="timer-value" id="cd-secs">${pad2(cd.seconds)}</div>
                  <div class="timer-label">Secs</div>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem;">
                ${nextReg ? `
                  <button class="btn-ticket-hero" onclick="window.app.openTicketModal(state.registrations.find(r => r.event_id === '${nextEvent.id}'))">
                    ${getIcon("ticket", 18)} View Ticket
                  </button>
                ` : `
                  <button class="btn-ticket-hero" onclick="window.app.registerForEvent('${nextEvent.id}')">
                    ${getIcon("plus", 18)} Register Now
                  </button>
                `}
                <button class="btn-ticket-hero" style="background: rgba(255,255,255,0.2); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.4);" onclick="window.app.openDetailsModal(state.events.find(e => e.id === '${nextEvent.id}'))">
                  Details
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- 4 STAT CARDS (PDF Page 3) -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon purple">${getIcon("ticket", 24)}</div>
            <div>
              <div class="stat-value">${state.registrations.length}</div>
              <div class="stat-label">Registered Events</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">${getIcon("calendar", 24)}</div>
            <div>
              <div class="stat-value">8</div>
              <div class="stat-label">Upcoming This Month</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon amber">${getIcon("bell", 24)}</div>
            <div>
              <div class="stat-value">${unreadCount}</div>
              <div class="stat-label">New Updates</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon blue">${getIcon("checkCircle", 24)}</div>
            <div>
              <div class="stat-value">12</div>
              <div class="stat-label">Events Attended</div>
            </div>
          </div>
        </div>

        <!-- 2-COLUMN DASHBOARD SECTION (Upcoming Events vs Latest Updates) -->
        <div class="dashboard-grid">
          <!-- Left: Upcoming College Events -->
          <div>
            <div class="section-header">
              <div class="section-title">
                ${getIcon("sparkles", 20, "text-primary")} Upcoming College Events
              </div>
              <span class="see-all-link" onclick="window.app.navigate('events')">
                View All (${state.events.length}) ${getIcon("chevronRight", 16)}
              </span>
            </div>

            <div class="events-column">
              ${upcomingEvents.map(ev => {
                const isReg = state.registrations.some(r => r.event_id === ev.id && r.status === "Confirmed");
                const [y, m, d] = ev.date.split("-");
                const monthName = new Date(ev.date).toLocaleString('default', { month: 'short' });
                
                let badgeClass = "badge-upcoming";
                if (ev.status === "Venue Changed") badgeClass = "badge-venue";
                if (ev.status === "Postponed") badgeClass = "badge-postponed";
                if (ev.status === "Fully Booked") badgeClass = "badge-full";

                return `
                  <div class="event-card-item">
                    <div class="event-date-box">
                      <div class="event-month">${monthName}</div>
                      <div class="event-day">${d}</div>
                    </div>

                    <div class="event-details-area">
                      <div class="event-tags-row">
                        <span class="badge ${badgeClass}">${ev.status}</span>
                        <span style="font-size: 0.725rem; font-weight: 600; color: var(--text-muted); background: #F5F3FF; padding: 2px 8px; border-radius: 6px;">
                          ${ev.category}
                        </span>
                      </div>

                      <div class="event-title-text" onclick="window.app.openDetailsModal(state.events.find(e => e.id === '${ev.id}'))">
                        ${ev.title}
                      </div>

                      <div class="event-meta-info">
                        <div class="event-meta-item">
                          ${getIcon("clock", 14)} <span>${ev.time}</span>
                        </div>
                        <div class="event-meta-item">
                          ${getIcon("mapPin", 14)} <span>${ev.venue}</span>
                        </div>
                        <div class="event-meta-item">
                          ${getIcon("users", 14)} <span>${ev.available_seats} seats left</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      ${isReg ? `
                        <button class="btn-secondary" style="padding: 0.5rem 0.95rem; font-size: 0.85rem;" onclick="window.app.openTicketModal(state.registrations.find(r => r.event_id === '${ev.id}'))">
                          ${getIcon("ticket", 16)} Ticket
                        </button>
                      ` : `
                        <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="window.app.registerForEvent('${ev.id}')">
                          Register
                        </button>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right: Latest Event Updates Feed -->
          <div>
            <div class="section-header">
              <div class="section-title">
                ${getIcon("bell", 20, "text-primary")} Latest Event Updates
              </div>
              <span class="see-all-link" onclick="window.app.navigate('updates')">
                View All ${getIcon("chevronRight", 16)}
              </span>
            </div>

            <div class="updates-list">
              ${state.notifications.slice(0, 4).map(notif => {
                let iconColor = "purple";
                let iconName = "bell";
                if (notif.type === "venue_change") { iconColor = "purple"; iconName = "mapPin"; }
                if (notif.type === "postponement") { iconColor = "amber"; iconName = "clock"; }
                if (notif.type === "cancellation") { iconColor = "red"; iconName = "xCircle"; }
                if (notif.type === "registration_confirmed") { iconColor = "green"; iconName = "checkCircle"; }

                return `
                  <div class="update-card-item ${!notif.read ? 'unread' : ''}" onclick="window.app.markNotificationRead('${notif.id}')">
                    <div class="update-icon-circle stat-icon ${iconColor}">
                      ${getIcon(iconName, 18)}
                    </div>
                    <div class="update-content">
                      <div class="update-top-row">
                        <span class="update-title">${notif.title}</span>
                        <span class="update-time">${notif.time_ago}</span>
                      </div>
                      <div class="update-body-text">${notif.message}</div>
                      
                      ${notif.old_value && notif.new_value ? `
                        <div class="change-compare-box">
                          <span class="old-val">${notif.old_value}</span>
                          <span class="arrow-val">➔</span>
                          <span class="new-val">${notif.new_value}</span>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 4. PAGE 4: MY REGISTERED EVENTS (With Interactive Calendar & Preferences)
  function renderRegisteredPage() {
    // Filter registrations
    let list = [...state.registrations];
    const todayStr = formatOffset(0);
    const nextWeekStr = formatOffset(7);

    if (state.regFilter === "this_week") {
      list = list.filter(r => r.event_date >= todayStr && r.event_date <= nextWeekStr);
    } else if (state.regFilter === "next_week") {
      list = list.filter(r => r.event_date > nextWeekStr);
    } else if (state.regFilter === "past") {
      list = list.filter(r => r.event_date < todayStr);
    }

    // Monthly Calendar Computation
    const calYear = state.calendarDate.getFullYear();
    const calMonth = state.calendarDate.getMonth();
    const monthName = state.calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const todayDate = new Date();

    // Collect dates that have registrations
    const regDates = new Set(state.registrations.map(r => {
      const d = new Date(r.event_date);
      if (d.getFullYear() === calYear && d.getMonth() === calMonth) {
        return d.getDate();
      }
      return null;
    }).filter(Boolean));

    let calCells = [];
    for (let i = 0; i < firstDay; i++) {
      calCells.push(`<div class="cal-day-cell other-month"></div>`);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = todayDate.getFullYear() === calYear && todayDate.getMonth() === calMonth && todayDate.getDate() === day;
      const hasEvent = regDates.has(day);
      calCells.push(`
        <div class="cal-day-cell ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}" onclick="showToast('Date Selected', 'Viewing events for ${monthName.split(' ')[0]} ${day}')">
          ${day}
          ${hasEvent ? `<span class="cal-event-dot"></span>` : ''}
        </div>
      `);
    }

    return `
      <div>
        <!-- Heading -->
        <div class="page-greeting">
          <div>
            <h1 class="greeting-title">My Registered Events 🎟️</h1>
            <p class="greeting-subtitle">Track your confirmed events, manage reminder notifications, and access admission tickets.</p>
          </div>
          <button class="btn-primary" onclick="window.app.navigate('events')">
            ${getIcon("search", 18)} Discover More Events
          </button>
        </div>

        <div class="registrations-grid">
          <!-- Left: Grouped Registrations List -->
          <div>
            <!-- Filter Pills -->
            <div class="filter-pills-bar">
              <button class="filter-pill ${state.regFilter === 'All' ? 'active' : ''}" onclick="window.app.setRegFilter('All')">
                All Events (${state.registrations.length})
              </button>
              <button class="filter-pill ${state.regFilter === 'this_week' ? 'active' : ''}" onclick="window.app.setRegFilter('this_week')">
                This Week (2)
              </button>
              <button class="filter-pill ${state.regFilter === 'next_week' ? 'active' : ''}" onclick="window.app.setRegFilter('next_week')">
                Next Week (1)
              </button>
              <button class="filter-pill ${state.regFilter === 'past' ? 'active' : ''}" onclick="window.app.setRegFilter('past')">
                Past (0)
              </button>
            </div>

            <!-- Group: This Week -->
            <div class="week-group-header">
              ${getIcon("calendar", 16, "text-primary")} Confirmed Schedule (${list.length} Events)
            </div>

            <div class="events-column">
              ${list.length === 0 ? `
                <div class="card" style="padding: 3rem; text-align: center; color: var(--text-muted);">
                  ${getIcon("ticket", 40, "text-muted")}
                  <p style="margin-top: 1rem; font-weight: 600;">No registrations matching this filter.</p>
                  <button class="btn-primary" style="margin-top: 1rem;" onclick="window.app.navigate('events')">Explore Events</button>
                </div>
              ` : list.map(reg => {
                const [y, m, d] = reg.event_date.split("-");
                const monthName = new Date(reg.event_date).toLocaleString('default', { month: 'short' });
                const isPinned = state.pinnedEventIds.includes(reg.event_id);
                const rem = reg.reminders || { one_day: 1, one_hour: 1, ten_minute: 1 };

                let statusBadge = `<span class="badge badge-confirmed">Confirmed</span>`;
                if (reg.event_status === "Venue Changed") statusBadge = `<span class="badge badge-venue">Venue Changed</span>`;
                if (reg.event_status === "Postponed") statusBadge = `<span class="badge badge-postponed">Postponed</span>`;
                if (reg.event_status === "Cancelled") statusBadge = `<span class="badge badge-cancelled">Cancelled</span>`;

                return `
                  <div class="event-card-item" style="flex-direction: column; align-items: stretch; gap: 1rem;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem;">
                      <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                        <div class="event-date-box">
                          <div class="event-month">${monthName}</div>
                          <div class="event-day">${d}</div>
                        </div>

                        <div>
                          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                            ${statusBadge}
                            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">
                              Ticket: ${reg.ticket_id}
                            </span>
                          </div>
                          <div class="event-title-text" onclick="window.app.openDetailsModal(state.events.find(e => e.id === '${reg.event_id}'))">
                            ${reg.event_title}
                          </div>
                          <div class="event-meta-info">
                            <div class="event-meta-item">
                              ${getIcon("clock", 14)} <span>${reg.event_time}</span>
                            </div>
                            <div class="event-meta-item">
                              ${getIcon("mapPin", 14)} <span>${reg.venue}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <button class="icon-btn-round" title="${isPinned ? 'Unpin Event' : 'Pin Event'}" style="color: ${isPinned ? 'var(--primary)' : 'var(--text-muted)'};" onclick="window.app.togglePin('${reg.event_id}')">
                          ${getIcon("pin", 18)}
                        </button>
                        <button class="btn-primary" style="padding: 0.5rem 1.15rem; font-size: 0.85rem;" onclick="window.app.openTicketModal(state.registrations.find(r => r.id === '${reg.id}'))">
                          ${getIcon("ticket", 16)} View Ticket
                        </button>
                      </div>
                    </div>

                    <!-- Individual Reminder Toggles Strip -->
                    <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.8rem;">
                      <div class="reminders-toggle-strip">
                        <span style="color: var(--text-muted); margin-right: 0.35rem;">Remind me:</span>
                        <span class="reminder-chip ${rem.one_day ? 'active' : 'inactive'}" onclick="window.app.toggleReminder('${reg.id}', 'one_day')">1 Day</span>
                        <span class="reminder-chip ${rem.one_hour ? 'active' : 'inactive'}" onclick="window.app.toggleReminder('${reg.id}', 'one_hour')">1 Hour</span>
                        <span class="reminder-chip ${rem.ten_minute ? 'active' : 'inactive'}" onclick="window.app.toggleReminder('${reg.id}', 'ten_minute')">10 Mins</span>
                      </div>

                      <button class="btn-danger" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="window.app.cancelRegistration('${reg.id}')">
                        Cancel Registration
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right: Interactive Calendar & Reminder Preferences -->
          <div>
            <!-- Monthly Calendar (PDF Page 4) -->
            <div class="calendar-card">
              <div class="calendar-header">
                <div class="calendar-month-title">${monthName}</div>
                <div class="calendar-nav-btns">
                  <button class="cal-nav-btn" onclick="window.app.changeCalendarMonth(-1)">${getIcon("chevronLeft", 16)}</button>
                  <button class="cal-nav-btn" onclick="window.app.changeCalendarMonth(1)">${getIcon("chevronRight", 16)}</button>
                </div>
              </div>

              <div class="calendar-weekdays">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>

              <div class="calendar-days-grid">
                ${calCells.join('')}
              </div>

              <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #F0EEFF; display: flex; align-items: center; gap: 1.5rem; font-size: 0.75rem; color: var(--text-muted);">
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--primary);"></span> Event Date
                </div>
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="width: 10px; height: 10px; border-radius: 4px; border: 2px solid var(--primary);"></span> Today
                </div>
              </div>
            </div>

            <!-- Reminder Preferences Card (PDF Page 4) -->
            <div class="preferences-card">
              <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
                ${getIcon("settings", 18, "text-primary")} Reminder Preferences
              </div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                Configure global notification channels for your registered events.
              </p>

              <div class="pref-row">
                <div>
                  <div class="pref-label-title">1 Day Before</div>
                  <div class="pref-label-desc">Push & In-App briefing reminder</div>
                </div>
                <label class="switch">
                  <input type="checkbox" checked onchange="showToast('Settings Saved', '1-day alert preference updated.')" />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="pref-row">
                <div>
                  <div class="pref-label-title">1 Hour Before</div>
                  <div class="pref-label-desc">Immediate preparation ping</div>
                </div>
                <label class="switch">
                  <input type="checkbox" checked onchange="showToast('Settings Saved', '1-hour alert preference updated.')" />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="pref-row">
                <div>
                  <div class="pref-label-title">10 Minutes Before</div>
                  <div class="pref-label-desc">Venue gate-entry alert</div>
                </div>
                <label class="switch">
                  <input type="checkbox" checked onchange="showToast('Settings Saved', '10-minute alert preference updated.')" />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="pref-row">
                <div>
                  <div class="pref-label-title">Email Digest</div>
                  <div class="pref-label-desc">Weekly upcoming events summary</div>
                </div>
                <label class="switch">
                  <input type="checkbox" checked onchange="showToast('Settings Saved', 'Email digest preference updated.')" />
                  <span class="slider"></span>
                </label>
              </div>

              <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #F0EEFF;">
                <button class="btn-secondary" style="width: 100%; justify-content: center; font-size: 0.85rem;" onclick="window.app.requestBrowserNotificationPermission()">
                  ${getIcon("bell", 16)} Enable System Desktop Push Alerts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 5. PAGE 5: EVENT UPDATES (Live Venue & Postponement Centre)
  function renderUpdatesPage() {
    let list = [...state.notifications];

    if (state.updateFilter === "venue") {
      list = list.filter(n => n.type === "venue_change");
    } else if (state.updateFilter === "time") {
      list = list.filter(n => n.type === "time_change");
    } else if (state.updateFilter === "postponed") {
      list = list.filter(n => n.type === "postponement");
    } else if (state.updateFilter === "new") {
      list = list.filter(n => n.type === "new_event");
    } else if (state.updateFilter === "registered") {
      const regEventIds = new Set(state.registrations.map(r => r.event_id));
      list = list.filter(n => regEventIds.has(n.event_id));
    }

    // Pinned events
    const pinnedEvents = state.events.filter(e => state.pinnedEventIds.includes(e.id));

    return `
      <div>
        <div class="page-greeting">
          <div>
            <h1 class="greeting-title">Live Event Updates 🔔</h1>
            <p class="greeting-subtitle">Instant tracking of venue relocations, rescheduled timings, and official announcements.</p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn-outline" onclick="window.app.markAllNotificationsRead()">
              ${getIcon("checkCircle", 16)} Mark All as Read
            </button>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Left: Filtered Updates Stream -->
          <div>
            <!-- Filter Pills Bar (PDF Page 5) -->
            <div class="filter-pills-bar">
              <button class="filter-pill ${state.updateFilter === 'All' ? 'active' : ''}" onclick="window.app.setUpdateFilter('All')">
                All Updates (${state.notifications.length})
              </button>
              <button class="filter-pill ${state.updateFilter === 'venue' ? 'active' : ''}" onclick="window.app.setUpdateFilter('venue')">
                Venue Changes
              </button>
              <button class="filter-pill ${state.updateFilter === 'postponed' ? 'active' : ''}" onclick="window.app.setUpdateFilter('postponed')">
                Postponements
              </button>
              <button class="filter-pill ${state.updateFilter === 'time' ? 'active' : ''}" onclick="window.app.setUpdateFilter('time')">
                Time Changes
              </button>
              <button class="filter-pill ${state.updateFilter === 'new' ? 'active' : ''}" onclick="window.app.setUpdateFilter('new')">
                New Events
              </button>
              <button class="filter-pill ${state.updateFilter === 'registered' ? 'active' : ''}" onclick="window.app.setUpdateFilter('registered')">
                Registered Only
              </button>
            </div>

            <!-- Updates Stream Cards -->
            <div class="updates-list">
              ${list.length === 0 ? `
                <div class="card" style="padding: 3rem; text-align: center; color: var(--text-muted);">
                  ${getIcon("bell", 36, "text-muted")}
                  <p style="margin-top: 1rem; font-weight: 600;">No updates in this filter category.</p>
                </div>
              ` : list.map(notif => {
                let badgeClass = "badge-venue";
                let badgeLabel = "Venue Change";
                let iconColor = "purple";
                let iconName = "mapPin";

                if (notif.type === "postponement") {
                  badgeClass = "badge-postponed";
                  badgeLabel = "Postponed";
                  iconColor = "amber";
                  iconName = "clock";
                } else if (notif.type === "cancellation") {
                  badgeClass = "badge-cancelled";
                  badgeLabel = "Cancelled";
                  iconColor = "red";
                  iconName = "xCircle";
                } else if (notif.type === "registration_confirmed") {
                  badgeClass = "badge-confirmed";
                  badgeLabel = "Ticket Confirmed";
                  iconColor = "green";
                  iconName = "checkCircle";
                } else if (notif.type === "new_event") {
                  badgeClass = "badge-upcoming";
                  badgeLabel = "New Event";
                  iconColor = "blue";
                  iconName = "sparkles";
                }

                const ev = state.events.find(e => e.id === notif.event_id);

                return `
                  <div class="card" style="padding: 1.5rem; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.75rem;">
                      <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div class="update-icon-circle stat-icon ${iconColor}">
                          ${getIcon(iconName, 20)}
                        </div>
                        <div>
                          <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span class="badge ${badgeClass}">${badgeLabel}</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">${notif.time_ago}</span>
                          </div>
                          <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">
                            ${notif.title}
                          </div>
                        </div>
                      </div>

                      ${!notif.read ? `
                        <button class="btn-outline" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" onclick="window.app.markNotificationRead('${notif.id}')">
                          Mark Read
                        </button>
                      ` : ''}
                    </div>

                    <div style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">
                      ${notif.message}
                    </div>

                    <!-- Clear Visual Comparison Box (Old vs New values) -->
                    ${notif.old_value && notif.new_value ? `
                      <div class="change-compare-box" style="margin-bottom: 1rem; padding: 0.85rem 1.15rem;">
                        <div>
                          <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Previous</div>
                          <div class="old-val" style="font-size: 0.95rem;">${notif.old_value}</div>
                        </div>
                        <div class="arrow-val" style="font-size: 1.25rem;">➔</div>
                        <div>
                          <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--primary); font-weight: 700;">Updated</div>
                          <div class="new-val" style="font-size: 0.95rem;">${notif.new_value}</div>
                        </div>
                      </div>
                    ` : ''}

                    <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.85rem;">
                      <span style="font-size: 0.8rem; color: var(--text-muted);">
                        ${ev ? `Event Date: <strong>${ev.date}</strong>` : ''}
                      </span>
                      ${ev ? `
                        <button class="btn-secondary" style="padding: 0.4rem 0.95rem; font-size: 0.8rem;" onclick="window.app.openDetailsModal(state.events.find(e => e.id === '${ev.id}'))">
                          View Event Details ${getIcon("chevronRight", 14)}
                        </button>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right: Today's Timeline & Pinned Events -->
          <div>
            <!-- Today's Timeline (PDF Page 5) -->
            <div class="today-timeline-card">
              <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
                ${getIcon("clock", 18, "text-primary")} Today's Campus Timeline
              </div>

              <div class="timeline-item">
                <div class="timeline-time-col">09A</div>
                <div class="timeline-content-col">
                  <div class="timeline-event-name">CodeSprint Registration Closes</div>
                  <div class="timeline-event-sub">Final 12 team slots remaining</div>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-time-col">10A</div>
                <div class="timeline-content-col">
                  <div class="timeline-event-name">IoT Workshop Venue Moved</div>
                  <div class="timeline-event-sub">Shifted to Electronics Block 304</div>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-time-col">02P</div>
                <div class="timeline-content-col">
                  <div class="timeline-event-name">UI/UX Sprint Q&A Webinar</div>
                  <div class="timeline-event-sub">Design Studio Live Session</div>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-time-col">05P</div>
                <div class="timeline-content-col">
                  <div class="timeline-event-name">Cultural Fest Band Soundchecks</div>
                  <div class="timeline-event-sub">Open Air Amphitheatre Arena</div>
                </div>
              </div>
            </div>

            <!-- Important Pinned Events Widget (PDF Page 5) -->
            <div class="pinned-events-card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 0.4rem;">
                  ${getIcon("pin", 18, "text-primary")} Pinned Priority Events
                </div>
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">${pinnedEvents.length} Pinned</span>
              </div>

              ${pinnedEvents.length === 0 ? `
                <p style="font-size: 0.85rem; color: var(--text-muted);">No pinned events yet. Pin an event from your registrations to access it quickly here.</p>
              ` : pinnedEvents.map(p => `
                <div class="pinned-item-box">
                  <div>
                    <div class="pinned-item-title">${p.title}</div>
                    <div class="pinned-item-time">${p.date} • ${p.venue.split('-')[0]}</div>
                  </div>
                  <button class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="window.app.openDetailsModal(state.events.find(e => e.id === '${p.id}'))">
                    Open
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 6. PAGE 6: MOBILE RESPONSIVE INTERFACE & SIMULATOR
  function renderMobilePage() {
    const nextReg = state.registrations[0];
    const nextEvent = nextReg ? state.events.find(e => e.id === nextReg.event_id) : state.events[0];
    const cd = calculateCountdown(nextEvent ? nextEvent.date : null, nextEvent ? nextEvent.time : null);

    return `
      <div>
        <div class="page-greeting">
          <div>
            <h1 class="greeting-title">Mobile Interface Experience (Page 6) 📱</h1>
            <p class="greeting-subtitle">Recreated exact mobile layout with bottom navigation, greeting, reminder countdown, and alerts.</p>
          </div>
          <button class="btn-primary" onclick="window.app.navigate('dashboard')">
            Back to Desktop Dashboard
          </button>
        </div>

        <!-- Phone Device Frame -->
        <div class="mobile-simulator-overlay">
          <div class="mobile-device-frame">
            <div class="mobile-notch"></div>

            <div class="mobile-screen-content">
              <!-- Mobile Top Header -->
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.65rem;">
                  <img src="${state.user.avatar}" class="user-avatar" style="width: 36px; height: 36px;" />
                  <div>
                    <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">Welcome back</div>
                    <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-main);">${state.user.name}</div>
                  </div>
                </div>

                <div class="icon-btn-round" style="width: 36px; height: 36px;" onclick="window.app.navigate('updates')">
                  ${getIcon("bell", 18)}
                  <span class="badge-dot"></span>
                </div>
              </div>

              <!-- Mobile Featured Reminder Countdown Card -->
              ${nextEvent ? `
                <div style="background: linear-gradient(135deg, #5845F5 0%, #8751F5 100%); border-radius: 20px; padding: 1.25rem; color: #FFFFFF; margin-bottom: 1.25rem; box-shadow: 0 10px 25px rgba(88,69,245,0.25);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-size: 0.7rem; font-weight: 700; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 999px;">
                      ⏰ Starts in ${cd.days}d ${cd.hours}h
                    </span>
                    <span style="font-size: 0.7rem; opacity: 0.85;">${nextEvent.category}</span>
                  </div>

                  <div style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.65rem; line-height: 1.2;">
                    ${nextEvent.title}
                  </div>

                  <div style="font-size: 0.75rem; opacity: 0.9; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 2px;">
                    <div>📅 ${nextEvent.date} • ${nextEvent.time}</div>
                    <div>📍 ${nextEvent.venue}</div>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 4px; font-variant-numeric: tabular-nums;">
                      <span style="background: rgba(255,255,255,0.2); padding: 4px 6px; border-radius: 6px; font-size: 0.9rem; font-weight: 800;">${pad2(cd.days)}d</span>
                      <span style="background: rgba(255,255,255,0.2); padding: 4px 6px; border-radius: 6px; font-size: 0.9rem; font-weight: 800;">${pad2(cd.hours)}h</span>
                      <span style="background: rgba(255,255,255,0.2); padding: 4px 6px; border-radius: 6px; font-size: 0.9rem; font-weight: 800;">${pad2(cd.minutes)}m</span>
                      <span style="background: rgba(255,255,255,0.2); padding: 4px 6px; border-radius: 6px; font-size: 0.9rem; font-weight: 800;">${pad2(cd.seconds)}s</span>
                    </div>

                    ${nextReg ? `
                      <button class="btn-ticket-hero" style="padding: 0.45rem 0.85rem; font-size: 0.75rem;" onclick="window.app.openTicketModal(state.registrations.find(r => r.event_id === '${nextEvent.id}'))">
                        Ticket 🎟️
                      </button>
                    ` : `
                      <button class="btn-ticket-hero" style="padding: 0.45rem 0.85rem; font-size: 0.75rem;" onclick="window.app.registerForEvent('${nextEvent.id}')">
                        Register
                      </button>
                    `}
                  </div>
                </div>
              ` : ''}

              <!-- Section: Upcoming Events -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">Upcoming Events</span>
                <span style="font-size: 0.75rem; color: var(--primary); font-weight: 700; cursor: pointer;" onclick="window.app.navigate('events')">See All</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.5rem;">
                ${state.events.slice(0, 3).map(ev => `
                  <div style="background: #FFFFFF; border-radius: 14px; padding: 0.85rem; border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--primary-light); display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;">
                      <span style="font-size: 0.6rem; font-weight: 800; color: var(--primary);">${new Date(ev.date).toLocaleString('default', { month: 'short' })}</span>
                      <span style="font-size: 1.05rem; font-weight: 800; line-height: 1;">${ev.date.split('-')[2]}</span>
                    </div>
                    <div style="flex: 1; overflow: hidden;">
                      <div style="font-size: 0.825rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${ev.title}</div>
                      <div style="font-size: 0.7rem; color: var(--text-muted);">${ev.venue.split('-')[0]}</div>
                    </div>
                    <button class="btn-secondary" style="padding: 0.35rem 0.65rem; font-size: 0.7rem;" onclick="window.app.openDetailsModal(state.events.find(e => e.id === '${ev.id}'))">
                      View
                    </button>
                  </div>
                `).join('')}
              </div>

              <!-- Section: Event Alerts Feed -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">Event Alerts</span>
                <span style="font-size: 0.75rem; color: var(--primary); font-weight: 700; cursor: pointer;" onclick="window.app.navigate('updates')">All</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                ${state.notifications.slice(0, 3).map(n => `
                  <div style="background: #FFFFFF; border-radius: 12px; padding: 0.75rem; border: 1px solid var(--border-subtle); font-size: 0.75rem;">
                    <div style="font-weight: 700; color: var(--text-main); margin-bottom: 2px;">${n.title}</div>
                    <div style="color: var(--text-muted);">${n.message}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Fixed Bottom Navigation Bar (PDF Page 6 Reference) -->
            <div class="mobile-bottom-nav">
              <button class="mobile-nav-btn ${state.mobileTab === 'home' ? 'active' : ''}" onclick="window.app.setMobileTab('home')">
                ${getIcon("home", 20)}
                <span>Home</span>
              </button>
              <button class="mobile-nav-btn ${state.mobileTab === 'events' ? 'active' : ''}" onclick="window.app.setMobileTab('events'); window.app.navigate('events');">
                ${getIcon("calendar", 20)}
                <span>Events</span>
              </button>
              <button class="mobile-nav-btn ${state.mobileTab === 'mine' ? 'active' : ''}" onclick="window.app.setMobileTab('mine'); window.app.navigate('registrations');">
                ${getIcon("ticket", 20)}
                <span>Mine (${state.registrations.length})</span>
              </button>
              <button class="mobile-nav-btn ${state.mobileTab === 'alerts' ? 'active' : ''}" onclick="window.app.setMobileTab('alerts'); window.app.navigate('updates');">
                ${getIcon("bell", 20)}
                <span>Alerts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 7. ALL EVENTS / DISCOVERY PAGE (PART 4, FEATURE 1)
  function renderEventsDiscoveryPage() {
    let filtered = [...state.events];

    if (state.categoryFilter !== "All") {
      filtered = filtered.filter(e => e.category === state.categoryFilter);
    }
    if (state.statusFilter !== "All") {
      filtered = filtered.filter(e => e.status === state.statusFilter);
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q));
    }

    const categories = ["All", "Technical", "Workshop", "Hackathon", "Seminar", "Cultural", "Sports", "Symposium", "Competition"];
    const statuses = ["All", "Upcoming", "Registration Open", "Fully Booked", "Venue Changed", "Postponed"];

    return `
      <div>
        <div class="page-greeting">
          <div>
            <h1 class="greeting-title">Explore Campus Events 🧭</h1>
            <p class="greeting-subtitle">Discover workshops, hackathons, symposiums, and cultural fests happening across all departments.</p>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="card" style="padding: 1.25rem 1.5rem; margin-bottom: 2rem;">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin-bottom: 1rem;">
            <div class="search-container" style="flex: 1; max-width: 450px;">
              ${getIcon("search", 18, "text-muted")}
              <input type="text" class="search-input" placeholder="Search by event title, keyword or venue..." value="${state.searchQuery}" oninput="window.app.setSearch(this.value)" />
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">Status:</span>
              <select class="form-control" style="width: auto; padding: 0.45rem 1rem;" onchange="window.app.setStatusFilter(this.value)">
                ${statuses.map(s => `<option value="${s}" ${state.statusFilter === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Category Pills -->
          <div class="filter-pills-bar" style="margin-bottom: 0;">
            ${categories.map(cat => `
              <button class="filter-pill ${state.categoryFilter === cat ? 'active' : ''}" onclick="window.app.setCategoryFilter('${cat}')">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Events Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
          ${filtered.length === 0 ? `
            <div class="card" style="grid-column: 1 / -1; padding: 4rem; text-align: center; color: var(--text-muted);">
              ${getIcon("search", 40, "text-muted")}
              <h3 style="margin-top: 1rem;">No events found</h3>
              <p>Try adjusting your search keywords or category filters.</p>
            </div>
          ` : filtered.map(ev => {
            const isReg = state.registrations.some(r => r.event_id === ev.id && r.status === "Confirmed");
            let badgeClass = "badge-upcoming";
            if (ev.status === "Venue Changed") badgeClass = "badge-venue";
            if (ev.status === "Postponed") badgeClass = "badge-postponed";
            if (ev.status === "Fully Booked") badgeClass = "badge-full";
            if (ev.status === "Cancelled") badgeClass = "badge-cancelled";

            const percentBooked = Math.round((ev.registered_count / ev.total_seats) * 100);

            return `
              <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <span class="badge ${badgeClass}">${ev.status}</span>
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); background: #F5F3FF; padding: 2px 8px; border-radius: 6px;">
                      ${ev.category}
                    </span>
                  </div>

                  <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.5rem; cursor: pointer;" onclick="window.app.openDetailsModal(state.events.find(e => e.id === '${ev.id}'))">
                    ${ev.title}
                  </h3>

                  <p style="font-size: 0.825rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${ev.description}
                  </p>

                  <div style="display: flex; flex-direction: column; gap: 0.45rem; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      ${getIcon("calendar", 15, "text-primary")} <strong>${ev.date}</strong>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      ${getIcon("clock", 15, "text-primary")} ${ev.time}
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      ${getIcon("mapPin", 15, "text-primary")} ${ev.venue}
                    </div>
                  </div>

                  <!-- Seat Availability Bar -->
                  <div style="margin-bottom: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">
                      <span>Available Seats</span>
                      <span>${ev.available_seats} / ${ev.total_seats}</span>
                    </div>
                    <div style="height: 6px; background: #EAE6FC; border-radius: 999px; overflow: hidden;">
                      <div style="height: 100%; width: ${percentBooked}%; background: ${percentBooked >= 95 ? '#EF4444' : 'var(--primary)'}; border-radius: 999px;"></div>
                    </div>
                  </div>
                </div>

                <div style="display: flex; gap: 0.5rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
                  <button class="btn-outline" style="flex: 1; justify-content: center; font-size: 0.85rem;" onclick="window.app.openDetailsModal(state.events.find(e => e.id === '${ev.id}'))">
                    Details
                  </button>
                  ${isReg ? `
                    <button class="btn-secondary" style="flex: 1.2; justify-content: center; font-size: 0.85rem;" onclick="window.app.openTicketModal(state.registrations.find(r => r.event_id === '${ev.id}'))">
                      ${getIcon("ticket", 16)} Ticket
                    </button>
                  ` : `
                    <button class="btn-primary" style="flex: 1.2; justify-content: center; font-size: 0.85rem;" ${ev.available_seats === 0 ? 'disabled style="opacity: 0.5;"' : ''} onclick="window.app.registerForEvent('${ev.id}')">
                      ${ev.available_seats === 0 ? 'Full' : 'Register'}
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // 8. ORGANISER DASHBOARD (PART 5)
  function renderOrganiserPage() {
    const totalRegs = state.events.reduce((sum, e) => sum + e.registered_count, 0);

    return `
      <div>
        <div class="page-greeting">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span class="badge" style="background: #F5F3FF; color: var(--primary); font-size: 0.8rem;">
                ${getIcon("shield", 14)} Organiser Portal
              </span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${state.user.name}</span>
            </div>
            <h1 class="greeting-title">Event Management & Control 🎛️</h1>
            <p class="greeting-subtitle">Publish new events, manage venue changes, reschedule timings, and view registered student rosters.</p>
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button class="btn-primary" onclick="window.app.openOrganiserAction('createEvent', null)">
              ${getIcon("plus", 18)} Create New Event
            </button>
            <button class="btn-outline" onclick="window.app.navigate('dashboard')">
              Switch to Student View
            </button>
          </div>
        </div>

        <!-- Organiser Stats Grid -->
        <div class="stats-grid" style="margin-bottom: 2rem;">
          <div class="stat-card">
            <div class="stat-icon purple">${getIcon("calendar", 24)}</div>
            <div>
              <div class="stat-value">${state.events.length}</div>
              <div class="stat-label">Total Events</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">${getIcon("users", 24)}</div>
            <div>
              <div class="stat-value">${totalRegs}</div>
              <div class="stat-label">Total Registrations</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon amber">${getIcon("alertTriangle", 24)}</div>
            <div>
              <div class="stat-value">${state.history.length}</div>
              <div class="stat-label">Published Changes</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon blue">${getIcon("mapPin", 24)}</div>
            <div>
              <div class="stat-value">6</div>
              <div class="stat-label">Active Campus Venues</div>
            </div>
          </div>
        </div>

        <!-- Events Management Table -->
        <div class="card" style="padding: 1.5rem; overflow-x: auto;">
          <div style="font-size: 1.15rem; font-weight: 800; margin-bottom: 1.25rem;">
            Manage Events & Publish Updates
          </div>

          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-subtle); color: var(--text-muted);">
                <th style="padding: 0.75rem 1rem;">Event Details</th>
                <th style="padding: 0.75rem 1rem;">Category</th>
                <th style="padding: 0.75rem 1rem;">Date & Time</th>
                <th style="padding: 0.75rem 1rem;">Current Venue</th>
                <th style="padding: 0.75rem 1rem;">Status</th>
                <th style="padding: 0.75rem 1rem;">Registrations</th>
                <th style="padding: 0.75rem 1rem; text-align: right;">Action Controls</th>
              </tr>
            </thead>
            <tbody>
              ${state.events.map(ev => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 1rem;">
                    <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${ev.title}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${ev.organizer_name}</div>
                  </td>
                  <td style="padding: 1rem;">
                    <span style="font-size: 0.75rem; font-weight: 600; background: #F5F3FF; color: var(--primary); padding: 3px 8px; border-radius: 6px;">
                      ${ev.category}
                    </span>
                  </td>
                  <td style="padding: 1rem;">
                    <div style="font-weight: 600;">${ev.date}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${ev.time}</div>
                  </td>
                  <td style="padding: 1rem;">
                    <span style="font-weight: 600; color: var(--text-main);">${ev.venue}</span>
                  </td>
                  <td style="padding: 1rem;">
                    <span class="badge ${ev.status === 'Venue Changed' ? 'badge-venue' : ev.status === 'Postponed' ? 'badge-postponed' : ev.status === 'Cancelled' ? 'badge-cancelled' : 'badge-upcoming'}">
                      ${ev.status}
                    </span>
                  </td>
                  <td style="padding: 1rem;">
                    <div style="font-weight: 700;">${ev.registered_count} / ${ev.total_seats}</div>
                    <button style="font-size: 0.75rem; color: var(--primary); background: none; border: none; cursor: pointer; text-decoration: underline; padding: 0;" onclick="window.app.openRosterModal(state.events.find(e => e.id === '${ev.id}'))">
                      View Roster
                    </button>
                  </td>
                  <td style="padding: 1rem; text-align: right;">
                    <div style="display: inline-flex; gap: 0.4rem;">
                      <!-- Venue Change Button -->
                      <button class="btn-outline" style="padding: 0.4rem 0.65rem; font-size: 0.75rem;" title="Change Venue" onclick="window.app.openOrganiserAction('changeVenue', '${ev.id}')">
                        ${getIcon("mapPin", 14)} Venue
                      </button>
                      <!-- Postpone Button -->
                      <button class="btn-outline" style="padding: 0.4rem 0.65rem; font-size: 0.75rem;" title="Postpone Event" onclick="window.app.openOrganiserAction('postpone', '${ev.id}')">
                        ${getIcon("clock", 14)} Postpone
                      </button>
                      <!-- Cancel Button -->
                      <button class="btn-danger" style="padding: 0.4rem 0.65rem; font-size: 0.75rem;" title="Cancel Event" onclick="window.app.openOrganiserAction('cancelEvent', '${ev.id}')">
                        ${getIcon("xCircle", 14)}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Audit History Log Section (PART 4, FEATURE 5) -->
        <div class="card" style="padding: 1.5rem; margin-top: 2rem;">
          <div style="font-size: 1.15rem; font-weight: 800; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
            ${getIcon("refreshCw", 18, "text-primary")} Change History & Student Notification Audit Log
          </div>

          <div class="events-column">
            ${state.history.map(h => `
              <div style="background: #FAF9FE; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem; display: flex; align-items: flex-start; justify-content: space-between;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span class="badge ${h.change_type === 'venue_change' ? 'badge-venue' : h.change_type === 'postponement' ? 'badge-postponed' : 'badge-cancelled'}">
                      ${h.change_type.replace('_', ' ').toUpperCase()}
                    </span>
                    <strong style="color: var(--text-main); font-size: 0.95rem;">${h.event_title}</strong>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${h.updated_at}</span>
                  </div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
                    <strong>Reason:</strong> ${h.reason}
                  </div>
                </div>

                <div style="font-size: 0.75rem; font-weight: 700; color: #10B981; background: #ECFDF5; padding: 4px 10px; border-radius: 999px;">
                  ✓ Synced to Students
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // --- MODAL DIALOGS RENDERER ---
  function renderModals() {
    if (!state.activeModal) return '';

    const data = state.modalData;

    // 1. DIGITAL TICKET MODAL (PART 4, FEATURE 6)
    if (state.activeModal === "ticket") {
      const qrSvg = generateQRCodeSVG(data.qr_code_data || data.ticket_id, 160);
      return `
        <div class="modal-overlay active" onclick="if(event.target === this) window.app.closeModal()">
          <div class="modal-box" style="max-width: 480px;">
            <div class="modal-header">
              <div class="modal-title">${getIcon("ticket", 20, "text-primary")} Digital Event Admission Pass</div>
              <button class="modal-close-btn" onclick="window.app.closeModal()">${getIcon("xCircle", 20)}</button>
            </div>

            <div class="modal-body">
              <div class="ticket-wrapper" id="printable-ticket">
                <div class="ticket-top">
                  <div class="ticket-notch-left"></div>
                  <div class="ticket-notch-right"></div>
                  <div style="font-size: 0.75rem; font-weight: 700; opacity: 0.85; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
                    CampusPulse Official Pass
                  </div>
                  <div style="font-size: 1.4rem; font-weight: 800; line-height: 1.2;">${data.event_title}</div>
                  <div style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.95;">Ticket ID: <strong>${data.ticket_id}</strong></div>
                </div>

                <div class="ticket-body">
                  <div class="qr-code-box">
                    ${qrSvg}
                  </div>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                    Scan at entrance venue terminal for verified check-in
                  </div>

                  <div style="background: #F8F7FE; border-radius: 12px; padding: 1rem; text-align: left; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--text-muted);">Attendee:</span>
                      <strong style="color: var(--text-main);">${state.user.name}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--text-muted);">Department:</span>
                      <strong>${state.user.department}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--text-muted);">Event Date:</span>
                      <strong>${data.event_date}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--text-muted);">Timing:</span>
                      <strong>${data.event_time}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: var(--text-muted);">Venue:</span>
                      <strong style="color: var(--primary);">${data.venue}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn-outline" onclick="window.print()">
                ${getIcon("printer", 16)} Print Pass
              </button>
              <button class="btn-primary" onclick="showToast('Ticket Saved', 'Digital pass downloaded to your local device.'); window.app.closeModal();">
                ${getIcon("download", 16)} Save Pass
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 2. EVENT DETAILS MODAL (PART 4, FEATURE 2)
    if (state.activeModal === "details") {
      const isReg = state.registrations.some(r => r.event_id === data.id && r.status === "Confirmed");
      return `
        <div class="modal-overlay active" onclick="if(event.target === this) window.app.closeModal()">
          <div class="modal-box">
            <div class="modal-header">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="badge badge-upcoming">${data.status}</span>
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${data.category}</span>
              </div>
              <button class="modal-close-btn" onclick="window.app.closeModal()">${getIcon("xCircle", 20)}</button>
            </div>

            <div class="modal-body">
              <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.85rem;">
                ${data.title}
              </h2>

              <p style="color: var(--text-muted); font-size: 0.925rem; line-height: 1.6; margin-bottom: 1.5rem;">
                ${data.description}
              </p>

              <div style="background: #F8F7FE; border-radius: 14px; padding: 1.25rem; margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.85rem;">
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem;">Date & Time</span>
                  <strong>${data.date} • ${data.time}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem;">Venue</span>
                  <strong style="color: var(--primary);">${data.venue}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem;">Organiser</span>
                  <strong>${data.organizer_name}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem;">Available Seats</span>
                  <strong>${data.available_seats} remaining of ${data.total_seats}</strong>
                </div>
              </div>

              <div style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.65rem;">
                Participation Guidelines & Rules:
              </div>
              <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
                ${(data.rules || ["Bring valid college photo ID card", "Reach venue 15 minutes prior to scheduled start"]).map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>

            <div class="modal-footer">
              <button class="btn-outline" onclick="window.app.closeModal()">Close</button>
              ${isReg ? `
                <button class="btn-secondary" onclick="window.app.openTicketModal(state.registrations.find(r => r.event_id === '${data.id}'))">
                  ${getIcon("ticket", 16)} View Confirmed Ticket
                </button>
              ` : `
                <button class="btn-primary" ${data.available_seats === 0 ? 'disabled style="opacity: 0.5;"' : ''} onclick="window.app.registerForEvent('${data.id}')">
                  ${data.available_seats === 0 ? 'Fully Booked' : 'Register for Event'}
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }

    // 3. CHANGE VENUE MODAL (ORGANISER ACTION)
    if (state.activeModal === "changeVenue") {
      return `
        <div class="modal-overlay active" onclick="if(event.target === this) window.app.closeModal()">
          <div class="modal-box" style="max-width: 500px;">
            <div class="modal-header">
              <div class="modal-title">${getIcon("mapPin", 20, "text-primary")} Change Event Venue</div>
              <button class="modal-close-btn" onclick="window.app.closeModal()">${getIcon("xCircle", 20)}</button>
            </div>

            <form onsubmit="const v = document.getElementById('new-venue-val').value; const r = document.getElementById('venue-reason-val').value; window.app.submitVenueChange('${data.id}', v, r); return false;">
              <div class="modal-body">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                  Updating the venue will automatically broadcast an urgent alert to all registered students and refresh their dashboard passes.
                </p>

                <div class="form-group">
                  <label class="form-label">Event</label>
                  <input type="text" class="form-control" value="${data.title}" disabled style="background: #F1F5F9;" />
                </div>

                <div class="form-group">
                  <label class="form-label">Current Venue</label>
                  <input type="text" class="form-control" value="${data.venue}" disabled style="background: #F1F5F9;" />
                </div>

                <div class="form-group">
                  <label class="form-label">New Relocated Venue *</label>
                  <input type="text" id="new-venue-val" class="form-control" placeholder="e.g. Mechanical Seminar Hall 2" required />
                </div>

                <div class="form-group">
                  <label class="form-label">Reason for Venue Change *</label>
                  <textarea id="venue-reason-val" class="form-control" rows="2" placeholder="e.g. Higher capacity and hardware power socket requirements" required></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-outline" onclick="window.app.closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Publish Venue Change & Notify Students</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    // 4. POSTPONE EVENT MODAL (ORGANISER ACTION)
    if (state.activeModal === "postpone") {
      return `
        <div class="modal-overlay active" onclick="if(event.target === this) window.app.closeModal()">
          <div class="modal-box" style="max-width: 500px;">
            <div class="modal-header">
              <div class="modal-title">${getIcon("clock", 20, "text-primary")} Postpone / Reschedule Event</div>
              <button class="modal-close-btn" onclick="window.app.closeModal()">${getIcon("xCircle", 20)}</button>
            </div>

            <form onsubmit="const d = document.getElementById('new-date-val').value; const t = document.getElementById('new-time-val').value; const r = document.getElementById('postpone-reason-val').value; window.app.submitPostponement('${data.id}', d, t, r); return false;">
              <div class="modal-body">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                  Rescheduling will mark the event as <strong>POSTPONED</strong>, adjust all student countdown timers, and notify all attendees.
                </p>

                <div class="form-group">
                  <label class="form-label">Event</label>
                  <input type="text" class="form-control" value="${data.title}" disabled style="background: #F1F5F9;" />
                </div>

                <div class="form-group">
                  <label class="form-label">Current Date</label>
                  <input type="text" class="form-control" value="${data.date} • ${data.time}" disabled style="background: #F1F5F9;" />
                </div>

                <div class="form-group">
                  <label class="form-label">New Event Date *</label>
                  <input type="date" id="new-date-val" class="form-control" required />
                </div>

                <div class="form-group">
                  <label class="form-label">New Time (Optional)</label>
                  <input type="text" id="new-time-val" class="form-control" placeholder="e.g. 10:30 AM - 04:30 PM" value="${data.time}" />
                </div>

                <div class="form-group">
                  <label class="form-label">Reason for Postponement *</label>
                  <textarea id="postpone-reason-val" class="form-control" rows="2" placeholder="e.g. Clash with university semester examinations schedule" required></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-outline" onclick="window.app.closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Publish Postponement</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    // 5. CANCEL EVENT MODAL (ORGANISER ACTION)
    if (state.activeModal === "cancelEvent") {
      return `
        <div class="modal-overlay active" onclick="if(event.target === this) window.app.closeModal()">
          <div class="modal-box" style="max-width: 480px;">
            <div class="modal-header">
              <div class="modal-title" style="color: #DC2626;">${getIcon("xCircle", 20)} Cancel Event</div>
              <button class="modal-close-btn" onclick="window.app.closeModal()">${getIcon("xCircle", 20)}</button>
            </div>

            <form onsubmit="const r = document.getElementById('cancel-reason-val').value; window.app.submitCancellation('${data.id}', r); return false;">
              <div class="modal-body">
                <p style="font-size: 0.875rem; color: #DC2626; font-weight: 600; margin-bottom: 1.25rem;">
                  Warning: Cancelling this event will halt all new registrations and dispatch an official cancellation notice to all registered students.
                </p>

                <div class="form-group">
                  <label class="form-label">Event</label>
                  <input type="text" class="form-control" value="${data.title}" disabled style="background: #F1F5F9;" />
                </div>

                <div class="form-group">
                  <label class="form-label">Reason for Cancellation *</label>
                  <textarea id="cancel-reason-val" class="form-control" rows="3" placeholder="Provide clear reason for cancellation..." required></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-outline" onclick="window.app.closeModal()">Nevermind</button>
                <button type="submit" class="btn-danger">Confirm Cancellation</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    // 6. CREATE NEW EVENT MODAL (ORGANISER ACTION)
    if (state.activeModal === "createEvent") {
      return `
        <div class="modal-overlay active" onclick="if(event.target === this) window.app.closeModal()">
          <div class="modal-box" style="max-width: 620px;">
            <div class="modal-header">
              <div class="modal-title">${getIcon("plus", 20, "text-primary")} Create New College Event</div>
              <button class="modal-close-btn" onclick="window.app.closeModal()">${getIcon("xCircle", 20)}</button>
            </div>

            <form onsubmit="
              const f = {
                title: document.getElementById('new-ev-title').value,
                description: document.getElementById('new-ev-desc').value,
                category: document.getElementById('new-ev-cat').value,
                date: document.getElementById('new-ev-date').value,
                time: document.getElementById('new-ev-time').value,
                venue: document.getElementById('new-ev-venue').value,
                total_seats: document.getElementById('new-ev-seats').value,
                rules: document.getElementById('new-ev-rules').value
              };
              window.app.submitCreateEvent(f);
              return false;
            ">
              <div class="modal-body">
                <div class="form-group">
                  <label class="form-label">Event Title *</label>
                  <input type="text" id="new-ev-title" class="form-control" placeholder="e.g. NextGen Web3 & AI Hackathon" required />
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="form-group">
                    <label class="form-label">Category *</label>
                    <select id="new-ev-cat" class="form-control" required>
                      <option value="Technical">Technical</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Sports">Sports</option>
                      <option value="Symposium">Symposium</option>
                      <option value="Competition">Competition</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Capacity / Seats *</label>
                    <input type="number" id="new-ev-seats" class="form-control" value="100" min="10" required />
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="form-group">
                    <label class="form-label">Event Date *</label>
                    <input type="date" id="new-ev-date" class="form-control" required />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Event Timings *</label>
                    <input type="text" id="new-ev-time" class="form-control" placeholder="e.g. 09:30 AM - 04:30 PM" required />
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Campus Venue *</label>
                  <input type="text" id="new-ev-venue" class="form-control" placeholder="e.g. Main Auditorium, Block A" required />
                </div>

                <div class="form-group">
                  <label class="form-label">Event Description *</label>
                  <textarea id="new-ev-desc" class="form-control" rows="2" placeholder="Brief details about agenda, eligibility, and prizes..." required></textarea>
                </div>

                <div class="form-group">
                  <label class="form-label">Guidelines / Rules (one per line)</label>
                  <textarea id="new-ev-rules" class="form-control" rows="2" placeholder="College ID mandatory&#10;Bring your own laptop"></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-outline" onclick="window.app.closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Publish Event to CampusPulse</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    // 7. EVENT ROSTER MODAL
    if (state.activeModal === "roster") {
      const registeredStudents = state.registrations.filter(r => r.event_id === data.id);
      return `
        <div class="modal-overlay active" onclick="if(event.target === this) window.app.closeModal()">
          <div class="modal-box" style="max-width: 580px;">
            <div class="modal-header">
              <div>
                <div class="modal-title">Registered Student Roster</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${data.title} • ${data.registered_count} Confirmed</div>
              </div>
              <button class="modal-close-btn" onclick="window.app.closeModal()">${getIcon("xCircle", 20)}</button>
            </div>

            <div class="modal-body">
              ${registeredStudents.length === 0 ? `
                <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
                  No students currently registered for this event yet.
                </div>
              ` : `
                <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse;">
                  <thead>
                    <tr style="border-bottom: 2px solid var(--border-subtle); color: var(--text-muted);">
                      <th style="padding: 6px 0;">Student</th>
                      <th style="padding: 6px 0;">Ticket ID</th>
                      <th style="padding: 6px 0;">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${registeredStudents.map(r => `
                      <tr style="border-bottom: 1px solid var(--border-subtle);">
                        <td style="padding: 10px 0;">
                          <div style="font-weight: 700;">Alex Morgan</div>
                          <div style="font-size: 0.75rem; color: var(--text-muted);">alex.morgan@college.edu</div>
                        </td>
                        <td style="padding: 10px 0; font-family: monospace; font-weight: 600;">${r.ticket_id}</td>
                        <td style="padding: 10px 0;"><span class="badge badge-confirmed">Confirmed</span></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `}
            </div>

            <div class="modal-footer">
              <button class="btn-outline" onclick="window.print()">Export Roster CSV</button>
              <button class="btn-primary" onclick="window.app.closeModal()">Done</button>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  }

  // --- MAIN APPLICATION FRAME & SHELL RENDERER ---
  function render() {
    const appEl = document.getElementById("app");
    if (!appEl) return;

    // For landing page and login page, render full screen without dashboard sidebar
    if (state.currentRoute === "landing") {
      appEl.innerHTML = renderLandingPage() + renderModals();
      return;
    }
    if (state.currentRoute === "login") {
      appEl.innerHTML = renderLoginPage() + renderModals();
      return;
    }

    // Unread count
    const unreadCount = state.notifications.filter(n => !n.read).length;

    // Render Dashboard Shell (Sidebar + Topbar + Content)
    appEl.innerHTML = `
      <div class="app-layout">
        <!-- Sidebar Navigation (Exact replication of PDF Page 3) -->
        <aside class="sidebar">
          <a href="#" class="brand-logo" onclick="window.app.navigate('dashboard'); return false;">
            <div class="brand-icon-box">
              ${getIcon("activity", 22)}
            </div>
            <div>
              <div class="brand-text">CampusPulse</div>
              <div class="brand-tag">Event System</div>
            </div>
          </a>

          <div class="sidebar-nav">
            <a href="#" class="nav-item ${state.currentRoute === 'dashboard' ? 'active' : ''}" onclick="window.app.navigate('dashboard'); return false;">
              ${getIcon("activity", 18)}
              <span>Dashboard</span>
            </a>

            <a href="#" class="nav-item ${state.currentRoute === 'events' ? 'active' : ''}" onclick="window.app.navigate('events'); return false;">
              ${getIcon("calendar", 18)}
              <span>All Events</span>
            </a>

            <a href="#" class="nav-item ${state.currentRoute === 'registrations' ? 'active' : ''}" onclick="window.app.navigate('registrations'); return false;">
              ${getIcon("ticket", 18)}
              <span>My Registrations</span>
              ${state.registrations.length > 0 ? `<span class="nav-badge" style="background: var(--primary);">${state.registrations.length}</span>` : ''}
            </a>

            <a href="#" class="nav-item ${state.currentRoute === 'registrations' ? '' : ''}" onclick="window.app.navigate('registrations'); return false;">
              ${getIcon("clock", 18)}
              <span>Reminders</span>
            </a>

            <a href="#" class="nav-item ${state.currentRoute === 'updates' ? 'active' : ''}" onclick="window.app.navigate('updates'); return false;">
              ${getIcon("bell", 18)}
              <span>Event Updates</span>
              ${unreadCount > 0 ? `<span class="nav-badge">${unreadCount}</span>` : ''}
            </a>

            <a href="#" class="nav-item ${state.currentRoute === 'mobile' ? 'active' : ''}" onclick="window.app.navigate('mobile'); return false;">
              ${getIcon("smartphone", 18)}
              <span>Mobile App</span>
            </a>

            <a href="#" class="nav-item ${state.currentRoute === 'organiser' ? 'active' : ''}" onclick="window.app.navigate('organiser'); return false;">
              ${getIcon("shield", 18)}
              <span>Organiser Portal</span>
            </a>
          </div>

          <!-- Promotional Manage Alerts Card (PDF Page 3) -->
          <div class="sidebar-promo-card">
            <div class="promo-title">
              ${getIcon("sparkles", 14)} Manage Alerts
            </div>
            <div class="promo-desc">
              Get instant automated SMS and desktop push reminders for emergency venue relocations.
            </div>
            <button class="promo-btn" onclick="window.app.requestBrowserNotificationPermission()">
              Enable Alerts ${getIcon("chevronRight", 14)}
            </button>
          </div>

          <!-- Bottom User Card -->
          <div class="sidebar-user">
            <img src="${state.user.avatar}" class="user-avatar" alt="Avatar" />
            <div class="user-info">
              <div class="user-name">${state.user.name}</div>
              <div class="user-role">${state.user.role === 'organiser' ? 'Faculty Lead' : 'Student'}</div>
            </div>
            <button class="logout-btn" title="Sign Out" onclick="window.app.logout()">
              ${getIcon("logOut", 18)}
            </button>
          </div>
        </aside>

        <!-- Main Wrapper -->
        <main class="main-wrapper">
          <!-- Topbar -->
          <header class="topbar">
            <div class="search-container">
              ${getIcon("search", 18, "text-muted")}
              <input type="text" class="search-input" placeholder="Search events, workshops, venues..." value="${state.searchQuery}" onfocus="if(state.currentRoute !== 'events') window.app.navigate('events');" oninput="window.app.setSearch(this.value)" />
              <span class="search-kbd">⌘K</span>
            </div>

            <div class="topbar-actions">
              <div class="date-pill">
                ${getIcon("calendar", 16)}
                <span>${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>

              <!-- Notifications Bell -->
              <div class="icon-btn-round" title="Event Updates & Alerts" onclick="window.app.navigate('updates')">
                ${getIcon("bell", 18)}
                ${unreadCount > 0 ? `<span class="badge-dot"></span>` : ''}
              </div>

              <!-- User Profile Header -->
              <div style="display: flex; align-items: center; gap: 0.65rem; cursor: pointer;" onclick="window.app.setUserRole(state.user.role === 'student' ? 'organiser' : 'student')">
                <img src="${state.user.avatar}" class="user-avatar" style="width: 36px; height: 36px;" />
                <div style="text-align: left;">
                  <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">${state.user.name}</div>
                  <div style="font-size: 0.725rem; color: var(--text-muted);">${state.user.role === 'organiser' ? 'Organiser' : 'Student (3rd Year)'}</div>
                </div>
              </div>
            </div>
          </header>

          <!-- Content Body -->
          <div class="content-body">
            ${
              state.currentRoute === "dashboard" ? renderDashboardPage() :
              state.currentRoute === "events" ? renderEventsDiscoveryPage() :
              state.currentRoute === "registrations" ? renderRegisteredPage() :
              state.currentRoute === "updates" ? renderUpdatesPage() :
              state.currentRoute === "mobile" ? renderMobilePage() :
              state.currentRoute === "organiser" ? renderOrganiserPage() :
              renderDashboardPage()
            }
          </div>
        </main>
      </div>

      <!-- Modals Layer -->
      ${renderModals()}
    `;
  }

  // --- INTERVAL TICKER FOR LIVE COUNTDOWN ---
  setInterval(() => {
    // Only update digit boxes if on dashboard or mobile view
    if (state.currentRoute === "dashboard") {
      const nextReg = state.registrations.find(r => r.status === "Confirmed");
      const nextEvent = nextReg ? state.events.find(e => e.id === nextReg.event_id) : state.events[0];
      if (nextEvent) {
        const cd = calculateCountdown(nextEvent.date, nextEvent.time);
        const elDays = document.getElementById("cd-days");
        const elHours = document.getElementById("cd-hours");
        const elMins = document.getElementById("cd-mins");
        const elSecs = document.getElementById("cd-secs");
        if (elDays) elDays.innerText = pad2(cd.days);
        if (elHours) elHours.innerText = pad2(cd.hours);
        if (elMins) elMins.innerText = pad2(cd.minutes);
        if (elSecs) elSecs.innerText = pad2(cd.seconds);
      }
    }
  }, 1000);

  // --- INITIALIZE APPLICATION ---
  window.addEventListener("DOMContentLoaded", () => {
    loadLocalState();
    render();
    syncWithBackend();
  });

})();

