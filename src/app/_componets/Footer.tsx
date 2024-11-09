import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // Importing icons from lucide-react

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white h-[80px] max-h-[80px] md:max-h-[120px] flex items-center min-w-[300px]">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center text-center md:text-left w-full overflow-hidden">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <p className="text-red-600 font-extrabold text-sm md:text-base border border-red-600 px-1">
              SMILE-
            </p>
            <p className="bg-red-600 text-white px-1 font-extrabold text-sm md:text-base">
              FOOD
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 items-center">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 text-white hover:text-blue-500" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 text-white hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 text-white hover:text-pink-500" />
          </a>
        </div>

        {/* Year */}
        <div className="text-xs text-center">
          &copy; {new Date().getFullYear()} Smile Food Delivery
        </div>
      </div>
    </footer>
  );
};

export default Footer;
