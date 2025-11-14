import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const searchQuery =
    new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get("/api/products", {
          params: {
            search: searchQuery || undefined,
          },
        });

        console.log("API returned:", data);

        // 👇 Make sure we always store an array
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchAllProducts();
  }, [searchQuery]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center">
        {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
      </h1>

      {searchQuery && (
        <p className="text-center text-gray-600 mb-6">
          Showing products matching your search.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow rounded p-4 group">
            <div className="relative w-full h-100 overflow-hidden rounded">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src={product.images?.[1]}
                alt={`${product.name} hover`}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700 mb-2">€{product.price}</p>
            <Link
              to={`/products/${product._id}`}
              className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProductsPage;
