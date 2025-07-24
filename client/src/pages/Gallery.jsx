import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Gallery.css";
import { useTranslation } from "react-i18next";
import ImageCard from "../components/UI/ImageCard";
import CategoryToggle from "../components/UI/CategoryToggle";
import HeroSection from "../components/HeroSection";

export default function Gallery() {
  const { t } = useTranslation();

  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const categoryParam =
          selectedCategory === "all" ? "" : `?category=${selectedCategory}`;
        const res = await fetch(`${API_URL}/api/images${categoryParam}`);
        const data = await res.json();

        setImages(Array.isArray(data.uploads) ? data.uploads : []);
      } catch (err) {
        console.error("Eroare la încărcarea imaginilor:", err);
        setImages([]);
      } finally {
        setLoading(false);
        setVisibleCount(6);
      }
    };

    fetchImages();
  }, [API_URL, selectedCategory]);

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const currentImages = filteredImages.slice(0, visibleCount);

  const observer = useRef();

  const lastImageRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          visibleCount < filteredImages.length
        ) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 3);
            setLoadingMore(false);
          }, 500);
        }
      });
      if (node) observer.current.observe(node);
    },
    [visibleCount, filteredImages.length]
  );

  return (
    <div className="gallery-page">
      <HeroSection />

      <CategoryToggle
        selected={selectedCategory}
        onChange={(val) => setSelectedCategory(val)}
      />

      {loading ? (
        <div className="loading-more">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : (
        <div className="gallery">
          {currentImages.map((img, index) => {
            const imgUrl = img.fileUrl.startsWith("http")
              ? img.fileUrl
              : `${API_URL}${img.fileUrl}`;

            if (index === currentImages.length - 1) {
              return (
                <div ref={lastImageRef} key={img._id}>
                  <ImageCard img={{ ...img, fileUrl: imgUrl }} />
                </div>
              );
            } else {
              return (
                <ImageCard
                  key={img._id}
                  img={{ ...img, fileUrl: imgUrl }}
                />
              );
            }
          })}
        </div>
      )}

      {!loading && filteredImages.length === 0 && (
        <div className="no-images">{t("gallery.noImages")}</div>
      )}

      {loadingMore && (
        <div className="loading-more">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
    </div>
  );
}