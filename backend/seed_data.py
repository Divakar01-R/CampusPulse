import sqlite3
import json
import uuid
from datetime import datetime, timedelta
from database import get_db_connection, init_db, hash_password

def seed_database():
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Clear existing data
    cursor.execute("DELETE FROM pinned_events")
    cursor.execute("DELETE FROM reminder_preferences")
    cursor.execute("DELETE FROM event_history")
    cursor.execute("DELETE FROM notifications")
    cursor.execute("DELETE FROM registrations")
    cursor.execute("DELETE FROM events")
    cursor.execute("DELETE FROM users")
    
    now = datetime.now()
    default_pass_hash = hash_password("password123")
    
    # 1. Users (Demo Student & Faculty)
    users = [
        (
            "student-001",
            "Alex Morgan",
            "alex.morgan@college.edu",
            default_pass_hash,
            "student",
            "2024CS1092",
            None,
            "Computer Science & Engineering",
            "3rd Year",
            None,
            "+1 (555) 234-5678",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            now.isoformat()
        ),
        (
            "student-002",
            "Divakar Sharma",
            "divakar@college.edu",
            default_pass_hash,
            "student",
            "2024IT2018",
            None,
            "Information Technology",
            "4th Year",
            None,
            "+1 (555) 345-6789",
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
            now.isoformat()
        ),
        (
            "faculty-001",
            "Prof. Sarah Jenkins",
            "sarah.jenkins@college.edu",
            default_pass_hash,
            "faculty",
            None,
            "FAC-CS-402",
            "Computer Science & Tech Council",
            None,
            "Associate Professor & Faculty Lead",
            "+1 (555) 876-5432",
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
            now.isoformat()
        ),
        (
            "faculty-002",
            "David Chen",
            "david.chen@college.edu",
            default_pass_hash,
            "faculty",
            None,
            "FAC-ROB-108",
            "Robotics & IoT Club",
            None,
            "Assistant Professor & Club Advisor",
            "+1 (555) 987-6543",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            now.isoformat()
        )
    ]
    cursor.executemany("""
    INSERT INTO users (
        id, name, email, password, role, student_reg_no, faculty_id,
        department, year_of_study, designation, phone, avatar, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, users)
    
    # Dates relative to current date
    d_tomorrow = (now + timedelta(days=1)).strftime("%Y-%m-%d")
    d_in_2_days = (now + timedelta(days=2)).strftime("%Y-%m-%d")
    d_in_4_days = (now + timedelta(days=4)).strftime("%Y-%m-%d")
    d_in_6_days = (now + timedelta(days=6)).strftime("%Y-%m-%d")
    d_in_10_days = (now + timedelta(days=10)).strftime("%Y-%m-%d")
    d_in_14_days = (now + timedelta(days=14)).strftime("%Y-%m-%d")
    d_in_18_days = (now + timedelta(days=18)).strftime("%Y-%m-%d")
    d_in_22_days = (now + timedelta(days=22)).strftime("%Y-%m-%d")
    d_past = (now - timedelta(days=5)).strftime("%Y-%m-%d")
    d_past2 = (now - timedelta(days=12)).strftime("%Y-%m-%d")

    # 2. Events (10+ realistic events)
    events = [
        (
            "ev-001",
            "CodeSprint 24H Hackathon",
            "The flagship annual collegiate hackathon bringing together 300+ developers, designers, and innovators to solve real-world problems in Web3, AI, and Sustainability. Mentors from top tech giants, cash pool of $5,000, and internship opportunities.",
            "Hackathon",
            d_tomorrow,
            "09:00 AM - 09:00 AM (Next Day)",
            "09:00 AM",
            "09:00 AM",
            "Innovation Hub - Main Arena",
            "Computer Science & Engineering",
            "faculty-001",
            "Prof. Sarah Jenkins (Tech Council)",
            12,
            120,
            108,
            "Upcoming",
            None,
            None,
            None,
            json.dumps(["Teams of 2 to 4 members", "Bring college ID card and laptop", "Original code only, GitHub repos timestamped", "Food and overnight snacks provided"]),
            "gradient-purple",
            1,
            (now + timedelta(hours=18)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "ev-002",
            "IoT with ESP32 Workshop",
            "Hands-on workshop exploring microcontroller programming, cloud sensor telemetry, and MQTT architecture using ESP32. Hardware kits provided for every participant.",
            "Workshop",
            d_in_2_days,
            "10:00 AM - 01:30 PM",
            "10:00 AM",
            "01:30 PM",
            "Electronics Block - Room 304 (Moved from Lab 2)",
            "Electronics & Communication",
            "faculty-002",
            "David Chen (Robotics Club)",
            0,
            60,
            60,
            "Venue Changed",
            d_in_2_days,
            "10:00 AM - 01:30 PM",
            "IoT Hardware Lab 2",
            json.dumps(["Individual participation", "Basic C/C++ knowledge recommended", "Laptops required with Arduino IDE installed"]),
            "gradient-indigo",
            1,
            (now + timedelta(days=1)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "ev-003",
            "UI/UX Design Showcase & Sprint",
            "A creative design sprint where students redesign campus utility apps. Industry judges from top product design firms will review portfolios and live mockups.",
            "Competition",
            d_in_4_days,
            "02:00 PM - 06:00 PM",
            "02:00 PM",
            "06:00 PM",
            "Design Studio - Block C",
            "Information Technology",
            "faculty-001",
            "Prof. Sarah Jenkins",
            34,
            80,
            46,
            "Registration Open",
            None,
            None,
            None,
            json.dumps(["Figma or Adobe XD familiarity required", "Design files must be submitted via Figma Community link", "Solo or duo entries welcome"]),
            "gradient-violet",
            0,
            (now + timedelta(days=3)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "ev-004",
            "AI and ML in Healthcare Seminar",
            "Distinguished keynote lecture by Dr. Aris Thorne on computer vision for oncology diagnostics and edge computing in wearable medical telemetry.",
            "Seminar",
            d_in_6_days,
            "11:00 AM - 01:00 PM",
            "11:00 AM",
            "01:00 PM",
            "Centenary Auditorium",
            "Biomedical & AI Engineering",
            "faculty-001",
            "Prof. Sarah Jenkins",
            150,
            250,
            100,
            "Upcoming",
            None,
            None,
            None,
            json.dumps(["Open to all departments and faculty", "Q&A session with the keynote speaker", "E-certificate of participation issued"]),
            "gradient-blue",
            0,
            (now + timedelta(days=5)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "ev-005",
            "Rhythm 2026 Cultural Fest: Battle of Bands",
            "The most anticipated musical showdown of the semester! 8 shortlisted college bands rock the open amphitheatre. Food trucks, light shows, and celebrity guest judge.",
            "Cultural",
            d_in_10_days,
            "05:30 PM - 10:00 PM",
            "05:30 PM",
            "10:00 PM",
            "Open Air Amphitheatre",
            "Cultural Activities Board",
            "faculty-001",
            "Cultural Society Lead",
            45,
            500,
            455,
            "Upcoming",
            None,
            None,
            None,
            json.dumps(["Passes required at the entry gate", "No outside bottles allowed", "College ID card mandatory"]),
            "gradient-pink",
            1,
            (now + timedelta(days=8)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "ev-006",
            "National Technical Symposium: InnovateX",
            "Paper presentations, circuit debugging, reverse engineering challenges, and technical quiz competitions spanning 6 engineering departments.",
            "Symposium",
            d_in_14_days,
            "09:00 AM - 05:00 PM",
            "09:00 AM",
            "05:00 PM",
            "Main Convention Centre",
            "Multi-Departmental Council",
            "faculty-001",
            "Prof. Sarah Jenkins",
            80,
            300,
            220,
            "Postponed",
            (now + timedelta(days=7)).strftime("%Y-%m-%d"),
            "09:00 AM - 05:00 PM",
            "Main Convention Centre",
            json.dumps(["Formal attire required for paper presentation", "IEEE formatting standards for manuscripts"]),
            "gradient-purple",
            0,
            (now + timedelta(days=12)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "ev-007",
            "Inter-College Speed Coding Duel",
            "Rapid 1v1 bracket-style competitive algorithmic coding. 15 minutes per round. Dynamic programming, graph theory, and edge-case mastery.",
            "Competition",
            d_in_18_days,
            "03:00 PM - 07:00 PM",
            "03:00 PM",
            "07:00 PM",
            "Computer Lab 5 & 6",
            "Computer Science",
            "faculty-002",
            "David Chen",
            0,
            64,
            64,
            "Fully Booked",
            None,
            None,
            None,
            json.dumps(["Languages permitted: C++, Java, Python3", "Automated test harness evaluation", "Leaderboard live streamed"]),
            "gradient-amber",
            0,
            (now + timedelta(days=15)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "ev-008",
            "Monochrome Campus Photography Contest",
            "Capture the architecture, student life, and shadows of our campus in high-contrast black & white photography. Exhibition of top 25 entries in Student Center.",
            "Competition",
            d_in_22_days,
            "10:00 AM - 04:00 PM",
            "10:00 AM",
            "04:00 PM",
            "Student Art Gallery",
            "Fine Arts & Media Club",
            "faculty-001",
            "Fine Arts Club",
            60,
            100,
            40,
            "Registration Open",
            None,
            None,
            None,
            json.dumps(["EXIF data must be preserved", "RAW or high-res JPEG upload required", "Minor contrast adjustment permitted"]),
            "gradient-cyan",
            0,
            (now + timedelta(days=20)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "ev-009",
            "Cloud DevOps & Kubernetes Masterclass",
            "Comprehensive review of CI/CD pipelines, container orchestration, and Helm charts for modern cloud applications.",
            "Technical",
            d_past,
            "02:00 PM - 05:00 PM",
            "02:00 PM",
            "05:00 PM",
            "Seminar Hall A",
            "Cloud Computing Lab",
            "faculty-002",
            "David Chen",
            0,
            120,
            120,
            "Completed",
            None,
            None,
            None,
            json.dumps(["Session completed", "Certificates and code repositories distributed via email"]),
            "gradient-gray",
            0,
            d_past2
        ),
        (
            "ev-010",
            "Autonomous Drone Racing Cup",
            "High-speed obstacle course navigation for autonomous micro-quadcopters. Postponed to next semester due to arena maintenance.",
            "Sports",
            d_past,
            "01:00 PM - 06:00 PM",
            "01:00 PM",
            "06:00 PM",
            "Sports Complex Stadium",
            "Robotics & Aerospace",
            "faculty-002",
            "David Chen",
            0,
            50,
            42,
            "Cancelled",
            None,
            None,
            None,
            json.dumps(["Safety goggles compulsory", "Registration refunds processed automatically"]),
            "gradient-red",
            0,
            d_past2
        )
    ]
    cursor.executemany("""
    INSERT INTO events (
        id, title, description, category, date, time, start_time, end_time, venue, department,
        organizer_id, organizer_name, available_seats, total_seats, registered_count, status,
        original_date, original_time, original_venue, rules, banner, is_featured, registration_deadline
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, events)
    
    # 3. Registrations for demo student (student-001)
    registrations = [
        (
            "reg-001",
            "student-001",
            "ev-001", # CodeSprint Hackathon
            (now - timedelta(days=3)).strftime("%Y-%m-%d %H:%M"),
            "CP-2026-HACK-8491",
            "CAMPUSPULSE:TICKET:CP-2026-HACK-8491:ev-001:student-001:Alex Morgan:CodeSprint 24H Hackathon",
            "Confirmed"
        ),
        (
            "reg-002",
            "student-001",
            "ev-002", # IoT Workshop
            (now - timedelta(days=2)).strftime("%Y-%m-%d %H:%M"),
            "CP-2026-IOT-3129",
            "CAMPUSPULSE:TICKET:CP-2026-IOT-3129:ev-002:student-001:Alex Morgan:IoT with ESP32 Workshop",
            "Confirmed"
        ),
        (
            "reg-003",
            "student-001",
            "ev-005", # Rhythm Cultural Fest
            (now - timedelta(days=1)).strftime("%Y-%m-%d %H:%M"),
            "CP-2026-CULT-9912",
            "CAMPUSPULSE:TICKET:CP-2026-CULT-9912:ev-005:student-001:Alex Morgan:Rhythm 2026 Cultural Fest",
            "Confirmed"
        ),
        (
            "reg-004",
            "student-001",
            "ev-006", # Symposium (Postponed)
            (now - timedelta(days=4)).strftime("%Y-%m-%d %H:%M"),
            "CP-2026-SYMP-5521",
            "CAMPUSPULSE:TICKET:CP-2026-SYMP-5521:ev-006:student-001:Alex Morgan:National Technical Symposium",
            "Confirmed"
        )
    ]
    cursor.executemany("""
    INSERT INTO registrations (id, student_id, event_id, registration_date, ticket_id, qr_code_data, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, registrations)
    
    # 4. Reminder Preferences
    reminders = [
        ("rem-001", "student-001", "ev-001", 1, 1, 1, 1, 1),
        ("rem-002", "student-001", "ev-002", 1, 1, 0, 1, 1),
        ("rem-003", "student-001", "ev-005", 1, 0, 0, 1, 1),
        ("rem-004", "student-001", "ev-006", 1, 1, 1, 1, 1),
    ]
    cursor.executemany("""
    INSERT INTO reminder_preferences (id, student_id, event_id, one_day, one_hour, ten_minute, email_digest, browser_enabled)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, reminders)
    
    # 5. Pinned Events
    pinned = [
        ("pin-001", "student-001", "ev-001", now.isoformat()),
        ("pin-002", "student-001", "ev-002", now.isoformat()),
    ]
    cursor.executemany("""
    INSERT INTO pinned_events (id, student_id, event_id, created_at)
    VALUES (?, ?, ?, ?)
    """, pinned)
    
    # 6. Notifications
    notifications = [
        (
            "notif-001",
            "student-001",
            "ev-002",
            "venue_change",
            "Venue Relocated: IoT Workshop",
            "Due to higher lab equipment requirements, the IoT with ESP32 Workshop has been moved from IoT Hardware Lab 2 to Electronics Block - Room 304.",
            "IoT Hardware Lab 2",
            "Electronics Block - Room 304",
            0,
            (now - timedelta(hours=2)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "notif-002",
            "student-001",
            "ev-006",
            "postponement",
            "Event Postponed: InnovateX Symposium",
            "National Technical Symposium has been rescheduled from next week to a revised date due to academic mid-term exams schedule.",
            (now + timedelta(days=7)).strftime("%Y-%m-%d"),
            d_in_14_days,
            0,
            (now - timedelta(hours=5)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "notif-003",
            "student-001",
            "ev-001",
            "registration_confirmed",
            "Ticket Confirmed: CodeSprint 24H Hackathon",
            "Your registration for CodeSprint 24H Hackathon is confirmed. Your digital ticket ID is CP-2026-HACK-8491.",
            None,
            "CP-2026-HACK-8491",
            0,
            (now - timedelta(hours=14)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "notif-004",
            "student-001",
            "ev-003",
            "new_event",
            "New Event Announced: UI/UX Design Showcase",
            "Department of Design has opened registrations for the Spring UI/UX Showcase sprint with cash prizes.",
            None,
            None,
            1,
            (now - timedelta(days=1)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "notif-005",
            "student-001",
            "ev-010",
            "cancellation",
            "Event Cancelled: Autonomous Drone Racing Cup",
            "We regret to inform you that the Drone Racing event has been cancelled for this semester.",
            "Scheduled for Sports Complex Stadium",
            "Cancelled",
            1,
            (now - timedelta(days=2)).strftime("%Y-%m-%d %H:%M")
        )
    ]
    cursor.executemany("""
    INSERT INTO notifications (id, user_id, event_id, type, title, message, old_value, new_value, read, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, notifications)
    
    # 7. Event History Records
    history = [
        (
            "hist-001",
            "ev-002",
            "venue_change",
            json.dumps({"venue": "IoT Hardware Lab 2"}),
            json.dumps({"venue": "Electronics Block - Room 304"}),
            "Relocated to accommodate 60 active microcontrollers and power outlets.",
            (now - timedelta(hours=2)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "hist-002",
            "ev-006",
            "postponement",
            json.dumps({"date": (now + timedelta(days=7)).strftime("%Y-%m-%d")}),
            json.dumps({"date": d_in_14_days}),
            "Rescheduled to avoid conflict with University Mid-Semester Examinations.",
            (now - timedelta(hours=5)).strftime("%Y-%m-%d %H:%M")
        ),
        (
            "hist-003",
            "ev-010",
            "cancellation",
            json.dumps({"status": "Upcoming"}),
            json.dumps({"status": "Cancelled"}),
            "Arena safety nets under mandatory maintenance.",
            (now - timedelta(days=2)).strftime("%Y-%m-%d %H:%M")
        )
    ]
    cursor.executemany("""
    INSERT INTO event_history (id, event_id, change_type, previous_values, updated_values, reason, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, history)
    
    conn.commit()
    conn.close()
    print("Database seeded with hashed passwords, users, events, and updates!")

if __name__ == "__main__":
    seed_database()
