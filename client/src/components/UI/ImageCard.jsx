import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ImageCard.css";
import { FaUser } from "react-icons/fa";

export default function ImageCard({ img, API_URL }) {
  return (
    <Link to={`/image/${img._id}`}>
      <div className="image-card">
        <img
          src={
            img.fileUrl.startsWith("http")
              ? img.fileUrl
              : `${API_URL}${img.fileUrl}`
          }
          alt={img.description}
        />
        <div className="author-overlay">
          <FaUser />
          {img.nickname || "Anonim"}
        </div>
      </div>
    </Link>
  );
}
