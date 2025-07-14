import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>{t("footer.companyTitle")}</h4>
          <ul>
            <li><a href="/about">{t("footer.about")}</a></li>
            <li><a href="/careers">{t("footer.careers")}</a></li>
            <li><a href="/press">{t("footer.press")}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t("footer.supportTitle")}</h4>
          <ul>
            <li><a href="/faq">{t("footer.faq")}</a></li>
            <li><a href="/contact">{t("footer.contact")}</a></li>
            <li><a href="/help">{t("footer.help")}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t("footer.legalTitle")}</h4>
          <ul>
            <li><a href="/terms">{t("footer.terms")}</a></li>
            <li><a href="/privacy">{t("footer.privacy")}</a></li>
            <li><a href="/cookies">{t("footer.cookies")}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>{t("footer.followTitle")}</h4>
          <ul>
            <li><a href="https://facebook.com">{t("footer.facebook")}</a></li>
            <li><a href="https://instagram.com">{t("footer.instagram")}</a></li>
            <li><a href="https://tiktok.com">{t("footer.tiktok")}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;