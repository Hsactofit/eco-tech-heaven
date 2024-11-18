import React, {useEffect, useState} from "react";

import "./navbar.css";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const NavBar = () => {
        const {cartList} = useSelector((state) => state.cart);
        const [opacity, setOpacity] = React.useState(1);
        const [isOpen, setIsOpen] = React.useState(false);

        React.useEffect(() => {
            const handleScroll = () => {
                const scrollY = window.scrollY;
                const newOpacity = Math.max(1 - scrollY / 300, 1);
                setOpacity(newOpacity);
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        return (
            <div>
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white shadow"
                     style={{
                         opacity
                     }}>
                    <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-gray-800">
                            <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
                            Technology Heaven
                            </Link>
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }} className="text-gray-600 hover:text-gray-800 hover:opacity-100">Home</Link>
                            <Link to={"/shop"} style={{ textDecoration: 'none', color: 'inherit' }}  className="text-gray-600 hover:text-gray-800 hover:opacity-100">Shop</Link>
                            <Link to={"/cart"} style={{ textDecoration: 'none', color: 'inherit' }}  className="text-gray-600 hover:text-gray-800 hover:opacity-100">Cart</Link>
                            <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}  className="text-gray-600 hover:text-gray-800 hover:opacity-100">Profile</Link>
                            <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}  className="text-gray-600 hover:text-gray-800 hover:opacity-100">WishList</Link>
                            <button
                                className="px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 hover:opacity-100">SIGN
                                IN
                            </button>
                        </div>
                        <button className="block md:hidden" onClick={() => setIsOpen(true)}>
                            <i className="fas fa-bars text-gray-800"></i>
                        </button>
                    </div>
                </nav>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-gray-800">Menu</span>
                                <button onClick={() => setIsOpen(false)}>
                                    <i className="fas fa-times text-gray-800"></i>
                                </button>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <a href="#" className="text-gray-600 hover:text-gray-800 hover:opacity-100">Pages</a>
                                <a href="#" className="text-gray-600 hover:text-gray-800 hover:opacity-100">Account</a>
                                <a href="#" className="text-gray-600 hover:text-gray-800 hover:opacity-100">Blocks</a>
                                <a href="#" className="text-gray-600 hover:text-gray-800 hover:opacity-100">Docs</a>
                                <a href="#" className="text-gray-600 hover:text-gray-800 hover:opacity-100">LOG IN</a>
                                <button
                                    className="px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 hover:opacity-100">SIGN
                                    IN
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
;

export default NavBar;
