import json
import uuid
import os
import sqlite3
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Query, Depends, Body, status, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel

from database import get_db_connection, init_db, hash_password, verify_password

app = FastAPI(title="CampusPulse Official API", version="2.5.0")

# Proper CORS configuration for Vite dev server & production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# --- Pydantic Data Models ---
class UnifiedRegisterRequest(BaseModel):
    role: str # 'student' or 'faculty'
    name: str
    email: str
    password: str
    confirm_password: Optional[str] = None
    phone: Optional[str] = ""
    department: Optional[str] = ""
    # Student specific
    student_reg_no: Optional[str] = None
    year_of_study: Optional[str] = None
    # Faculty specific
    faculty_id: Optional[str] = None
    designation: Optional[str] = None

class StudentRegisterRequest(BaseModel):
    name: str
    email: str
    student_reg_no: str
    password: str
    confirm_password: str
    department: str
    year_of_study: str
    phone: str

class FacultyRegisterRequest(BaseModel):
    name: str
    email: str
    faculty_id: str
    password: str
    confirm_password: str
    department: str
    designation: str
    phone: str

class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[str] = None

class ProfileUpdateRequest(BaseModel):
    user_id: str
    name: str
    phone: Optional[str] = None
    department: Optional[str] = None
    year_of_study: Optional[str] = None
    designation: Optional[str] = None

class EventCreateRequest(BaseModel):
    title: str
    description: str
    category: str
    banner: Optional[str] = "gradient-purple"
    date: str
    start_time: str
    end_time: str
    time: Optional[str] = None
    venue: str
    department: str
    registration_deadline: Optional[str] = None
    total_seats: int
    rules: Optional[List[str]] = []
    organizer_id: str
    organizer_name: str

class EventUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    banner: Optional[str] = None
    date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    time: Optional[str] = None
    venue: Optional[str] = None
    department: Optional[str] = None
    total_seats: Optional[int] = None
    registration_deadline: Optional[str] = None
    rules: Optional[List[str]] = None
    status: Optional[str] = None
    change_type: Optional[str] = None
    reason: Optional[str] = None

class EventPostponeRequest(BaseModel):
    faculty_id: str
    new_date: str
    new_time: Optional[str] = None
    reason: str

class EventVenueChangeRequest(BaseModel):
    faculty_id: str
    new_venue: str
    reason: str

class EventCancelRequest(BaseModel):
    faculty_id: str
    reason: str

class RegistrationRequest(BaseModel):
    student_id: str
    event_id: str

class ReminderUpdateRequest(BaseModel):
    student_id: str
    event_id: str
    one_day: Optional[int] = 1
    one_hour: Optional[int] = 1
    ten_minute: Optional[int] = 1
    email_digest: Optional[int] = 1
    browser_enabled: Optional[int] = 1

# --- Helper Functions ---
def dict_from_row(row):
    if not row:
        return None
    d = dict(row)
    if "password" in d:
        del d["password"]
    if "rules" in d and d["rules"]:
        try:
            d["rules"] = json.loads(d["rules"])
        except:
            d["rules"] = [d["rules"]]
    if "previous_values" in d and d["previous_values"]:
        try:
            d["previous_values"] = json.loads(d["previous_values"])
        except:
            pass
    if "updated_values" in d and d["updated_values"]:
        try:
            d["updated_values"] = json.loads(d["updated_values"])
        except:
            pass
    return d

def verify_faculty_permission(cursor, user_id: str):
    cursor.execute("SELECT role FROM users WHERE id = ?", (user_id,))
    u = cursor.fetchone()
    if not u or u["role"] not in ["faculty", "organiser"]:
        raise HTTPException(status_code=403, detail="Forbidden: Faculty permissions required for this action.")

# --- HEALTH ENDPOINT ---
@app.get("/api/health")
def api_health():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as count FROM events")
    ev_count = cursor.fetchone()["count"]
    cursor.execute("SELECT COUNT(*) as count FROM users")
    us_count = cursor.fetchone()["count"]
    conn.close()
    return {
        "status": "ok",
        "service": "CampusPulse API",
        "database": "connected",
        "events_count": ev_count,
        "users_count": us_count,
        "timestamp": datetime.now().isoformat()
    }

# --- AUTHENTICATION ENDPOINTS ---

