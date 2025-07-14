import React from "react";
import "../styles/EndDate.css";
import { useTranslation } from "react-i18next";
import CountdownTimer from "./UI/CountdownTimer";

const EndDate = () => {
  const { t } = useTranslation();

  return (
    <section className="timer-section">
      <div className="timer-section-content">
        <h2 className="light">{t("endDate.title")}</h2>

        <CountdownTimer targetDate="2025-08-09T23:59:59Z" />

        <p>
          {t("endDate.description")}
        </p>
      </div>
    </section>
  );
};

export default EndDate;
