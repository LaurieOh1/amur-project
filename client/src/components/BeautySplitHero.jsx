import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/homepage/hero-beauty.png";
import image2 from "../assets/homepage/20251113_2228_Haircare Product Display_remix_01k9zhv6f9f6m9yj1n5g4e15tx.png";
import image3 from "../assets/homepage/20251113_2234_Amur Haircare Collection Display_remix_01k9zj5ydhfb5s8cnm8yv3htnr.png";


export default function BeautySplitHero({
  title = "Amur Hair Beauty",
  taglines = ["Inspired By Tchad Hair care.", "Formulated For You."],
  rightImage = image1,
  features = [
    {
      title: "What can be found in our products?",
      content:
        "Discover the power of our signature ingredients and reveal your hair’s natural beauty.",
      linkText: "LEARN MORE",
      linkTo: "/ingredients",
    },
    {
      title: "TAKE THE HAIR QUIZ",
      content: "Find a routine tailored to your hair’s current needs.",
      linkText: "START QUIZ",
      linkTo: "/quiz",
    },
  ],
  articles = [
    {
      image: image2,
      title:
        "Libby King introduces Our Signature Nourishing Hair Oil",
      linkText: "READ MORE",
      to: "/story/libby-king",
    },
    {
      image: image3,
      title: "The Simplest Guide to Double Cleansing",
      linkText: "READ MORE",
      to: "/guide/double-cleansing",
    },
  ],
  bg = "bg-gray-50",
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      <div className={`${bg} px-6 sm:px-10 lg:px-14 py-10 lg:py-14`}>
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl tracking-wide font-semibold">
            {title}
          </h1>

          <div className="mt-4 space-y-1 text-gray-700">
            {taglines.map((line, i) => (
              <p key={i} className="text-lg">
                {line}
              </p>
            ))}
          </div>

      
          <hr className="my-6 border-gray-200" />

         
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {features.map((f, i) => {
              const open = openIndex === i;
              return (
                <div key={i} className="py-4">
                  <button
                    className="w-full flex items-center justify-between text-left"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    aria-expanded={open}
                  >
                    <span className="flex items-center gap-3 font-medium">
                   
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border">
                        {i === 0 ? "🌿" : "♡"}
                      </span>
                      {f.title}
                    </span>
                    <span className="text-xl leading-none">{open ? "−" : "+"}</span>
                  </button>

                  {open && (
                    <div className="mt-3 pl-9 text-gray-700">
                      <p>{f.content}</p>
                      {f.linkText && (
                        <Link
                          to={f.linkTo || "#"}
                          className="inline-block mt-2 underline font-medium"
                        >
                          {f.linkText}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

         
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {articles.map((a, idx) => (
              <article key={idx} className="group">
                <div className="aspect-[4/3] w-full overflow-hidden rounded bg-gray-100">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-3 font-semibold leading-snug">
                  {a.title}
                </h3>
                <Link
                  to={a.to}
                  className="mt-1 inline-block underline text-sm"
                >
                  {a.linkText}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

    
      <div className="relative min-h-[60vh] lg:min-h-screen">
        <img
          src={rightImage}
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      </div>
    </section>
  );
}
