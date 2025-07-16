import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaSpinner } from "react-icons/fa";
import "../../styles/otpModal.css";

export default function OtpModal({
  visible,
  email,
  otpCode,
  setOtpCode,
  onConfirm,
  loading,
  onClose,
}) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!visible) return;

    setTimeLeft(300); // reset timer after open modal
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
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!visible) return null;

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <p>
          {t("otpModal.confirmText")} <span>{email}</span>
        </p>
        <div className="otp-timer">
          {timeLeft > 0
            ? `${t("otpModal.expiresIn")} ${formatTime(timeLeft)}`
            : t("otpModal.timerExpired")}
        </div>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={t("otpModal.placeholder")}
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          disabled={timeLeft === 0}
        />

        <div style={{display: "flex", flexDirection: "column", gap: "0.6rem", alignItems: "center", width: "100%"}}>
          <button
            className="confirm-otp-btn"
            onClick={onConfirm}
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
          a
        </div>
      </div>
    </div>
  );
}