@app.post("/api/auth/register")
def register_unified(req: UnifiedRegisterRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    email = req.email.strip().lower()
    cursor.execute("SELECT id FROM users WHERE LOWER(email) = ?", (email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="An account with this email already exists.")
        
    if req.confirm_password and req.password != req.confirm_password:
        conn.close()
        raise HTTPException(status_code=400, detail="Passwords do not match.")
        
    if len(req.password) < 6:
        conn.close()
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")
        
    role = req.role.strip().lower()
    if role not in ["student", "faculty", "organiser"]:
        role = "student"
        
    user_id = f"{role}-{uuid.uuid4().hex[:6]}"
    hashed_pwd = hash_password(req.password)
    avatar = f"https://api.dicebear.com/7.x/initials/svg?seed={req.name}"
    
    if role == "student":
        reg_no = req.student_reg_no or f"REG-{uuid.uuid4().hex[:4].upper()}"
        cursor.execute("""
        INSERT INTO users (
            id, name, email, password, role, student_reg_no, department, year_of_study, phone, avatar
        ) VALUES (?, ?, ?, ?, 'student', ?, ?, ?, ?, ?)
        """, (user_id, req.name.strip(), email, hashed_pwd, reg_no, req.department, req.year_of_study or "1st Year", req.phone, avatar))
    else:
        fac_id = req.faculty_id or f"FAC-{uuid.uuid4().hex[:4].upper()}"
        cursor.execute("""
        INSERT INTO users (
            id, name, email, password, role, faculty_id, department, designation, phone, avatar
        ) VALUES (?, ?, ?, ?, 'faculty', ?, ?, ?, ?, ?)
        """, (user_id, req.name.strip(), email, hashed_pwd, fac_id, req.department, req.designation or "Faculty Member", req.phone, avatar))
        
    conn.commit()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    new_user = dict_from_row(cursor.fetchone())
    conn.close()
    
    return {
        "status": "success",
        "message": f"{role.capitalize()} account created successfully.",
        "user": new_user
    }

@app.post("/api/auth/register/student")
def register_student(req: StudentRegisterRequest):
    return register_unified(UnifiedRegisterRequest(
        role="student",
        name=req.name,
        email=req.email,
        password=req.password,
        confirm_password=req.confirm_password,
        phone=req.phone,
        department=req.department,
        student_reg_no=req.student_reg_no,
        year_of_study=req.year_of_study
    ))

@app.post("/api/auth/register/faculty")
def register_faculty(req: FacultyRegisterRequest):
    return register_unified(UnifiedRegisterRequest(
        role="faculty",
        name=req.name,
        email=req.email,
        password=req.password,
        confirm_password=req.confirm_password,
        phone=req.phone,
        department=req.department,
        faculty_id=req.faculty_id,
        designation=req.designation
    ))

@app.post("/api/auth/login")
def login(req: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    email = req.email.strip().lower()
    cursor.execute("SELECT * FROM users WHERE LOWER(email) = ?", (email,))
    user_row = cursor.fetchone()
    
    if not user_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Unknown account. No user found with this email.")
        
    stored_hash = user_row["password"]
    if not verify_password(req.password, stored_hash):
        conn.close()
        raise HTTPException(status_code=401, detail="Incorrect password. Please verify your credentials.")
        
    user = dict_from_row(user_row)
    
    # Check role alignment if requested
    if req.role:
        req_norm = "faculty" if req.role in ["faculty", "organiser"] else "student"
        user_norm = "faculty" if user["role"] in ["faculty", "organiser"] else "student"
        if req_norm != user_norm:
            conn.close()
            raise HTTPException(
                status_code=403,
                detail=f"This account is registered as a {user['role'].capitalize()}. Please switch to the {user['role'].capitalize()} tab to sign in."
            )
            
    conn.close()
    return {
        "status": "success",
        "message": f"Welcome back, {user['name']}!",
        "user": user,
        "token": f"cp-token-{user['id']}"
    }

@app.get("/api/auth/me")
def get_current_user(user_id: Optional[str] = None, authorization: Optional[str] = Header(None)):
    uid = user_id
    if not uid and authorization:
        # Extract from Bearer token
        token = authorization.replace("Bearer ", "").strip()
        if token.startswith("cp-token-"):
            uid = token.replace("cp-token-", "")
            
    if not uid:
        uid = "student-001" # Default demo user
        
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (uid,))
    user_row = cursor.fetchone()
    conn.close()
    if not user_row:
        raise HTTPException(status_code=404, detail="User session not found")
    return dict_from_row(user_row)

@app.get("/api/users/profile/{user_id}")
def get_profile(user_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user_row = cursor.fetchone()
    conn.close()
    if not user_row:
        raise HTTPException(status_code=404, detail="User not found")
    return dict_from_row(user_row)

@app.put("/api/users/profile")
def update_profile(req: ProfileUpdateRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (req.user_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
        
    cursor.execute("""
    UPDATE users SET
        name = ?, phone = ?, department = ?, year_of_study = ?, designation = ?
    WHERE id = ?
    """, (req.name, req.phone, req.department, req.year_of_study, req.designation, req.user_id))
    
    conn.commit()
    cursor.execute("SELECT * FROM users WHERE id = ?", (req.user_id,))
    updated = dict_from_row(cursor.fetchone())
    conn.close()
    return {"status": "success", "user": updated}

# --- EVENTS CRUD ENDPOINTS ---

@app.get("/api/events")
def get_events(
    search: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    status_filter: Optional[str] = None,
    department: Optional[str] = None
):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM events WHERE 1=1"
    params = []
    
    # Category filter
    if category and category.lower() != "all":
        query += " AND LOWER(category) = LOWER(?)"
        params.append(category.strip())
        
    # Status filter
    st = status or status_filter
    if st and st.lower() != "all":
        query += " AND LOWER(status) = LOWER(?)"
        params.append(st.strip())
        
    # Department filter
    if department and department.lower() != "all":
        query += " AND LOWER(department) = LOWER(?)"
        params.append(department.strip())
        
    # Case-insensitive partial search across all fields
    if search:
        s = search.strip().lower()
        if s:
            query += """ AND (
                LOWER(title) LIKE ? OR
                LOWER(description) LIKE ? OR
                LOWER(category) LIKE ? OR
                LOWER(department) LIKE ? OR
                LOWER(organizer_name) LIKE ? OR
                LOWER(venue) LIKE ?
            )"""
            wild = f"%{s}%"
            params.extend([wild, wild, wild, wild, wild, wild])
            
    query += " ORDER BY date ASC"
    cursor.execute(query, params)
    events = [dict_from_row(row) for row in cursor.fetchall()]
    conn.close()
    return events

@app.get("/api/events/{event_id}")
def get_event(event_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Event not found")
    return dict_from_row(row)

@app.post("/api/events")
def create_event(req: EventCreateRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    verify_faculty_permission(cursor, req.organizer_id)
    
    event_id = f"ev-{uuid.uuid4().hex[:6]}"
    rules_json = json.dumps(req.rules if req.rules else ["College photo ID mandatory"])
    time_str = req.time or f"{req.start_time} - {req.end_time}"
    available_seats = req.total_seats
    
    cursor.execute("""
    INSERT INTO events (
        id, title, description, category, date, time, start_time, end_time,
        venue, department, organizer_id, organizer_name, available_seats, total_seats,
        registered_count, status, rules, banner, is_featured, registration_deadline
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'Upcoming', ?, ?, 0, ?)
    """, (
        event_id, req.title, req.description, req.category, req.date, time_str,
        req.start_time, req.end_time, req.venue, req.department, req.organizer_id,
        req.organizer_name, available_seats, req.total_seats, rules_json,
        req.banner, req.registration_deadline
    ))
    
    # Broadcast notification
    cursor.execute("""
    INSERT INTO notifications (id, user_id, event_id, type, title, message, new_value, read)
    VALUES (?, 'all', ?, 'new_event', ?, ?, ?, 0)
    """, (
        f"notif-{uuid.uuid4().hex[:6]}", event_id,
        f"New Event Announced: {req.title}",
        f"{req.organizer_name} announced '{req.title}' scheduled for {req.date} at {req.venue}.",
        req.date
    ))
    
    # History record
    cursor.execute("""
    INSERT INTO event_history (id, event_id, change_type, previous_values, updated_values, reason)
    VALUES (?, ?, 'created', '{}', ?, 'Initial event publication')
    """, (
        f"hist-{uuid.uuid4().hex[:6]}", event_id,
        json.dumps({"title": req.title, "date": req.date, "venue": req.venue, "seats": req.total_seats})
    ))
    
    conn.commit()
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    new_event = dict_from_row(cursor.fetchone())
    conn.close()
    return new_event

@app.put("/api/events/{event_id}")
def update_event(event_id: str, req: EventUpdateRequest, organizer_id: Optional[str] = Query(None)):
    conn = get_db_connection()
    cursor = conn.cursor()
    if organizer_id:
        verify_faculty_permission(cursor, organizer_id)
        
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    existing = cursor.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Event not found")
        
    old_data = dict_from_row(existing)
    
    new_title = req.title if req.title is not None else old_data["title"]
    new_desc = req.description if req.description is not None else old_data["description"]
    new_cat = req.category if req.category is not None else old_data["category"]
    new_date = req.date if req.date is not None else old_data["date"]
    new_venue = req.venue if req.venue is not None else old_data["venue"]
    new_dept = req.department if req.department is not None else old_data.get("department", "")
    new_deadline = req.registration_deadline if req.registration_deadline is not None else old_data.get("registration_deadline", "")
    new_total_seats = req.total_seats if req.total_seats is not None else old_data["total_seats"]
    new_status = req.status if req.status is not None else old_data["status"]
    
    new_time = old_data["time"]
    if req.start_time and req.end_time:
        new_time = f"{req.start_time} - {req.end_time}"
    elif req.time:
        new_time = req.time
        
    # Check for Postponement
    if req.date and req.date != old_data["date"]:
        new_status = "Postponed"
        cursor.execute("""
        INSERT INTO notifications (id, user_id, event_id, type, title, message, old_value, new_value, read)
        VALUES (?, 'all', ?, 'postponement', ?, ?, ?, ?, 0)
        """, (
            f"notif-{uuid.uuid4().hex[:6]}", event_id,
            f"Event Postponed: {new_title}",
            f"{new_title} has been rescheduled to {req.date}. Reason: {req.reason or 'Schedule revision'}",
            old_data["date"], req.date
        ))
        cursor.execute("""
        INSERT INTO event_history (id, event_id, change_type, previous_values, updated_values, reason)
        VALUES (?, ?, 'postponement', ?, ?, ?)
        """, (
            f"hist-{uuid.uuid4().hex[:6]}", event_id,
            json.dumps({"date": old_data["date"]}),
            json.dumps({"date": req.date}),
            req.reason or "Postponed by organizer"
        ))
        
    # Check for Venue Change
    if req.venue and req.venue != old_data["venue"]:
        new_status = "Venue Changed"
        cursor.execute("""
        INSERT INTO notifications (id, user_id, event_id, type, title, message, old_value, new_value, read)
        VALUES (?, 'all', ?, 'venue_change', ?, ?, ?, ?, 0)
        """, (
            f"notif-{uuid.uuid4().hex[:6]}", event_id,
            f"Venue Relocated: {new_title}",
            f"{new_title} venue relocated to '{req.venue}'. Reason: {req.reason or 'Room upgrade'}",
            old_data["venue"], req.venue
        ))
        cursor.execute("""
        INSERT INTO event_history (id, event_id, change_type, previous_values, updated_values, reason)
        VALUES (?, ?, 'venue_change', ?, ?, ?)
        """, (
            f"hist-{uuid.uuid4().hex[:6]}", event_id,
            json.dumps({"venue": old_data["venue"]}),
            json.dumps({"venue": req.venue}),
            req.reason or "Relocated by organizer"
        ))
        
    available_seats = max(0, new_total_seats - old_data["registered_count"])
    rules_json = json.dumps(req.rules) if req.rules is not None else json.dumps(old_data.get("rules", []))
    
    cursor.execute("""
    UPDATE events SET
        title = ?, description = ?, category = ?, date = ?, time = ?,
        venue = ?, department = ?, total_seats = ?, available_seats = ?,
        status = ?, registration_deadline = ?, rules = ?
    WHERE id = ?
    """, (
        new_title, new_desc, new_cat, new_date, new_time,
        new_venue, new_dept, new_total_seats, available_seats,
        new_status, new_deadline, rules_json, event_id
    ))
    
    conn.commit()
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    updated = dict_from_row(cursor.fetchone())
    conn.close()
    return updated

@app.post("/api/events/{event_id}/postpone")
def postpone_event(event_id: str, req: EventPostponeRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    verify_faculty_permission(cursor, req.faculty_id)
    
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Event not found")
        
    old_data = dict_from_row(row)
    old_date = old_data["date"]
    old_time = old_data["time"]
    new_time = req.new_time if req.new_time else old_time
    
    cursor.execute("""
    UPDATE events SET
        date = ?, time = ?, status = 'Postponed'
    WHERE id = ?
    """, (req.new_date, new_time, event_id))
    
    # Broadcast notification to all users / registered students
    notif_id = f"notif-{uuid.uuid4().hex[:6]}"
    cursor.execute("""
    INSERT INTO notifications (id, user_id, event_id, type, title, message, old_value, new_value, read)
    VALUES (?, 'all', ?, 'postponement', ?, ?, ?, ?, 0)
    """, (
        notif_id, event_id,
        f"Event Postponed: {old_data['title']}",
        f"'{old_data['title']}' has been rescheduled from {old_date} to {req.new_date}. Reason: {req.reason}",
        f"{old_date} ({old_time})",
        f"{req.new_date} ({new_time})"
    ))
    
    # Record in history
    cursor.execute("""
    INSERT INTO event_history (id, event_id, change_type, previous_values, updated_values, reason)
    VALUES (?, ?, 'postponement', ?, ?, ?)
    """, (
        f"hist-{uuid.uuid4().hex[:6]}", event_id,
        json.dumps({"date": old_date, "time": old_time}),
        json.dumps({"date": req.new_date, "time": new_time}),
        req.reason
    ))
    
    conn.commit()
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    updated = dict_from_row(cursor.fetchone())
    conn.close()
    return {"status": "success", "event": updated, "message": "Event postponed and attendees notified."}

@app.post("/api/events/{event_id}/change-venue")
def change_event_venue(event_id: str, req: EventVenueChangeRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    verify_faculty_permission(cursor, req.faculty_id)
    
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Event not found")
        
    old_data = dict_from_row(row)
    old_venue = old_data["venue"]
    
    cursor.execute("""
    UPDATE events SET
        venue = ?, status = 'Venue Changed'
    WHERE id = ?
    """, (req.new_venue, event_id))
    
    # Broadcast notification
    notif_id = f"notif-{uuid.uuid4().hex[:6]}"
    cursor.execute("""
    INSERT INTO notifications (id, user_id, event_id, type, title, message, old_value, new_value, read)
    VALUES (?, 'all', ?, 'venue_change', ?, ?, ?, ?, 0)
    """, (
        notif_id, event_id,
        f"Venue Changed: {old_data['title']}",
        f"'{old_data['title']}' venue relocated from {old_venue} to {req.new_venue}. Reason: {req.reason}",
        old_venue,
        req.new_venue
    ))
    
    # Record in history
    cursor.execute("""
    INSERT INTO event_history (id, event_id, change_type, previous_values, updated_values, reason)
    VALUES (?, ?, 'venue_change', ?, ?, ?)
    """, (
        f"hist-{uuid.uuid4().hex[:6]}", event_id,
        json.dumps({"venue": old_venue}),
        json.dumps({"venue": req.new_venue}),
        req.reason
    ))
    
    conn.commit()
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    updated = dict_from_row(cursor.fetchone())
    conn.close()
    return {"status": "success", "event": updated, "message": "Venue updated and attendees notified."}

@app.post("/api/events/{event_id}/cancel")
def cancel_event(event_id: str, req: EventCancelRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    verify_faculty_permission(cursor, req.faculty_id)
    
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Event not found")
        
    old_data = dict_from_row(row)
    
    cursor.execute("""
    UPDATE events SET status = 'Cancelled' WHERE id = ?
    """, (event_id,))
    
    # Mark registrations as cancelled
    cursor.execute("""
    UPDATE registrations SET status = 'Cancelled' WHERE event_id = ?
    """, (event_id,))
    
    # Broadcast cancellation notification
    notif_id = f"notif-{uuid.uuid4().hex[:6]}"
    cursor.execute("""
    INSERT INTO notifications (id, user_id, event_id, type, title, message, old_value, new_value, read)
    VALUES (?, 'all', ?, 'cancellation', ?, ?, ?, 'Cancelled', 0)
    """, (
        notif_id, event_id,
        f"Event Cancelled: {old_data['title']}",
        f"'{old_data['title']}' scheduled on {old_data['date']} has been cancelled. Reason: {req.reason}",
        "Active"
    ))
    
    # Record in history
    cursor.execute("""
    INSERT INTO event_history (id, event_id, change_type, previous_values, updated_values, reason)
    VALUES (?, ?, 'cancellation', ?, ?, ?)
    """, (
        f"hist-{uuid.uuid4().hex[:6]}", event_id,
        json.dumps({"status": old_data["status"]}),
        json.dumps({"status": "Cancelled"}),
        req.reason
    ))
    
    conn.commit()
    cursor.execute("SELECT * FROM events WHERE id = ?", (event_id,))
    updated = dict_from_row(cursor.fetchone())
    conn.close()
    return {"status": "success", "event": updated, "message": "Event has been cancelled and attendees notified."}

@app.delete("/api/events/{event_id}")
def delete_event(event_id: str, faculty_id: Optional[str] = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    if faculty_id:
        verify_faculty_permission(cursor, faculty_id)
        
    cursor.execute("DELETE FROM pinned_events WHERE event_id = ?", (event_id,))
    cursor.execute("DELETE FROM reminder_preferences WHERE event_id = ?", (event_id,))
    cursor.execute("DELETE FROM notifications WHERE event_id = ?", (event_id,))
    cursor.execute("DELETE FROM event_history WHERE event_id = ?", (event_id,))
    cursor.execute("DELETE FROM registrations WHERE event_id = ?", (event_id,))
    cursor.execute("DELETE FROM events WHERE id = ?", (event_id,))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Event {event_id} deleted successfully."}

@app.get("/api/events/{event_id}/registrations")
def get_event_registrations_roster(event_id: str, faculty_id: Optional[str] = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    if faculty_id:
        verify_faculty_permission(cursor, faculty_id)
        
    cursor.execute("""
    SELECT r.id as registration_id, r.ticket_id, r.registration_date, r.status,
           u.id as student_id, u.name as student_name, u.email as student_email,
           u.student_reg_no, u.department, u.year_of_study, u.phone
    FROM registrations r
    JOIN users u ON r.student_id = u.id
    WHERE r.event_id = ?
    ORDER BY r.registration_date DESC
    """, (event_id,))
    roster = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return roster

# --- REGISTRATION ENDPOINTS ---

@app.get("/api/registrations/my")
@app.get("/api/registrations")
def get_my_registrations(student_id: Optional[str] = None, user_id: Optional[str] = None):
    sid = student_id or user_id
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if sid:
        cursor.execute("""
        SELECT r.*, e.title as event_title, e.category, e.date as event_date, e.time as event_time,
               e.venue, e.status as event_status, e.original_date, e.original_time, e.original_venue,
               e.organizer_name, u.name as student_name, u.email as student_email, u.department
        FROM registrations r
        JOIN events e ON r.event_id = e.id
        JOIN users u ON r.student_id = u.id
        WHERE r.student_id = ?
        ORDER BY e.date ASC
        """, (sid,))
    else:
        cursor.execute("""
        SELECT r.*, e.title as event_title, e.category, e.date as event_date, e.time as event_time,
               e.venue, e.status as event_status, u.name as student_name, u.email as student_email
        FROM registrations r
        JOIN events e ON r.event_id = e.id
        JOIN users u ON r.student_id = u.id
        ORDER BY r.registration_date DESC
        """)
        
    regs = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return regs

@app.post("/api/registrations")
def register_for_event(req: RegistrationRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Prevent duplicate registration
    cursor.execute(
        "SELECT id, ticket_id FROM registrations WHERE student_id = ? AND event_id = ? AND status = 'Confirmed'",
        (req.student_id, req.event_id)
    )
    existing_reg = cursor.fetchone()
    if existing_reg:
        conn.close()
        raise HTTPException(
            status_code=400,
            detail=f"You are already registered for this event! Your ticket ID is {existing_reg['ticket_id']}."
        )
        
    # 2. Check event status and seats
    cursor.execute("SELECT * FROM events WHERE id = ?", (req.event_id,))
    event_row = cursor.fetchone()
    if not event_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Event not found")
        
    event = dict_from_row(event_row)
    if event["status"] in ["Cancelled", "Completed"]:
        conn.close()
        raise HTTPException(status_code=400, detail=f"Cannot register for an event that is {event['status']}.")
        
    if event["available_seats"] <= 0:
        conn.close()
        raise HTTPException(status_code=400, detail="This event is fully booked! No seats remain.")
        
    # Check registration deadline if set
    if event.get("registration_deadline"):
        try:
            deadline_dt = datetime.strptime(event["registration_deadline"], "%Y-%m-%d %H:%M")
            if datetime.now() > deadline_dt:
                conn.close()
                raise HTTPException(status_code=400, detail="Registration for this event has closed.")
        except:
            pass

    # 3. Create Ticket and Registration
    reg_id = f"reg-{uuid.uuid4().hex[:6]}"
    cat_prefix = event["category"][:4].upper()
    random_num = uuid.uuid4().hex[:4].upper()
    ticket_id = f"CP-2026-{cat_prefix}-{random_num}"
    
    cursor.execute("SELECT name, email, department, student_reg_no FROM users WHERE id = ?", (req.student_id,))
    student = cursor.fetchone()
    student_name = student["name"] if student else "Student"
    
    qr_data = f"CAMPUSPULSE:TICKET:{ticket_id}:{event['id']}:{req.student_id}:{student_name}:{event['title']}"
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    cursor.execute("""
    INSERT INTO registrations (id, student_id, event_id, registration_date, ticket_id, qr_code_data, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Confirmed')
    """, (reg_id, req.student_id, req.event_id, now_str, ticket_id, qr_data))
    
    # 4. Reduce available seats in database
    new_registered = event["registered_count"] + 1
    new_available = max(0, event["total_seats"] - new_registered)
    new_status = "Fully Booked" if new_available == 0 else event["status"]
    
    cursor.execute("""
    UPDATE events SET registered_count = ?, available_seats = ?, status = ? WHERE id = ?
    """, (new_registered, new_available, new_status, req.event_id))
    
    # 5. Create default reminder preferences
    cursor.execute("""
    INSERT OR REPLACE INTO reminder_preferences (id, student_id, event_id, one_day, one_hour, ten_minute, email_digest, browser_enabled)
    VALUES (?, ?, ?, 1, 1, 1, 1, 1)
    """, (f"rem-{uuid.uuid4().hex[:6]}", req.student_id, req.event_id))
    
    # 6. Create confirmation notification
    cursor.execute("""
    INSERT INTO notifications (id, user_id, event_id, type, title, message, new_value, read)
    VALUES (?, ?, ?, 'registration_confirmed', ?, ?, ?, 0)
    """, (
        f"notif-{uuid.uuid4().hex[:6]}", req.student_id, req.event_id,
        f"Ticket Confirmed: {event['title']}",
        f"Your registration is confirmed. Admission Pass: {ticket_id}. Venue: {event['venue']}",
        ticket_id
    ))
    
    conn.commit()
    conn.close()
    
    return {
        "status": "success",
        "registration_id": reg_id,
        "ticket_id": ticket_id,
        "qr_code_data": qr_data,
        "event_title": event["title"],
        "student_name": student_name,
        "event_date": event["date"],
        "event_time": event["time"],
        "venue": event["venue"]
    }

@app.delete("/api/registrations/{registration_id}")
def cancel_registration(registration_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM registrations WHERE id = ?", (registration_id,))
    reg = cursor.fetchone()
    if not reg:
        conn.close()
        raise HTTPException(status_code=404, detail="Registration not found")
        
    event_id = reg["event_id"]
    cursor.execute("DELETE FROM registrations WHERE id = ?", (registration_id,))
    cursor.execute("DELETE FROM reminder_preferences WHERE student_id = ? AND event_id = ?", (reg["student_id"], event_id))
    
    # Restore seat count in database
    cursor.execute("SELECT total_seats, registered_count, status FROM events WHERE id = ?", (event_id,))
    ev = cursor.fetchone()
    if ev:
        new_reg_count = max(0, ev["registered_count"] - 1)
        new_avail = ev["total_seats"] - new_reg_count
        new_status = "Upcoming" if ev["status"] == "Fully Booked" else ev["status"]
        cursor.execute("UPDATE events SET registered_count = ?, available_seats = ?, status = ? WHERE id = ?",
                       (new_reg_count, new_avail, new_status, event_id))
                       
    conn.commit()
    conn.close()
    return {"status": "success", "message": "Registration cancelled successfully. Seat restored."}

# --- NOTIFICATIONS ENDPOINTS ---

@app.get("/api/notifications")
def get_notifications(user_id: Optional[str] = None, filter_type: Optional[str] = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = """
    SELECT n.*, e.title as event_title, e.date as event_date, e.venue as event_venue
    FROM notifications n
    LEFT JOIN events e ON n.event_id = e.id
    WHERE 1=1
    """
    params = []
    
    if user_id:
        query += " AND (n.user_id = ? OR n.user_id = 'all')"
        params.append(user_id)
        
    if filter_type and filter_type.lower() != "all":
        if filter_type in ["venue_change", "time_change", "postponement", "new_event", "cancellation"]:
            query += " AND n.type = ?"
            params.append(filter_type)
        elif filter_type == "registered_only" and user_id:
            query += " AND n.event_id IN (SELECT event_id FROM registrations WHERE student_id = ?)"
            params.append(user_id)
            
    query += " ORDER BY n.created_at DESC"
    cursor.execute(query, params)
    notifs = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return notifs

@app.put("/api/notifications/read-all")
@app.patch("/api/notifications/read-all")
def mark_all_notifications_read(request: Request, user_id: Optional[str] = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    uid = user_id
    if uid:
        cursor.execute("UPDATE notifications SET read = 1 WHERE user_id = ? OR user_id = 'all'", (uid,))
    else:
        cursor.execute("UPDATE notifications SET read = 1")
    conn.commit()
    conn.close()
    return {"status": "success", "message": "All notifications marked as read."}

@app.put("/api/notifications/{notification_id}/read")
@app.patch("/api/notifications/{notification_id}/read")
def mark_notification_read(notification_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE notifications SET read = 1 WHERE id = ?", (notification_id,))
    conn.commit()
    conn.close()
    return {"status": "success", "message": "Notification marked as read."}

# --- EVENT HISTORY ---
@app.get("/api/history")
def get_history(event_id: Optional[str] = Query(None)):
    conn = get_db_connection()
    cursor = conn.cursor()
    if event_id:
        cursor.execute("""
        SELECT h.*, e.title as event_title
        FROM event_history h
        JOIN events e ON h.event_id = e.id
        WHERE h.event_id = ?
        ORDER BY h.updated_at DESC
        """, (event_id,))
    else:
        cursor.execute("""
        SELECT h.*, e.title as event_title
        FROM event_history h
        JOIN events e ON h.event_id = e.id
        ORDER BY h.updated_at DESC
        """)
    history = [dict_from_row(row) for row in cursor.fetchall()]
    conn.close()
    return history

# --- REMINDER PREFERENCES ---
@app.get("/api/reminders/{student_id}")
def get_reminders(student_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT rp.*, e.title as event_title, e.date as event_date, e.time as event_time, e.venue, e.status as event_status
    FROM reminder_preferences rp
    JOIN events e ON rp.event_id = e.id
    WHERE rp.student_id = ?
    ORDER BY e.date ASC
    """, (student_id,))
    reminders = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return reminders

@app.put("/api/reminders")
def update_reminder(req: ReminderUpdateRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO reminder_preferences (id, student_id, event_id, one_day, one_hour, ten_minute, email_digest, browser_enabled)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(student_id, event_id) DO UPDATE SET
        one_day = excluded.one_day,
        one_hour = excluded.one_hour,
        ten_minute = excluded.ten_minute,
        email_digest = excluded.email_digest,
        browser_enabled = excluded.browser_enabled
    """, (
        f"rem-{uuid.uuid4().hex[:6]}", req.student_id, req.event_id,
        req.one_day, req.one_hour, req.ten_minute, req.email_digest, req.browser_enabled
    ))
    conn.commit()
    conn.close()
    return {"status": "success", "message": "Reminder preferences updated"}

# --- PINNED EVENTS ---
@app.get("/api/pinned/{student_id}")
def get_pinned(student_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    SELECT p.*, e.title, e.category, e.date, e.time, e.venue, e.status
    FROM pinned_events p
    JOIN events e ON p.event_id = e.id
    WHERE p.student_id = ?
    """, (student_id,))
    pinned = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return pinned

@app.post("/api/pinned/{event_id}")
def toggle_pinned(event_id: str, student_id: str = Body(..., embed=True)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM pinned_events WHERE student_id = ? AND event_id = ?", (student_id, event_id))
    existing = cursor.fetchone()
    
    if existing:
        cursor.execute("DELETE FROM pinned_events WHERE id = ?", (existing["id"],))
        pinned = False
    else:
        pin_id = f"pin-{uuid.uuid4().hex[:6]}"
        cursor.execute("INSERT INTO pinned_events (id, student_id, event_id) VALUES (?, ?, ?)", (pin_id, student_id, event_id))
        pinned = True
        
    conn.commit()
    conn.close()
    return {"status": "success", "is_pinned": pinned}

# --- STATS ---
@app.get("/api/stats/{user_id}")
def get_user_stats(user_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT role FROM users WHERE id = ?", (user_id,))
    u = cursor.fetchone()
    role = u["role"] if u else "student"
    
    if role in ["faculty", "organiser"]:
        cursor.execute("SELECT COUNT(*) as count FROM events WHERE organizer_id = ?", (user_id,))
        my_events = cursor.fetchone()["count"]
        cursor.execute("SELECT COUNT(*) as count FROM events")
        total_events = cursor.fetchone()["count"]
        cursor.execute("SELECT SUM(registered_count) as total_regs FROM events")
        total_regs = cursor.fetchone()["total_regs"] or 0
        cursor.execute("SELECT COUNT(*) as count FROM event_history")
        total_changes = cursor.fetchone()["count"]
        conn.close()
        return {
            "role": "faculty",
            "my_events": my_events,
            "total_events": total_events,
            "total_registrations": total_regs,
            "total_changes": total_changes
        }
    else:
        cursor.execute("SELECT COUNT(*) as count FROM registrations WHERE student_id = ? AND status = 'Confirmed'", (user_id,))
        registered_count = cursor.fetchone()["count"]
        
        now_str = datetime.now().strftime("%Y-%m-%d")
        cursor.execute("""
        SELECT COUNT(*) as count FROM registrations r
        JOIN events e ON r.event_id = e.id
        WHERE r.student_id = ? AND e.date >= ? AND e.status != 'Cancelled'
        """, (user_id, now_str))
        upcoming_month = cursor.fetchone()["count"]
        
        cursor.execute("SELECT COUNT(*) as count FROM notifications WHERE (user_id = ? OR user_id = 'all') AND read = 0", (user_id,))
        new_updates = cursor.fetchone()["count"]
        
        cursor.execute("""
        SELECT COUNT(*) as count FROM registrations r
        JOIN events e ON r.event_id = e.id
        WHERE r.student_id = ? AND e.date < ?
        """, (user_id, now_str))
        events_attended = cursor.fetchone()["count"]
        
        cursor.execute("""
        SELECT e.*, r.ticket_id
        FROM registrations r
        JOIN events e ON r.event_id = e.id
        WHERE r.student_id = ? AND e.date >= ? AND e.status != 'Cancelled'
        ORDER BY e.date ASC, e.time ASC
        LIMIT 1
        """, (user_id, now_str))
        next_event = cursor.fetchone()
        
        conn.close()
        return {
            "role": "student",
            "registered_events": registered_count,
            "upcoming_month": upcoming_month,
            "new_updates": new_updates,
            "events_attended": max(12, events_attended),
            "next_featured_event": dict_from_row(next_event) if next_event else None
        }

# Serve static frontend files
APP_STATIC = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static")
if os.path.exists(APP_STATIC):
    app.mount("/static", StaticFiles(directory=APP_STATIC), name="static")

@app.get("/")
@app.get("/{full_path:path}")
def serve_spa(full_path: str = ""):
    if full_path.startswith("api/") or full_path.startswith("docs") or full_path.startswith("openapi.json"):
        raise HTTPException(status_code=404, detail="API route not found")
    index_path = os.path.join(APP_STATIC, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "CampusPulse Backend API is active."}
