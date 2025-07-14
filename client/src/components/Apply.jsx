import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "../styles/Apply.css";
import applyImage from "../assets/promo5.png?w=800&format=webp&as=src";

const Apply = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const imageInView = useInView(imageRef, { once: true, amount: 0.6 });
  const textInView = useInView(textRef, { once: true, amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section className="block-01" ref={containerRef}>
      <motion.div
        className="col"
        ref={textRef}
        initial={{ opacity: 0, y: 40 }}
        animate={textInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 style={{ marginBottom: 0 }}>{t("apply.title")}</h2>
        <p>{t("apply.line1")}</p>
        <p>{t("apply.line2")}</p>
        <p style={{marginTop: "1rem"}}>{t("apply.line3")}</p>
        <p>{t("apply.line4")}</p>

        <div style={{ marginTop: "2rem" }}>
          <button className="apply-btn" onClick={() => navigate("/inscrirere")}>
            {t("apply.button")}
          </button>
        </div>
      </motion.div>

      <motion.div
        className="col"
        ref={imageRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={imageInView ? { opacity: 1, scale: 1.1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={applyImage}
          className="large"
          alt="Aplică"
          loading="lazy"
          style={{
            scale,
            y: ["0%", "-2%", "0%", "2%", "0%"],
            transition: "y 4s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
};

export default Apply;
