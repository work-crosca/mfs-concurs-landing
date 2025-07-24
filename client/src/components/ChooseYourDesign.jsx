import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import "../styles/ChooseYourDesign.css";
import VoteImg from "../assets/vote.png?w=800&format=webp&as=src";

export default function ChooseYourDesign() {
  const { t } = useTranslation();

  const textRef = useRef(null);
  const imageRef = useRef(null);
  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 });

  return (
    <section className="block-01 reverse vote-img-page">
      <motion.div
        className="col"
        ref={textRef}
        initial={{ opacity: 0, x: -50 }}
        animate={textInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text">{t("chooseDesign.period")}</p>
        <h2>{t("chooseDesign.title")}</h2>
        <p className="text">{t("chooseDesign.text1")}</p>
        <p className="text">{t("chooseDesign.text2")}</p>
        <p className="text">{t("chooseDesign.text3")}</p>
        <p className="text">{t("chooseDesign.text4")}</p>
      </motion.div>

      <motion.div
        className="col voting"
        ref={imageRef}
        initial={{ opacity: 0, x: 50 }}
        animate={imageInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          className="large"
          src={VoteImg}
          alt="Vote hammer"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{ display: "block", width: "100%",}}
        />
      </motion.div>
    </section>
  );
}
