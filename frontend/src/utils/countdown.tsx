import React, { useState, useEffect } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function calculateCountdown(targetDateStr?: string | null, targetTimeStr?: string | null): CountdownTime {
  if (!targetDateStr) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };

  let hours = 9;
  let minutes = 0;
  if (targetTimeStr) {
    const match = targetTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      if (match[3].toUpperCase() === 'PM' && hours < 12) hours += 12;
      if (match[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
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

export const pad2 = (n: number) => String(n).padStart(2, '0');

export const CountdownDisplay: React.FC<{ dateStr: string; timeStr?: string }> = ({ dateStr, timeStr }) => {
  const [time, setTime] = useState<CountdownTime>(() => calculateCountdown(dateStr, timeStr));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateCountdown(dateStr, timeStr));
    }, 1000);
    return () => clearInterval(timer);
  }, [dateStr, timeStr]);

  return (
    <div className="countdown-container">
      <div className="timer-unit-box">
        <div className="timer-value">{pad2(time.days)}</div>
        <div className="timer-label">Days</div>
      </div>
      <span className="timer-colon">:</span>
      <div className="timer-unit-box">
        <div className="timer-value">{pad2(time.hours)}</div>
        <div className="timer-label">Hours</div>
      </div>
      <span className="timer-colon">:</span>
      <div className="timer-unit-box">
        <div className="timer-value">{pad2(time.minutes)}</div>
        <div className="timer-label">Mins</div>
      </div>
      <span className="timer-colon">:</span>
      <div className="timer-unit-box">
        <div className="timer-value">{pad2(time.seconds)}</div>
        <div className="timer-label">Secs</div>
      </div>
    </div>
  );
};

