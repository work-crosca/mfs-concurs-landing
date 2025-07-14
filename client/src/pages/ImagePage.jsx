import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ImagePage.css';

export default function ImagePage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // API URL din .env cu fallback
  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API_URL}/api/images/${id}`);
        if (!res.ok) throw new Error("Imaginea nu a fost găsită.");
        const data = await res.json();
        setImage(data);
      } catch (err) {
        console.error("Eroare la încărcarea imaginii:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id, API_URL]);

  if (loading) return <div className="loading">Se încarcă...</div>;
  if (!image) return <div className="loading">Imaginea nu a fost găsită.</div>;

  return (
    <div className="image-page">
      <img
        src={`${API_URL}${image.fileUrl}`}
        alt={image.description}
        className="big-image"
      />
      <div className="info">
        <p><strong>Autor:</strong> {image.nickname}</p>
        <p><strong>Categorie:</strong> {image.category}</p>
        <p><strong>Data:</strong> {new Date(image.createdAt).toLocaleDateString()}</p>
        <p><strong>Descriere:</strong> {image.description}</p>
        <p><strong>Like-uri:</strong> {image.likesCount || 0}</p>
        <Link to="/gallery">Înapoi la galerie</Link>
      </div>
    </div>
  );
}