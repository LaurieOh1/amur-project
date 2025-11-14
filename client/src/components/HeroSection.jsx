import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/gridBackground/20250610_1037_Elegant Portrait Silhouette_remix_01jxcfpjqwemxvznh38j7j0amg.png";
import "../components/styleComponent/HeroSection.css";

const HeroSection = () => {
  // Fallback parallax for mobile where background-attachment: fixed is buggy
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero-parallax">
      {/* Background layer */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${heroImage})`,
          // Mobile fallback: move bg slightly with scroll (parallax feel)
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      />

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="text-center max-w-xl px-6 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Celebrate Every Curl
          </h1>
          <p className="text-lg md:text-xl text-white">
            Amur brings you premium hair care tailored for Afro-textured beauty —
            clean, nourishing, and made with intention.
          </p>
          <Link
            to="/products"
            className="inline-block mt-2 px-6 py-3 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition"
          >
            Shop Our Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;