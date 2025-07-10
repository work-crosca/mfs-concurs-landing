import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "../styles/InscrierePage.css";

export default function InscrierePage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    category: "",
    description: "",
    file: null
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // limităm descrierea la 150 caractere
    if (name === "description" && value.length > 150) return;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.file && formData.file.type !== "image/png") {
      setToast({ type: "error", message: "Fișierul trebuie să fie PNG!" });
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("chat_id", CHAT_ID);
      data.append("document", formData.file);
      data.append("caption", `📥 Nouă înscriere:
👤 Nickname: ${formData.nickname}
✉️ Email: ${formData.email}
🎨 Categoria: ${formData.category}
📝 Descriere: ${formData.description}`);

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
        method: "POST",
        body: data
      });

      setToast({ type: "success", message: "Trimis pe Telegram cu succes!" });
      setFormData({ nickname: "", email: "", category: "", description: "", file: null });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Eroare la trimitere." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inscriere-page">
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
            <option value="logo">Logo</option>
            <option value="poster">Poster</option>
            <option value="card">Card Design</option>
          </select>
          <textarea
            name="description"
            placeholder="Short description (max 150 chars)"
            value={formData.description}
            onChange={handleChange}
            maxLength={150}
            rows="3"
          />
          <input
            type="file"
            name="file"
            accept=".png"
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Se trimite..." : t("inscriere.submit")}
          </button>
        </form>
      </motion.section>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}