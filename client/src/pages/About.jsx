import React from "react";
import windowProducts from "../assets/gridBackground/window_products.png";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 border-b pb-2">About Amur</h1>

        {/* Image Section */}
        <div className="mb-8">
          <img
            src={windowProducts}
            alt="Afro Hair Care"
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        <p className="text-lg leading-7 mb-6">
          Welcome to <strong>Amur</strong>, your go-to destination for premium
          Afro hair care products. Our mission is to empower and celebrate the
          beauty of natural textures by offering high-quality, effective, and
          nourishing solutions.
        </p>

        <p className="text-lg leading-7 mb-6">
          We believe hair care is more than just routine — it's a form of
          self-love. That’s why we source only the finest ingredients that work
          in harmony with curls, coils, and kinks. Whether you're looking for
          hydration, definition, or protection, Amur has you covered.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why Choose Amur?</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>🌿 Naturally inspired, ethically formulated</li>
          <li>🧖🏽‍♀️ Tailored for textured hair needs</li>
          <li>📦 Fast delivery and secure checkout</li>
          <li>💬 Expert advice and tips available 24/7</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Story</h2>
        <p className="text-lg leading-7">
          Founded by a team of passionate individuals with deep roots in the
          Afro hair care community, Amur was born out of a need for
          transparency, quality, and love in hair products. From our first
          shampoo to our latest scalp serum, we are committed to products that
          work and respect the diversity of your crown.
        </p>

        <div className="mt-12 bg-gray-100 p-6 rounded-xl shadow-sm">
          <p className="text-center text-xl font-medium">
            Thank you for being a part of the Amur family. Your hair journey is
            our inspiration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
