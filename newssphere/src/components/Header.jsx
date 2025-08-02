import React from 'react';
import { Globe, Menu, X } from 'lucide-react';

const Header = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">NewsSphere</h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Connecting Africa, One Headline at a Time
              </p>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#categories"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </a>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <a
                href="#home"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={onMenuToggle}
              >
                Home
              </a>
              <a
                href="#categories"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={onMenuToggle}
              >
                Categories
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={onMenuToggle}
              >
                About
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;