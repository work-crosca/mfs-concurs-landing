import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import "../styles/AboutCardSection.css";
import cardImage from "../assets/home/card.png?w=800&format=webp&as=src";

const AboutCardSection = () => {
  const { t } = useTranslation();

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true, amount: 0.6 });
  const textInView = useInView(textRef, { once: true, amount: 0.6 });

  return (
    <section className="about-card-container">
      <motion.div
        className="about-card-image"
        ref={imageRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={imageInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <img
          src={cardImage}
          alt="Moldcell Visa Card"
          loading="lazy"
        />
      </motion.div>

      <motion.div
        className="about-card-text"
        ref={textRef}
        initial={{ opacity: 0, y: 40 }}
        animate={textInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2>{t("about.title")}</h2>
        <p className="about-description">
          {t("about.description")}
        </p>
      </motion.div>
    </section>
  );
};

export default AboutCardSection;