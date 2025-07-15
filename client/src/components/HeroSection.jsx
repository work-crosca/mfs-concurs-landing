import React from "react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { motion } from "framer-motion";
import "../styles/HeroSection.css";

// Importi toate imaginile posibile
import heroCard1 from "../assets/promo1.png?w=800&format=webp&as=src";
import heroCard2 from "../assets/promo2.png?w=800&format=webp&as=src";
import heroCard3 from "../assets/promo3.png?w=800&format=webp&as=src";
import heroCard4 from "../assets/promo4.png?w=800&format=webp&as=src";
import heroCard5 from "../assets/promo5.png?w=800&format=webp&as=src";
import heroCard6 from "../assets/promo6.png?w=800&format=webp&as=src";
import heroCard8 from "../assets/promo8.png?w=800&format=webp&as=src";
import heroCard9 from "../assets/promo9.png?w=800&format=webp&as=src";

export default function HeroSection() {
  const { t } = useTranslation();

  // Alegi random la fiecare render
  const images = [
    heroCard1,
    heroCard2,
    heroCard3,
    heroCard4,
    heroCard5,
    heroCard6,
    heroCard8,
    heroCard9,
  ];
  const heroCard = images[Math.floor(Math.random() * images.length)];

  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="hero-content-left">
          <img src={heroCard} alt="Moldcell Visa" />
        </div>
        <div className="hero-content-right">
          <div className="hero-text">
            <h1>
              {" "}
              <Trans
                i18nKey="hero.title1"
                components={{ span: <span className="highlight" /> }}
              />
            </h1>
            <h1>{t("hero.title2")}</h1>
            <p>
              {t("hero.subtitle")
                .split("\n")
                .map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
            </p>
            <p style={{fontSize: "1.2rem"}}>{t("hero.text")}</p>
          </div>

          <button
            className="hero-button"
            onClick={() => (window.location.href = "/inscriere")}
          >
            {t("hero.cta")}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
