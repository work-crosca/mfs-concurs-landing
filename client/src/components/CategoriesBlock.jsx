import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section className="categories-block" ref={containerRef}>
      <div className="categories-header">
        <h2 className="light">{t("categories.title")}</h2>
        <p>{t("categories.subtitle")}</p>
      </div>

      <div className="categories-grid">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            className="category-item"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img src={category.icon} alt="" className="category-icon" />
            <span>{t(category.labelKey)}</span>
          </motion.div>
        ))}
      </div>

      <p className="categories-note">{t("categories.note")}</p>
    </section>
  );
}