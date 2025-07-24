import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/EmailModal.css";
import vottingImg from "../../assets/icons/like.png?w=450&format=webp&as=src";

export default function EmailModal({ visible, onSubmit, onClose, loading }) {
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const { t } = useTranslation();

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.trim() === "") {
      setEmailError("");
      setIsValidEmail(false);
    } else if (!emailRegex.test(emailInput)) {
      setEmailError(t("emailModal.invalidEmail"));
      setIsValidEmail(false);
    } else {
      setEmailError("");
      setIsValidEmail(true);
    }
  }, [emailInput, t]);

  if (!visible) return null;

  const handleSubmit = () => {
    if (!isValidEmail) return;
    onSubmit(emailInput);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <img src={vottingImg} alt="OTP" />
          <h2>{t("emailModal.title")}</h2>
          <p>{t("emailModal.description")}</p>
        </div>
        <div className="modal-controls">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder={t("inscriere.email")}
            required
            className={emailError ? "error-input" : ""}
          />
          {emailError && <div className="tooltip-error">{emailError}</div>}

          <button
            className="submit"
            onClick={handleSubmit}
            disabled={loading || !isValidEmail}
          >
            {loading ? t("emailModal.sending") : t("emailModal.send")}
          </button>

          <button className="close-btn" onClick={onClose}>
            {t("emailModal.close")}
          </button>
        </div>
      </div>
    </div>
  );
}