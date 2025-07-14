import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/CategoriesBlock.css";
import heartIcon from "../assets/home/heart.png?w=100&format=webp&as=src";

const categories = [
  { id: 1, icon: heartIcon, labelKey: "categories.sport" },
  { id: 2, icon: heartIcon, labelKey: "categories.digital" },
  { id: 3, icon: heartIcon, labelKey: "categories.traditions" },
  { id: 4, icon: heartIcon, labelKey: "categories.nature" },
  { id: 5, icon: heartIcon, labelKey: "categories.freestyle" },
];

export default function CategoriesBlock() {
  const { t } = useTranslation();

  return (
    <section className="categories-block">
      <div className="categories-header">
        <h2 className="light">{t("categories.title")}</h2>
        <p>{t("categories.subtitle")}</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <img src={category.icon} alt="" className="category-icon" />
            <span>{t(category.labelKey)}</span>
          </div>
        ))}
      </div>

      <p className="categories-note">{t("categories.note")}</p>
    </section>
  );
}