import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoHome } from "react-icons/io5";
import overlayDark from "../assets/shablon/VISA-shablon-dark.png";
import overlayLight from "../assets/shablon/VISA-shablon-light.png";
import "../styles/ImagePage.css";
import Loading from "../components/UI/Loading";
import LikeButton from "../components/UI/LikeButton";
import OtpModal from "../components/UI/OtpModal";
import EmailModal from "../components/UI/EmailModal";

export default function ImagePage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [email, setEmail] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [pendingLike, setPendingLike] = useState(null);
  const [toast, setToast] = useState(null);

  const getLangId = () => (i18n.language === "ru" ? 2 : 1);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API_URL}/api/images/${id}`);
        const data = await res.json();
        setImage(data);
        setLiked(data.hasLiked || false);
        setLikesCount(data.likesCount || 0);
      } catch (err) {
        console.error("Eroare la fetch imagine:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id, API_URL]);

  const handleRequestOtp = (like) => {
    setPendingLike(like);
    setEmailModalVisible(true);
  };

  const handleEmailSubmit = async (submittedEmail) => {
    try {
      setOtpLoading(true);
      const res = await fetch(`${API_URL}/api/otp/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submittedEmail, langId: getLangId() }),
      });

      const data = await res.json();
      if (data.success) {
        setEmail(submittedEmail);
        setOtpModalVisible(true);
        setEmailModalVisible(false);
        setToast({ type: "success", message: "OTP trimis pe email!" });
      } else {
        setToast({
          type: "error",
          message: data.message || "Eroare la trimitere OTP.",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Eroare de rețea la OTP." });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleConfirmOtp = async (code) => {
    try {
      setOtpLoading(true);
      const verifyRes = await fetch(`${API_URL}/api/otp/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        setToast({
          type: "error",
          message: verifyData.message || "Cod OTP invalid.",
        });
        return;
      }

      const method = pendingLike ? "POST" : "DELETE";
      const likeRes = await fetch(`${API_URL}/api/likes`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploadId: id, userId: email }),
      });

      const likeData = await likeRes.json();

      if (likeRes.ok && likeData.likesCount !== undefined) {
        setLiked(pendingLike);
        setLikesCount(likeData.likesCount);
        setToast({
          type: "success",
          message: pendingLike ? "Like înregistrat!" : "Like anulat.",
        });
        setOtpModalVisible(false);
        setOtpCode("");
      } else {
        setToast({
          type: "error",
          message: likeData.message || "Eroare la salvarea like.",
        });
      }
    } catch (err) {
      console.error("Eroare la confirmare OTP:", err);
      setToast({ type: "error", message: "Eroare de rețea." });
    } finally {
      setOtpLoading(false);
    }
  };

  if (loading) return <Loading text={t("imagePage.loading")} />;
  if (!image) return <Loading text={t("imagePage.notFound")} />;

  return (
    <div className="image-page">
      <div className="breadcrumb">
        <Link to="/">
          <IoHome />
        </Link>
        <span> / </span>
        <Link to="/gallery">{t("imagePage.backToGallery")}</Link>
      </div>

      <div className="image-card">
        <div className="image-card-container">
          <img src={image.fileUrl} alt={image.description} />
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
          likesCount={likesCount}
          isAuthenticated={true}
          onToggle={() => handleRequestOtp(!liked)}
        />
      </div>

      <div className="info-box">
        <div className="info-meta">
          <span>
            <strong>{t("imagePage.author")}:</strong> {image.nickname}
          </span>
          <span>
            <strong>{t("imagePage.category")}:</strong> {image.category}
          </span>
          <span>
            <strong>{t("imagePage.date")}:</strong>{" "}
            {new Date(image.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p>
          <strong>{t("imagePage.description")}:</strong> {image.description}
        </p>
      </div>

      {/* === Modal Email + OTP === */}
      {emailModalVisible && (
        <EmailModal
          visible={emailModalVisible}
          onSubmit={handleEmailSubmit}
          onClose={() => setEmailModalVisible(false)}
          loading={otpLoading}
        />
      )}

      {otpModalVisible && (
        <OtpModal
          visible={otpModalVisible}
          email={email}
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          onConfirm={handleConfirmOtp}
          loading={otpLoading}
          onClose={() => setOtpModalVisible(false)}
        />
      )}

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}
