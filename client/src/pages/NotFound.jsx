import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";
import errorImg from "../assets/errors/404.svg"

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <motion.section
      className="notfound-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="notfound-content">
        <img src={errorImg} alt="404" />
        <p>{t("notfound.text") || "Pagina nu a fost găsită."}</p>
        <button onClick={() => navigate("/")}>
          <IoHome />
          {t("notfound.button") || "Înapoi acasă"}
        </button>
      </div>
    </motion.section>
  );
}