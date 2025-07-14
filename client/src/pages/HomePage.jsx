import React from "react";
import HeroSection from "../components/HeroSection";
import AboutCardSection from "../components/AboutCardSection";
import FAQ from "../components/FAQ";
import "../styles/HomePage.css";
import VotingBlock from "../components/VotingBlock";
import CategoriesBlock from "../components/CategoriesBlock";
import AwardBlock from "../components/AwardsBlock";
import Apply from "../components/Apply";
import EndDate from "../components/EndDate";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <EndDate />
      <CategoriesBlock />
      <AwardBlock />
      <VotingBlock />
      <AboutCardSection />
      <Apply />
      <FAQ />
    </div>
  );
};

export default HomePage;
