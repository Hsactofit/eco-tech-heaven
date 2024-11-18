import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, ShoppingCart, User, Heart } from 'lucide-react';

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [opacity, setOpacity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 300, 0.95);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = "flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 no-underline";

  return (
    <div>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300"
        style={{ opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200 no-underline"
              >
                Technology Heaven
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link to="/" className={linkClass}>
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <Link to="/shop" className={linkClass}>
                <ShoppingCart className="w-4 h-4 mr-1" />
                Shop
              </Link>
              <Link to="/cart" className={linkClass}>
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {cartList?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartList.length}
                    </span>
                  )}
                </div>
                Cart
              </Link>
              <Link to="/" className={linkClass}>
                <Heart className="w-4 h-4 mr-1" />
                WishList
              </Link>
              <Link to="/" className={linkClass}>
                <User className="w-4 h-4 mr-1" />
                Profile
              </Link>
              
              {/* Authentication Buttons */}
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  Login
                </button>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  Register
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <Link to="/" className={`${linkClass} py-2`}>
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link to="/shop" className={`${linkClass} py-2`}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Shop
                </Link>
                <Link to="/cart" className={`${linkClass} py-2`}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </Link>
                <Link to="/" className={`${linkClass} py-2`}>
                  <Heart className="w-4 h-4 mr-2" />
                  WishList
                </Link>
                <Link to="/" className={`${linkClass} py-2`}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
                <hr className="my-4" />
                <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200 py-2">
                  Login
                </button>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;