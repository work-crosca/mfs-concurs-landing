import React from "react";
import { FaSpinner } from "react-icons/fa";
import "../../styles/otpModal.css";

export default function OtpModal({
  visible,
  email,
  otpCode,
  setOtpCode,
  onConfirm,
  loading,
}) {
  if (!visible) return null;

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h2>Confirmă OTP trimis la {email}</h2>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Cod OTP"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <button onClick={onConfirm} disabled={loading}>
          {loading ? <FaSpinner className="spinner-btn" /> : "Confirmă OTP"}
        </button>
      </div>
    </div>
  );
}
