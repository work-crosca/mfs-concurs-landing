import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "../styles/AboutCardSection.css";
import cardImage from "../assets/home/card.png?w=800&format=webp&as=src";
import downloadIcon from "../assets/home/list/download.svg";
import designIcon from "../assets/home/list/design.svg";
import uploadIcon from "../assets/home/list/upload.svg";
import storyIcon from "../assets/home/list/story.svg";

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

  const steps = [
    { icon: downloadIcon, text: t("about.step1") },
    { icon: designIcon, text: t("about.step2") },
    { icon: uploadIcon, text: t("about.step3") },
    { icon: storyIcon, text: t("about.step4") },
  ];

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
          <h2>{t("about.title")}</h2>

          <ul className="steps-list">
            {steps.map((step, index) => (
              <li key={index}>
                <img src={step.icon} alt={`Step ${index + 1}`} />
                <p>{step.text}</p>
              </li>
            ))}
          </ul>

          <small>{t("about.criteria")}</small>

          <div style={{ marginTop: "1rem" }}>
            <a href="/terms/Regulament_Moldcell_Visa_Card_concurs_de_design_Visa.pdf" className="link-regulament">
              {t("about.rulesLink")}
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutCardSection;