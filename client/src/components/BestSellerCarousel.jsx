import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

const BestSellerCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const { data: responseData } = await axios.get(
          "/api/products/featured"
        );

        console.log("Best sellers API response:", responseData);
        console.log("Best sellers state:", products);

        if (!responseData || !Array.isArray(responseData)) {
          throw new Error("Invalid data format");
        }

        setProducts(responseData);
      } catch (error) {
        console.error("Failed to load best sellers", error);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Best Sellers</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center group">
                <div className="relative w-full h-80 md:h-96 overflow-hidden rounded">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={product.images?.[1]}
                    alt={`${product.name} hover`}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 font-medium mb-2">
                  €{product.price}
                </p>
                <Link
                  to={`/products/${product._id}`}
                  className="mt-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  View
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestSellerCarousel;
