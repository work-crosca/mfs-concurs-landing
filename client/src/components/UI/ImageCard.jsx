import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ImageCard.css";
import { FaUser } from "react-icons/fa";

export default function ImageCard({ img, API_URL }) {
  return (
    <div className="image-card">
      <Link to={`/image/${img._id}`}>
        <img
          src={
            img.fileUrl.startsWith("http")
              ? img.fileUrl
              : `${API_URL}${img.fileUrl}`
          }
          alt={img.description}
        />
      </Link>
      <div className="card-info">
        <div className="card-author">
          <FaUser style={{ marginRight: "0.4rem" }} />
          {img.nickname || "Anonim"}
        </div>
        <div className="card-description">{img.description}</div>
      </div>
    </div>
  );
}
