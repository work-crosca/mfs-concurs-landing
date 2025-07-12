import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import CountdownTimer from "./UI/CountdownTimer";
import "../styles/VotingBlock.css";
import hammerImage from "../assets/home/hammer.png?w=800&format=webp&as=src";

export default function VotingBlock() {
  const { t } = useTranslation();

  const textRef = useRef(null);
  const imageRef = useRef(null);
  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 });

  return (
    <>
      <CountdownTimer targetDate="2025-08-09T23:59:59Z" />
      <section className="block-01">
        <motion.div
          className="col"
          ref={textRef}
          initial={{ opacity: 0, x: -50 }}
          animate={textInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>
            {t("voting.period")} <br />
            {t("voting.title")}
          </h2>
          <p>{t("voting.text1")}</p>
          <p>{t("voting.text2")}</p>
          <p>{t("voting.text3")}</p>
          <p style={{marginTop: "2rem"}}>{t("voting.text4")}</p>
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
            src={hammerImage}
            alt="Vot ciocan"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{ display: "block", width: "100%" }}
          />
        </motion.div>
      </section>
    </>
  );
}
