import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Gallery.css';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_APP_API_URL 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/images`);
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error('Eroare la încărcarea imaginilor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [API_URL]);

  if (loading) return <div className="loading">Se încarcă...</div>;

  return (
    <div className="gallery">
      {images.map(img => (
        <Link to={`/image/${img._id}`} key={img._id}>
          <div className="image-card">
            <img src={`${API_URL}${img.fileUrl}`} alt={img.description} />
          </div>
        </Link>
      ))}
    </div>
  );
}