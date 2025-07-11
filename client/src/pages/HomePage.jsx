import React from "react";
import HeroSection from "../components/HeroSection";
import AboutCardSection from "../components/AboutCardSection";
import FAQ from "../components/FAQ";
import "../styles/HomePage.css";
import VotingBlock from "../components/VotingBlock";
import CategoriesBlock from "../components/CategoriesBlock";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <CategoriesBlock />
      <AboutCardSection />
      <VotingBlock />
      <FAQ />
    </div>
  );
};

export default HomePage;
