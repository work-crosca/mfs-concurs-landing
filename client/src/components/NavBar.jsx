import "../styles/NavBar.css";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./UI/LanguageSwitcher";
import logo from "../assets/logo.svg";

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <nav className="header-right">
        <div className="navbar-links">
          {/* <Link to="/">{t("header.home")}</Link>
          <Link to="/inscriere">{t('header.apply')}</Link> */}
        </div>

        <LanguageSwitcher />
      </nav>
    </header>
  );
}