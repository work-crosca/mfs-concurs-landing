import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoHome } from "react-icons/io5";
import overlayDark from "../assets/shablon/VISA-shablon-dark.png";
import overlayLight from "../assets/shablon/VISA-shablon-light.png";
import "../styles/ImagePage.css";
import Loading from "../components/UI/Loading";
import LikeButton from "../components/UI/LikeButton";

export default function ImagePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [liked, setLiked] = useState(false);
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API_URL}/api/images/${id}`);
        if (!res.ok) throw new Error("Imaginea nu a fost găsită.");
        const data = await res.json();
        setImage(data);
      } catch (err) {
        console.error("Eroare la încărcarea imaginii din API:", err);
        setImage({
          fileUrl: "/uploads/test.png",
          nickname: "Corneliu (mock)",
          category: "Freestyle",
          createdAt: new Date().toISOString(),
          description: "Aceasta este o descriere de fallback.",
          likesCount: 42,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id, API_URL]);

  useEffect(() => {
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  if (loading) return <Loading text={t("imagePage.loading")} />;
  if (!image) return <Loading text={t("imagePage.notFound")} />;

  return (
    <div className="image-page">
      <div className="breadcrumb">
        <Link to="/"><IoHome /></Link>
        <span> / </span>
        <Link to="/gallery">{t("imagePage.backToGallery")}</Link>
      </div>

      <div className="image-card">
        <div className="image-card-container">
          <img
            src={
              image.fileUrl.startsWith("/uploads")
                ? image.fileUrl
                : `${API_URL}${image.fileUrl}`
            }
            alt={image.description}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/uploads/test.jpg";
            }}
          />
          <img
            src={darkMode ? overlayDark : overlayLight}
            alt="Overlay"
            className="overlay-preview"
          />
        </div>
      </div>

      <div className="controls-bar">
        <div className="toggle-mode">
          <label className="switch">
            <input
              type="checkbox"
              checked={!darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
          <span>{darkMode ? "Preview dark" : "Preview light"}</span>
        </div>
        <LikeButton
          liked={liked}
          likesCount={liked ? image.likesCount + 1 : image.likesCount}
          onToggle={() => setLiked(!liked)}
        />
      </div>

      <div className="info-box">
        <div className="info-meta">
          <span><strong>{t("imagePage.author")}:</strong> {image.nickname}</span>
          <span><strong>{t("imagePage.category")}:</strong> {image.category}</span>
          <span><strong>{t("imagePage.date")}:</strong> {new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        <p>
          <strong>{t("imagePage.description")}:</strong> {image.description}
        </p>
      </div>
    </div>
  );
}