import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/grid/20250803_1910_Afro Hair Care_remix_01k1rehfdfe9dssbch9z2pdxe4.png";
import image2 from "../assets/grid/20250803_2008_Smiling with Hair Products_remix_01k1rhvqjge2frebpprjx0ygnx.png";

const gridItems = [
  { id: 1, image: image1, category: "Shampoo" },
  { id: 2, image: image2, category: "Conditioner" },
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
