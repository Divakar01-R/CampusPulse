import sqlite3
import json
import os
import hashlib
from pathlib import Path

DB_PATH = os.path.join(os.path.dirname(__file__), "campuspulse.db")

def hash_password(password: str) -> str:
    """Hash password using SHA-256 with project salt."""
    salt = "campuspulse_sec_salt_2026"
    return hashlib.sha256((salt + password).encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against stored hash."""
    return hash_password(plain_password) == hashed_password

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Users table (Students and Faculty)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL, /* 'student' or 'faculty' / 'organiser' */
        student_reg_no TEXT,
        faculty_id TEXT,
        department TEXT,
        year_of_study TEXT,
        designation TEXT,
        phone TEXT,
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # 2. Events table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        start_time TEXT,
        end_time TEXT,
        venue TEXT NOT NULL,
        department TEXT,
        organizer_id TEXT NOT NULL,
        organizer_name TEXT NOT NULL,
        available_seats INTEGER NOT NULL,
        total_seats INTEGER NOT NULL,
        registered_count INTEGER DEFAULT 0,
        status TEXT NOT NULL, /* 'Upcoming', 'Registration Open', 'Fully Booked', 'Postponed', 'Venue Changed', 'Completed', 'Cancelled' */
        original_date TEXT,
        original_time TEXT,
        original_venue TEXT,
        rules TEXT,
        banner TEXT,
        is_featured INTEGER DEFAULT 0,
        registration_deadline TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # 3. Registrations table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS registrations (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        event_id TEXT NOT NULL,
        registration_date TEXT NOT NULL,
        ticket_id TEXT UNIQUE NOT NULL,
        qr_code_data TEXT NOT NULL,
        status TEXT DEFAULT 'Confirmed',
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (event_id) REFERENCES events(id)
    )
    """)
    
    # 4. Notifications table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        event_id TEXT NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        old_value TEXT,
        new_value TEXT,
        read INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id)
    )
    """)
    
    # 5. Event History table (Audit log of changes)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS event_history (
        id TEXT PRIMARY KEY,
        event_id TEXT NOT NULL,
        change_type TEXT NOT NULL,
        previous_values TEXT,
        updated_values TEXT,
        reason TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id)
    )
    """)
    
    # 6. Reminder Preferences table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS reminder_preferences (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        event_id TEXT NOT NULL,
        one_day INTEGER DEFAULT 1,
        one_hour INTEGER DEFAULT 1,
        ten_minute INTEGER DEFAULT 1,
        email_digest INTEGER DEFAULT 1,
        browser_enabled INTEGER DEFAULT 1,
        UNIQUE(student_id, event_id),
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (event_id) REFERENCES events(id)
    )
    """)
    
    # 7. Pinned Events table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS pinned_events (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL,
        event_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, event_id),
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (event_id) REFERENCES events(id)
    )
    """)
    
    # Auto-migrate any missing columns if table already existed
    cursor.execute("PRAGMA table_info(users)")
    user_cols = [c["name"] for c in cursor.fetchall()]
    if "student_reg_no" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN student_reg_no TEXT")
    if "faculty_id" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN faculty_id TEXT")
    if "designation" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN designation TEXT")
    if "year_of_study" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN year_of_study TEXT")
    if "phone" not in user_cols:
        cursor.execute("ALTER TABLE users ADD COLUMN phone TEXT")

    cursor.execute("PRAGMA table_info(events)")
    event_cols = [c["name"] for c in cursor.fetchall()]
    if "start_time" not in event_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN start_time TEXT")
    if "end_time" not in event_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN end_time TEXT")
    if "department" not in event_cols:
        cursor.execute("ALTER TABLE events ADD COLUMN department TEXT")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at", DB_PATH)
