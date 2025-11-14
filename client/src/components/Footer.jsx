import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand / Blurb */}
        <div>
          <h3 className="text-xl font-semibold">Amur</h3>
          <p className="mt-3 text-sm text-gray-300">
            Premium Afro hair care—crafted with intention for every curl, coil, and kink.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </div>

        {/* Legal / Social */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
            More
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
        <p>© {year} LaurieOh. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">
          Made with ♥ for healthy curls.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
