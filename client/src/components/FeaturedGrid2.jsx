import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import image3 from "../assets/grid/20250803_2042_African-Inspired Bowls_simple_compose_01k1rksj8bea8swsnc3kv4g2cc.png";
import image4 from "../assets/grid/20250803_2140_Styled Afro Stretch_remix_01k1rq3g00e5pr7008qrn7bn5e.png";

const gridItems = [
  { id: 3, image: image3, category: "Oil" },
  { id: 4, image: image4, category: "Accessory" },
];

const FeatureGrid = () => {
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!hasRevealed && window.scrollY > window.innerHeight / 3) {
        setHasRevealed(true);
      }
    };

   
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasRevealed]);

  return (
    <section
      className={`w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8 transition-opacity duration-1000 ${
        hasRevealed ? "opacity-100" : "opacity-0"
      }`}
    >
      {gridItems.map((item) => (
        <div
          key={item.id}
          className="relative w-full aspect-square flex items-center justify-center bg-white group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <img
            src={item.image}
            alt={item.category}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

         
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition">
            <div className="flex items-center justify-center h-full">
              <Link
                to={`/category/${encodeURIComponent(item.category)}`}
                className="bg-white text-black px-6 py-3 rounded font-semibold shadow-lg hover:bg-gray-200 transition"
              >
                View {item.category}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureGrid;
