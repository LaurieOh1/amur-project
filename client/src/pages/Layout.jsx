import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBagShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Layout.css";
import { useCart } from "../Context/CartContext.jsx";
import Footer from "../components/Footer";
import Logo from "../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Layout() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    setShowSearch(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/90 backdrop-blur text-white px-6 py-4 shadow-md">
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-gray-300">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-gray-300">
              Shop
            </Link>
          </li>
        </ul>

        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1 h-0 flex items-center justify-center">
          <Link to="/" aria-label="Home" className="block">
            <img
              src={Logo}
              alt="Brand logo"
              className="h-24 w-auto object-contain drop-shadow-lg"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <form
            onSubmit={onSearchSubmit}
            className="flex items-center space-x-2"
          >
            <button
              type="button"
              onClick={() => setShowSearch((v) => !v)}
              className="hover:text-gray-300"
              aria-label="Toggle search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
            {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 p-1 rounded border border-gray-300 text-black text-sm focus:outline-none focus:border-gray-500"
              />
            )}
          </form>

          <Link
            to="/cart"
            className="relative hover:text-gray-300"
            aria-label="Cart"
          >
            <FontAwesomeIcon icon={faBagShopping} size="lg" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {count}
              </span>
            )}
          </Link>

          <Link
            to={user ? "/profile" : "/register"} 
            className="hover:text-gray-300"
            aria-label="Account"
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Link>
        </div>
      </nav>

      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
