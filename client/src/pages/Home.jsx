import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AiTools from "../components/AiTools";
import Testimonial from "../components/Testimonial";
import Plan from "../components/Plan";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AiTools />
      <Testimonial />
      <Plan/>
      <Footer/>
    </div>
  );
};

export default Home;
