import React from "react";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";

function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <ServicesSection />
    </div>
  );
}

export default Home;