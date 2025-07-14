import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import "../styles/CategoriesBlock.css";
import heartIcon1 from "../assets/home/categories/iCons-facem_01.svg";
import heartIcon2 from "../assets/home/categories/iCons-facem_02.svg";
import heartIcon3 from "../assets/home/categories/iCons-facem_03.svg";
import heartIcon4 from "../assets/home/categories/iCons-facem_04.svg";
import heartIcon5 from "../assets/home/categories/iCons-facem_05.svg";

const categories = [
  { id: 1, icon: heartIcon1, labelKey: "categories.sport" },
  { id: 2, icon: heartIcon2, labelKey: "categories.digital" },
  { id: 3, icon: heartIcon3, labelKey: "categories.traditions" },
  { id: 4, icon: heartIcon4, labelKey: "categories.nature" },
  { id: 5, icon: heartIcon5, labelKey: "categories.freestyle" },
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