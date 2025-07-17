import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaSpinner, FaUpload } from "react-icons/fa";
import "../styles/InscrierePage.css";
import OtpModal from "../components/UI/OtpModal";
import overlayDark from "../assets/shablon/VISA-shablon-dark.png?w=800&format=webp&as=src";
import overlayLight from "../assets/shablon/VISA-shablon-light.png?w=800&format=webp&as=src";

import EndDate from "../components/EndDate";

export default function InscrierePage() {
  const { t, i18n } = useTranslation();
  const getLangId = () => {
    const lang = i18n.language;
    if (lang === "ru") return 2;
    return 1;
  };
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    category: "",
    description: "",
    file: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [agree, setAgree] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 150) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (file) => {
    if (!file) return;
    if (file.type !== "image/png") {
      setToast({ type: "error", message: "Fișierul trebuie să fie PNG!" });
      return;
    }
    setFormData({ ...formData, file });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      setToast({
        type: "error",
        message: "Trebuie să fii de acord cu condițiile!",
      });
      return;
    }

    if (!formData.file) {
      setToast({ type: "error", message: "Trebuie să încarci un fișier PNG!" });
      return;
    }

    try {
      setOtpLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/otp/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, langId: getLangId() }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setOtpModalVisible(true);
        setToast({ type: "success", message: "OTP trimis pe email!" });
      } else {
        if (data.code === 1) {
          setToast({ type: "error", message: "Email invalid." });
        } else if (data.code === -2) {
          setToast({
            type: "error",
            message: "Date incorecte trimise serverului.",
          });
        } else {
          setToast({ type: "error", message: data.message || "Eroare OTP." });
        }
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Eroare la trimiterea OTP." });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpConfirm = async (code) => {
    try {
      setOtpLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/otp/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, code }),
        }
      );
      const data = await res.json();

      if (data.success) {
        await handleUpload();
        setOtpModalVisible(false);
        return true;
      } else {
        setToast({ type: "error", message: data.message || "Cod invalid." });
        return false;
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Eroare la verificarea OTP." });
      return false;
    } finally {
      setOtpLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const newFileName = slugify(formData.nickname) + ".png";
      const renamedFile = new File([formData.file], newFileName, {
        type: formData.file.type,
      });

      const data = new FormData();
      data.append("nickname", formData.nickname);
      data.append("email", formData.email);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("file", renamedFile);

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!result.success) {
        setToast({
          type: "error",
          message: result.message || "Eroare la upload.",
        });
        return;
      }

      setToast({ type: "success", message: "Trimis cu succes!" });
      setFormData({
        nickname: "",
        email: "",
        category: "",
        description: "",
        file: null,
      });
      setPreviewUrl(null);
      setAgree(false);
      setOtpCode("");
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Eroare la upload." });
    } finally {
      setLoading(false);
    }
  };

  function slugify(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
  }

  return (
    <>
      <EndDate />
      <div className={`inscriere-page ${darkMode ? "dark" : "light"}`}>
        <motion.section
          className="inscriere-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="inscriere-form">
            <h1>{t("inscriere.title")}</h1>
            <div className="form-content">
              <div className="form-left">
                <div
                  className="image-preview-wrapper"
                  style={{
                    backgroundColor: previewUrl ? "transparent" : "#111",
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview user upload"
                      className="user-preview"
                    />
                  ) : (
                    <div className="no-image-text">Nicio imagine selectată</div>
                  )}
                  <img
                    src={darkMode ? overlayDark : overlayLight}
                    alt="Overlay"
                    className="overlay-preview"
                  />
                </div>

                <div className="toggle-mode">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={!darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="slider"></span>
                  </label>
                  <span>
                    {darkMode
                      ? t("inscriere.previewDark")
                      : t("inscriere.previewLight")}
                  </span>
                </div>

                <div
                  className="file-dropzone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaUpload size={30} />
                  <p>
                    {formData.file
                      ? t("inscriere.dropzoneSelected", {
                          fileName: formData.file.name,
                        })
                      : t("inscriere.dropzoneDefault")}
                  </p>
                </div>

                <input
                  type="file"
                  accept=".png"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </div>

              <div className="form-right">
                <input
                  type="text"
                  name="nickname"
                  placeholder={t("inscriere.nickname")}
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t("inscriere.email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t("inscriere.selectCategory")}</option>
                  <option value="sport">{t("inscriere.categorySport")}</option>
                  <option value="digital">
                    {t("inscriere.categoryDigital")}
                  </option>
                  <option value="traditions">
                    {t("inscriere.categoryTraditions")}
                  </option>
                  <option value="nature">
                    {t("inscriere.categoryNature")}
                  </option>
                  <option value="freestyle">
                    {t("inscriere.categoryFreestyle")}
                  </option>
                </select>
                <textarea
                  name="description"
                  placeholder={t("inscriere.descriptionPlaceholder")}
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={150}
                  rows="3"
                />
                <div className="description-counter">
                  {formData.description.length}/150
                </div>

                <label className="checkbox-agreement">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                  />
                  <span>
                    {t("inscriere.agree")}{" "}
                    <a
                      href="/terms/Regulament_Moldcell_Visa_Card_concurs_de_design_Visa.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("inscriere.conditions")}
                    </a>
                  </span>
                </label>

                <button type="submit" disabled={loading || otpLoading}>
                  {loading || otpLoading ? (
                    <FaSpinner className="spinner-btn" />
                  ) : (
                    t("inscriere.submit")
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.section>

        <OtpModal
          visible={otpModalVisible}
          email={formData.email}
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          onConfirm={handleOtpConfirm}
          loading={otpLoading}
          onClose={() => setOtpModalVisible(false)}
        />

        {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
      </div>
    </>
  );
}
