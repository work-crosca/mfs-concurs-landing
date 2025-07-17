import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import "../../styles/otpModal.css";
import otpImg from "../../assets/icons/otp.png?w=450&format=webp&as=src";

export default function OtpModal({
  visible,
  email,
  onConfirm,
  loading,
  onClose,
}) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(300);
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [shake, setShake] = useState(false);
  const inputsRef = useRef([]);

  // Blochează scroll-ul direct prin body.style.overflow
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    setTimeLeft(300);
    setOtpArray(["", "", "", "", "", ""]);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [visible]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleFocus = (index) => {
    inputsRef.current[index].setSelectionRange(0, 1);
  };

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otpArray];
      if (otpArray[index]) {
        newOtp[index] = "";
        setOtpArray(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleConfirm = async () => {
   const code = otpArray.join("");
 
   if (code.length < 6) {
     setShake(true);
     setTimeout(() => setShake(false), 400);
     return;
   }
 
   const isValid = await onConfirm(code); 
   if (!isValid) {
     setShake(true);
     setTimeout(() => setShake(false), 400);
   }
 };

  if (!visible) return null;

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <img src={otpImg} alt="OTP" />
        <p>
          {t("otpModal.confirmText")} <span>{email}</span>
        </p>
        <div className="otp-timer">
          <p>
            {timeLeft > 0 ? t("otpModal.expiresIn") : t("otpModal.timerExpired")}
          </p>
          {formatTime(timeLeft)}
        </div>

        <div className={`otp-inputs ${shake ? "shake" : ""}`}>
          {otpArray.map((digit, idx) => (
            <input
              key={idx}
              type="tel"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onFocus={() => handleFocus(idx)}
              disabled={timeLeft === 0}
              ref={(el) => (inputsRef.current[idx] = el)}
              style={{
                fontSize: "18px",
                userSelect: "none",
                caretColor: "transparent",
              }}
            />
          ))}
        </div>

        <div className="modal-controls">
          <button
            className="confirm-otp-btn"
            onClick={handleConfirm}
            disabled={loading || timeLeft === 0}
          >
            {loading ? (
              <FaSpinner className="spinner-btn" />
            ) : timeLeft === 0 ? (
              t("otpModal.expired")
            ) : (
              t("otpModal.confirmBtn")
            )}
          </button>
          <button className="modal-close-btn" onClick={onClose}>
            {t("otpModal.closeBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}