import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "../styles/AwardsBlok.css";
import awardImage from "../assets/home/award.png?w=800&format=webp&as=src";

const AwardsBlock = () => {
  const { t } = useTranslation();

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
        ref={imageRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={imageInView ? { opacity: 1, scale: 1.1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={awardImage}
          className="large"
          alt="Awards Moldcell"
          loading="lazy"
          style={{
            scale,
            y: ["0%", "-2%", "0%", "2%", "0%"],
            transition: "y 4s ease-in-out infinite",
          }}
        />
      </motion.div>

      <motion.div
        className="col"
        ref={textRef}
        initial={{ opacity: 0, y: 40 }}
        animate={textInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 style={{marginBottom: 0}}>{t("prizes.amount")}</h2>
        <h3 style={{marginTop: 0}}>{t("prizes.subtitle")}</h3>
        <p>{t("prizes.line1")}</p>
        <p>{t("prizes.line2")}</p>
        <p>{t("prizes.line3")}</p>
        <p>{t("prizes.line4")}</p>
      </motion.div>
    </section>
  );
};

export default AwardsBlock;