import React from "react";
import { Link } from "react-router-dom";
import constructionImg from "../assets/underConstruction/underConstruction.png"; 


export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center animate-fadeIn">

      <div className="max-w-md bg-white p-8 shadow-lg rounded-xl border border-gray-200">

        <img
          src={constructionImg}
          alt="Under Construction"
          className="w-full h-48 object-cover rounded-md mb-4"
        />

        <h1 className="text-2xl font-semibold mb-2">
          This page is still under construction
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          We’re working hard behind the scenes to bring you something amazing.
          Please check back soon!
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
