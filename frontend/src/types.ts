export interface User {
  id: string | number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'organiser';
  department?: string;
  student_reg_no?: string;
  faculty_id?: string;
  year_of_study?: string;
  designation?: string;
  phone?: string;
  avatar?: string;
}

export interface CollegeEvent {
  id: string | number;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  start_time?: string;
  end_time?: string;
  venue: string;
  department?: string;
  organizer?: string;
  organizer_id?: string | number;
  organizer_name?: string;
  available_seats?: number;
  total_seats: number;
  capacity?: number;
  registered_count: number;
  status: string;
  original_date?: string | null;
  original_time?: string | null;
  original_venue?: string | null;
  rules?: string[];
  banner?: string;
  is_featured?: number;
  registration_deadline?: string;
}

export interface Registration {
  id: string | number;
  student_id: string | number;
  student_name?: string;
  event_id: string | number;
  event_title: string;
  event_date: string;
  event_time?: string;
  venue: string;
  event_status?: string;
  ticket_id: string;
  qr_code_data?: string;
  status?: string;
  registration_date?: string;
}

export interface NotificationItem {
  id: string | number;
  event_id?: string | number;
  update_type?: string;
  type?: string;
  title: string;
  message: string;
  old_value?: string | null;
  new_value?: string | null;
  read?: number;
  is_read?: boolean;
  created_at?: string;
  time_ago?: string;
}

export interface EventHistoryItem {
  id: string | number;
  event_id: string | number;
  event_title?: string;
  change_type: string;
  previous_values: Record<string, any>;
  updated_values: Record<string, any>;
  reason: string;
  created_at: string;
}
