import React from "react";
import "../styles/Footer.css";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.svg";
import {
  IoLogoApple,
  IoLogoGooglePlaystore,
  IoCallOutline,
  IoMailOutline,
  IoGlobeOutline
} from "react-icons/io5";
import qrCode from "../assets/mmoney.svg";

export default function Footer() {
  const { t, i18n } = useTranslation();

  // isMobile?
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>{t("footer.downloadApp")}</h4>
          <div className="download-section">
            <img src={logo} alt="moldcell money" className="download-badge" />
            {isMobile ? (
              <a
                style={{ textDecoration: "none" }}
                href={
                  isIOS
                    ? "https://apps.apple.com/us/app/moldcell-money/id6443490483"
                    : "https://play.google.com/store/apps/details?id=app.moldcell.mmoney"
                }
              >
                <div className="store-icon">
                  {isIOS ? (
                    <div className="download-app-btn">
                      <IoLogoApple style={{ fontSize: "2rem" }} /> AppStore
                    </div>
                  ) : (
                    <div className="download-app-btn">
                      <IoLogoGooglePlaystore style={{ fontSize: "2rem" }} />{" "}
                      GooglePlay
                    </div>
                  )}
                </div>
              </a>
            ) : (
              <img src={qrCode} alt="Scan QR to download" className="qr-code" />
            )}
          </div>
        </div>

        <div className="footer-column">
          <h4>{t("footer.contact")}</h4>
          <p className="contact">
            <IoCallOutline style={{ fontSize: "1.5rem" }} />
            <a href="tel:+37322444444">+373 22 444 444</a>
          </p>

          <p className="contact">
            <IoMailOutline style={{ fontSize: "1.5rem" }} />
            <a href="mailto:moldcell@moldcell.md">moldcell@moldcell.md</a>
          </p>

          <p className="contact">
            <IoGlobeOutline style={{ fontSize: "1.5rem" }} />
            <a href="https://moldcell.md">moldcell.md</a>
          </p>
        </div>

        <div className="footer-column">
          <h4>{t("footer.followUs")}</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/moldcellmoney/">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/moldcellmoney/">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com/@moldcellmoney">
              <FaTiktok />
            </a>
            <a href="https://www.youtube.com/@moldcellmoney">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Moldcell CG. {t("footer.allRights")}
      </div>
    </footer>
  );
}
