"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/contextAPI';
import { useRouter } from 'next/navigation';

function Header() {
    const { currentUser, setCurrentUser } = useAppContext();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        setCurrentUser(null);
        router.push('/pages/Authentication');
    };

    return (
        <header className="bg-[#023047] text-white shadow-md">
            <nav className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-3xl font-bold text-white tracking-tight">LoopCart</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className="text-white hover:text-gray-200 transition-all duration-200 font-medium text-lg hover:scale-105 transform"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/pages/Products" 
                            className="text-white hover:text-gray-200 transition-all duration-200 font-medium text-lg hover:scale-105 transform"
                        >
                            Products
                        </Link>
                        {currentUser ? (
                            <>
                                <Link 
                                    href="/pages/carts" 
                                    className="text-white hover:text-gray-200 transition-all duration-200 font-medium text-lg hover:scale-105 transform"
                                >
                                    Cart
                                </Link>
                                <Link 
                                    href="/pages/Dashboard" 
                                    className="text-white hover:text-gray-200 transition-all duration-200 font-medium text-lg hover:scale-105 transform"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/pages/Accounts"
                                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full text-[#023047] text-xl font-bold hover:bg-gray-100 transition-all duration-200"
                                >
                                    {currentUser.firstName[0]}{currentUser.lastName[0]}
                                </Link>
                            </>
                        ) : (
                            <Link 
                                href="/pages/Authentication" 
                                className="text-white hover:text-gray-200 transition-all duration-200 font-medium text-lg hover:scale-105 transform"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link
                                href="/"
                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-[#012235] transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/pages/Products"
                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-[#012235] transition-all duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Products
                            </Link>
                            {currentUser ? (
                                <>
                                    <Link
                                        href="/pages/Cart"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-[#012235] transition-all duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Cart
                                    </Link>
                                    <Link
                                        href="/pages/Dashboard"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-[#012235] transition-all duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/pages/Accounts"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-[#012235] transition-all duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Account
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href="/pages/Authentication"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200 hover:bg-[#012235] transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;  