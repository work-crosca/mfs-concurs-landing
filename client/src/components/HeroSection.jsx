import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/HeroSection.css";
import { FiChevronDown } from "react-icons/fi";
import heroCard from "../assets/promo.png?w=800&format=webp&as=src";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-content-left">
          <img src={heroCard} alt="Moldcell Visa" />
        </div>
        <div className="hero-content-right">
          <div className="hero-text">
            <p>{t("hero.text")}</p>
            <h1>{t("hero.title1")}</h1>
            <h1>{t("hero.title2")}</h1>
            <p>{t("hero.subtitle")}</p>
          </div>

          <button
            className="hero-button"
            onClick={() => (window.location.href = "/inscriere")}
          >
            {t("hero.cta")}
          </button>
        </div>
      </div>

      {/* Săgeată scroll jos */}
      <div className="scroll-down-arrow">
        <FiChevronDown size={40} />
      </div>
    </section>
  );
}