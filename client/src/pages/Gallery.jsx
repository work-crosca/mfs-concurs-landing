import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Gallery.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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

  const [images] = useState(placeholderImages);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

  /*
  // când backend-ul e gata 
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
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
  */

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // loading din API
  // if (loading) return <div className="loading">Se încarcă...</div>;

  return (
    <>
      <HeroSection />
      <div className="gallery-filters">
        <CategoryToggle
          selected={selectedCategory}
          onChange={(val) => {
            setSelectedCategory(val);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="gallery">
        {currentImages.map((img) => (
          <ImageCard key={img._id} img={img} API_URL={API_URL} />
        ))}
      </div>

      <div className="pagination-controls">
        <span>
          Pagina {currentPage} din {totalPages}
        </span>
        <button onClick={prevPage} disabled={currentPage === 1}>
          <FaArrowLeft />
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          <FaArrowRight />
        </button>
      </div>
    </>
  );
}
