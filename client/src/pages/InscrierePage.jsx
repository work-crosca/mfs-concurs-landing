import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaSpinner, FaUpload } from "react-icons/fa";
import "../styles/InscrierePage.css";
import overlayDark from "../assets/shablon/VISA-shablon-dark.png?w=800&format=webp&as=src";
import overlayLight from "../assets/shablon/VISA-shablon-light.png?w=800&format=webp&as=src";

export default function InscrierePage() {
  const { t } = useTranslation();
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

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 150) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (file) => {
    if (file && file.type !== "image/png") {
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

      await fetch("https://mfs-concurs-back.onrender.com/api/upload", {
        method: "POST",
        body: data,
      });

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
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Eroare la trimitere." });
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
    <div className={`inscriere-page ${darkMode ? "dark" : "light"}`}>
      <motion.section
        className="inscriere-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{t("inscriere.title")}</h1>
        <form onSubmit={handleSubmit} className="inscriere-form">
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
            <option value="logo">{t("inscriere.categoryLogo")}</option>
            <option value="poster">{t("inscriere.categoryPoster")}</option>
            <option value="card">{t("inscriere.categoryCard")}</option>
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
            required
          />

          {previewUrl && (
            <div className="image-preview-wrapper">
              <img
                src={previewUrl}
                alt="Preview user upload"
                className="user-preview"
              />
              <img
                src={darkMode ? overlayDark : overlayLight}
                alt="Overlay"
                className="overlay-preview"
              />
            </div>
          )}

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

          <label className="checkbox-agreement">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
            <div style={{ display: "inline-block" }}>
              {t("inscriere.agree")} <a href="">{t("inscriere.conditions")}</a>
            </div>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? (
              <FaSpinner className="spinner" />
            ) : (
              t("inscriere.submit")
            )}
          </button>
        </form>
      </motion.section>

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}
