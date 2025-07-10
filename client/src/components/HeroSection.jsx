import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/HeroSection.css";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.subtitle")}</p>
        <a href="/inscriere" className="hero-button">
          {t("hero.cta")}
        </a>
      </div>
    </section>
  );
}