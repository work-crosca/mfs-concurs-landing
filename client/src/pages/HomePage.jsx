import React from "react";
import HeroSection from "../components/HeroSection";
import AboutCardSection from "../components/AboutCardSection";
import FAQ from "../components/FAQ";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />

      <AboutCardSection />
      <FAQ />
      {/* aici poți pune și alte componente, ex: Features, Testimonials, etc */}
    </div>
  );
};

export default HomePage;
