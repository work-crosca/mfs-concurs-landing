import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/CategoriesBlock.css";
import heartIcon from "../assets/home/heart.png?w=100&format=webp&as=src";

export default function CategoriesBlock() {
  const { t } = useTranslation();

  return (
    <section className="categories-block">
      <div className="categories-header">
        <h2>{t("categories.title")}</h2>
        <p>{t("categories.subtitle")}</p>
      </div>

      <div className="categories-grid">
        <div className="category-item">
          <img src={heartIcon} alt="1" className="category-icon" />
          <span>{t("categories.sport")}</span>
        </div>
        <div className="category-item">
          <img src={heartIcon} alt="2" className="category-icon" />
          <span>{t("categories.digital")}</span>
        </div>
        <div className="category-item">
          <img src={heartIcon} alt="3" className="category-icon" />
          <span>{t("categories.traditions")}</span>
        </div>
        <div className="category-item">
          <img src={heartIcon} alt="4" className="category-icon" />
          <span>{t("categories.nature")}</span>
        </div>
        <div className="category-item">
          <img src={heartIcon} alt="5" className="category-icon" />
          <span>{t("categories.freestyle")}</span>
        </div>
      </div>

      <p className="categories-note">{t("categories.note")}</p>
    </section>
  );
}