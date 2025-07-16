import React from "react";
import "../../styles/Loading.css";

export default function Loading({ text = "Se încarcă..." }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}