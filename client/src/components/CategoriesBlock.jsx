import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../styles/CategoriesBlock.css";
import heartIcon from "../assets/home/heart.png?w=100&format=webp&as=src";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const categories = [
  { id: 1, icon: heartIcon, labelKey: "categories.sport" },
  { id: 2, icon: heartIcon, labelKey: "categories.digital" },
  { id: 3, icon: heartIcon, labelKey: "categories.traditions" },
  { id: 4, icon: heartIcon, labelKey: "categories.nature" },
  { id: 5, icon: heartIcon, labelKey: "categories.freestyle" },
];

export default function CategoriesBlock() {
  const { t } = useTranslation();

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1.1,
      spacing: 24,
    },
    animation: {
      duration: 800,
      easing: t => t * (2 - t),
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2.2,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3.3,
          spacing: 24,
        },
      },
    },
  });

  useEffect(() => {
    const resizeHandler = () => {
      instanceRef.current?.update();
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [instanceRef]);

  return (
    <section className="categories-block">
      <div className="categories-header">
        <h2>{t("categories.title")}</h2>
        <p>{t("categories.subtitle")}</p>
      </div>

      <div className="categories-slider-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {categories.map((category) => (
            <div key={category.id} className="keen-slider__slide category-item">
              <img src={category.icon} alt="" className="category-icon" />
              <span>{t(category.labelKey)}</span>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <div className="slider-controls-box">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="slider-nav round"
              aria-label="Previous slide"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="slider-nav round"
              aria-label="Next slide"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <p className="categories-note">{t("categories.note")}</p>
    </section>
  );
}