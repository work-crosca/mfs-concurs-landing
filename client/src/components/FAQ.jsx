import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import "../styles/FAQ.css";

const faqItems = [
  { questionKey: "faq.q1", answerKey: "faq.a1" },
  { questionKey: "faq.q2", answerKey: "faq.a2" },
  { questionKey: "faq.q3", answerKey: "faq.a3_list", isList: true },
  { questionKey: "faq.q4", answerKey: "faq.a4_list", isList: true, html: true },
  { questionKey: "faq.q5", answerKey: "faq.a5" },
  { questionKey: "faq.q6", answerKey: "faq.a6", html: true },
  { questionKey: "faq.q7", isResponsibility: true }
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
      <h2 className="faq-title light">{t("faq.title")}</h2>
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
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Dacă e secțiunea specială cu responsabilitatea */}
                  {item.isResponsibility && (
                    <>
                      <p>{t("faq.a7_intro")}</p>
                      <ul>
                        {t("faq.a7_list", { returnObjects: true }).map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                      <p>{t("faq.a7_footer")}</p>
                    </>
                  )}

                  {/* Dacă e listă simplă */}
                  {!item.isResponsibility && item.isList && !item.html && (
                    <ul>
                      {t(item.answerKey, { returnObjects: true }).map((li, i) => (
                        <li key={i}>{li}</li>
                      ))}
                    </ul>
                  )}

                  {/* Dacă e listă cu HTML (ex: ArtCor link) */}
                  {!item.isResponsibility && item.isList && item.html && (
                    <ul>
                      {t(item.answerKey, { returnObjects: true }).map((li, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: li }}></li>
                      ))}
                    </ul>
                  )}

                  {/* Dacă e HTML direct (ex: regulament) */}
                  {!item.isResponsibility && !item.isList && item.html && (
                    <p dangerouslySetInnerHTML={{ __html: t(item.answerKey) }}></p>
                  )}

                  {/* Dacă e simplu paragraf */}
                  {!item.isResponsibility && !item.isList && !item.html && (
                    <p>{t(item.answerKey)}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}