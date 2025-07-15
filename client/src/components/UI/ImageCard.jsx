import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/ImageCard.css";
import { BsFillHeartFill } from "react-icons/bs";
import overlayDark from "../../assets/shablon/VISA-shablon-dark.png";
import overlayLight from "../../assets/shablon/VISA-shablon-light.png";

export default function ImageCard({ img, API_URL }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="image-card-wrapper">
      <Link to={`/image/${img._id}`}>
        <div className="image-card">
          <div className="image-card-container">
            <img
              src={
                img.fileUrl.startsWith("http")
                  ? img.fileUrl
                  : `${API_URL}${img.fileUrl}`
              }
              alt={img.description}
            />
            <img
              src={darkMode ? overlayDark : overlayLight}
              alt="Overlay"
              className="overlay-preview"
            />
          </div>
        </div>
      </Link>

      <div className="card-controls">
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
        <div className="like-count">
          <BsFillHeartFill
            style={{ fontSize: "1.5rem", color: "var(--light-purple)" }}
          />
          {img.likesCount || 0}
        </div>
      </div>
    </div>
  );
}