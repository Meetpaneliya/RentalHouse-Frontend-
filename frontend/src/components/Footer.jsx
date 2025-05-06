import React from "react";
import { Link } from "react-router-dom";
import { FaDiscord, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left - Brand */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">Cozzi Roam</h2>
          <p className="mb-4">Comfy Rentals, Just Like Home.</p>
          <div className="flex items-center space-x-4">
            <FaDiscord className="text-2xl hover:text-gray-400 cursor-pointer" />
            <FaLinkedin className="text-2xl hover:text-gray-400 cursor-pointer" />
            <FaXTwitter className="text-2xl hover:text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faq">FAQ's</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Stay updated with the latest news and features from CollabClan.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter"
              className="p-2 rounded-l-md text-black w-full"
            />
            <button className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Contact */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm">cozziroam@gmail.com</p>
          <p className="text-sm mt-2">Boston, USA</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-4">
        © 2025 Cozzi Roam. All rights reserved. |
        <span className="mx-2 cursor-pointer hover:underline">Privacy Policy</span>|
        <span className="mx-2 cursor-pointer hover:underline">Terms of Service</span>
      </div>
    </footer>
  );
};

export default Footer;