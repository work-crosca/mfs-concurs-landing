import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "../styles/AboutCardSection.css";
import cardImage from "../assets/home/card.png?w=800&format=webp&as=src";

const AboutCardSection = () => {
  const { t } = useTranslation();

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const imageInView = useInView(imageRef, { once: true, amount: 0.6 });
  const textInView = useInView(textRef, { once: true, amount: 0.6 });

  // scale on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      <section className="block-01" ref={containerRef}>
        <motion.div
          className="col"
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={imageInView ? { opacity: 1, scale: 1.1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={cardImage}
            className="large"
            alt="Moldcell Visa Card"
            loading="lazy"
            style={{
              scale,
              y: ["0%", "-2%", "0%", "2%", "0%"], // plutire
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
          <h2>{t("about.title")}</h2>
          <p>{t("about.description")}</p>
        </motion.div>
      </section>
    </>
  );
};

export default AboutCardSection;
