import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useState } from "react";
import { FiGlobe, FiChevronDown } from "react-icons/fi";
import "../../styles/LanguageSwitcher.css";

const languages = [
  { code: "ro", label: "Română" },
  { code: "ru", label: "Русский" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const selectLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setOpen(false);
  };

  return (
    <div className="lang-switcher" onClick={() => setOpen((prev) => !prev)}>
      <div className="lang-selected">
        <FiGlobe size={16} />
        <span>{current.label}</span>
        <FiChevronDown size={16} />
      </div>
      {open && (
        <div className="lang-dropdown">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`lang-option ${
                lang.code === i18n.language ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation(); // <-- esențial
                selectLanguage(lang.code);
              }}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
