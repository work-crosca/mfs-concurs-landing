import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../styles/CountdownTimer.css";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "00", hours: "00", minutes: "00", seconds: "00"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);

      if (isNaN(target)) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        setTimeLeft({
          days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'),
          hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
          minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0'),
          seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div
      className="timer-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="timer-item">
        <div className="timer-value">{timeLeft.days}</div>
        <div className="timer-label">Days</div>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-item">
        <div className="timer-value">{timeLeft.hours}</div>
        <div className="timer-label">Hours</div>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-item">
        <div className="timer-value">{timeLeft.minutes}</div>
        <div className="timer-label">Minutes</div>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-item">
        <div className="timer-value">{timeLeft.seconds}</div>
        <div className="timer-label">Seconds</div>
      </div>
    </motion.div>
  );
}