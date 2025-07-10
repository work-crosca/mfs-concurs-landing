import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import "../styles/FAQ.css";

const faqItems = [
  { questionKey: "faq.q1", answerKey: "faq.a1" },
  { questionKey: "faq.q2", answerKey: "faq.a2" },
  { questionKey: "faq.q3", answerKey: "faq.a3" },
  { questionKey: "faq.q4", answerKey: "faq.a4" },
];

export default function FAQ() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      className="faq-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="faq-title">{t("faq.title")}</h2>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? "open" : ""}`}>
            <button className="faq-question" onClick={() => toggle(index)}>
              {t(item.questionKey)}
              <FaChevronDown
                className={`faq-icon ${activeIndex === index ? "rotated" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key={index}
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0}}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p>{t(item.answerKey)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
