import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function ProductCategory() {
  
  const { category } = useParams(); 
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErr("");

        const qs = `category=${encodeURIComponent(category)}&page=${page}&limit=12`;
        const { data } = await axios.get(`${API}/api/products?${qs}`);
        if (ignore) return;

        setProducts(data.products || []);
        setPages(data.pages || 1);
      } catch (e) {
        if (!ignore) setErr("Failed to load products.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProducts();
    return () => { ignore = true; };
  }, [category, page]);

  if (loading) return <div className="p-8">Loading…</div>;
  if (err) return <div className="p-8 text-red-600">{err}</div>;

  return (
    <div className="min-h-screen">
    
      <div className="h-48 bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">{category}</h1>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <Link to="/" className="text-blue-600 underline inline-block mb-6">
          ← Back to Home
        </Link>

        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-square bg-gray-100 rounded mb-3 overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-600">€{product.price}</p>
                <button className="mt-3 px-4 py-2 bg-black text-white rounded">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

       
        <div className="mt-6 flex items-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} / {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


