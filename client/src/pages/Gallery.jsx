import React, { useState, useRef, useEffect, useCallback } from "react";
import "../styles/Gallery.css";
import { useTranslation } from "react-i18next";
import ImageCard from "../components/UI/ImageCard";
import CategoryToggle from "../components/UI/CategoryToggle";
import HeroSection from "../components/HeroSection";

export default function Gallery() {
  const { t } = useTranslation();

  const placeholderImages = [
    {
      _id: "1",
      fileUrl: "https://picsum.photos/500/300?random=1",
      description: "Random 1",
      category: "sport",
      nickname: "Alex",
    },
    {
      _id: "2",
      fileUrl: "https://picsum.photos/500/300?random=2",
      description: "Random 2",
      category: "digital",
      nickname: "Maria",
    },
    {
      _id: "3",
      fileUrl: "https://picsum.photos/500/300?random=3",
      description: "Random 3",
      category: "traditions",
      nickname: "John",
    },
    {
      _id: "4",
      fileUrl: "https://picsum.photos/500/300?random=4",
      description: "Random 4",
      category: "nature",
      nickname: "Sofia",
    },
    {
      _id: "5",
      fileUrl: "https://picsum.photos/500/300?random=5",
      description: "Random 5",
      category: "freestyle",
      nickname: "Leon",
    },
    {
      _id: "6",
      fileUrl: "https://picsum.photos/500/300?random=6",
      description: "Random 6",
      category: "sport",
      nickname: "Ana",
    },
    {
      _id: "7",
      fileUrl: "https://picsum.photos/500/300?random=7",
      description: "Random 7",
      category: "digital",
      nickname: "Mihai",
    },
    {
      _id: "8",
      fileUrl: "https://picsum.photos/500/300?random=8",
      description: "Random 8",
      category: "traditions",
      nickname: "Laura",
    },
    {
      _id: "9",
      fileUrl: "https://picsum.photos/500/300?random=9",
      description: "Random 9",
      category: "nature",
      nickname: "Victor",
    },
    {
      _id: "10",
      fileUrl: "https://picsum.photos/500/300?random=10",
      description: "Random 10",
      category: "freestyle",
      nickname: "Elena",
    },
  ];

  const [images, setImages] = useState(placeholderImages);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

  /*
  // când backend-ul e gata 
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/images?category=${selectedCategory}&page=${page}&limit=6`);
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
  */

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
        if (entries[0].isIntersecting && visibleCount < filteredImages.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 3);
            setLoadingMore(false);
          }, 500); // simulăm un delay de încărcare
        }
      });
      if (node) observer.current.observe(node);
    },
    [visibleCount, filteredImages.length]
  );

  useEffect(() => {
    setVisibleCount(6); // reset la filtru
  }, [selectedCategory]);

  return (
    <div className="gallery-page">
      <HeroSection />
      <CategoryToggle
        selected={selectedCategory}
        onChange={(val) => {
          setSelectedCategory(val);
        }}
      />

      <div className="gallery">
        {currentImages.map((img, index) => {
          if (index === currentImages.length - 1) {
            return (
              <div ref={lastImageRef} key={img._id}>
                <ImageCard img={img} API_URL={API_URL} />
              </div>
            );
          } else {
            return <ImageCard key={img._id} img={img} API_URL={API_URL} />;
          }
        })}
      </div>

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
