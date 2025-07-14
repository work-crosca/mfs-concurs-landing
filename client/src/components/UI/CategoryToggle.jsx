import React from 'react';
import '../../styles/CategoryToggle.css';
import { useTranslation } from 'react-i18next';

export default function CategoryToggle({ selected, onChange }) {
  const { t } = useTranslation();

  const options = [
    { value: "all", label: t("inscriere.selectCategory") || "Toate" },
    { value: "sport", label: t("inscriere.categorySport") },
    { value: "digital", label: t("inscriere.categoryDigital") },
    { value: "traditions", label: t("inscriere.categoryTraditions") },
    { value: "nature", label: t("inscriere.categoryNature") },
    { value: "freestyle", label: t("inscriere.categoryFreestyle") },
  ];

  return (
    <div className="toggle-container">
      {options.map(option => (
        <button
          key={option.value}
          className={`toggle-button ${selected === option.value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}