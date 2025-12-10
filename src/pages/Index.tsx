import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Products Showcase Image */}
      <div className="w-full overflow-hidden">
        <img
          src="/assets/products-showcase.png"
          alt="Ayusya Products - Dried Fruits and Vegetables"
          className="w-full h-24 md:h-40 lg:h-48 object-cover"
        />
      </div>
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
