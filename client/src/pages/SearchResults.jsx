import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!query) return;

    const load = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products?search=${query}`
      );
      setProducts(res.data);
    };

    load();
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-gray-600">{query}</span>
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="border rounded p-4">
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-full h-48 object-cover mb-3"
              />
              <h2 className="font-semibold">{p.name}</h2>
              <p>{p.price} €</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
