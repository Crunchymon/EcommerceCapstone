import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "../context/contextAPI";

function Header() {
    const { data, setData, showCaseData, setShowCaseData, currentUser, setCurrentUser } = useAppContext();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        setShowCaseData((prevData) =>
            prevData.filter((item) =>
                (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        )
    };

    useEffect(() => {
        if (searchQuery === "") {
            setShowCaseData(data);
        } else {
            handleSearch();
        }
    }, [searchQuery]);

    return (
        <header className="bg-[#63B5C5] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between py-4">
                    {/* Logo and Navigation */}
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src="/HomePage/01_Logo.png"
                                alt="Logo"
                                className="h-10 w-10"
                            />
                            <span className="text-xl font-bold">Store</span>
                        </Link>
                        <nav className="hidden sm:flex space-x-6">
                            <Link 
                                href="/pages/carts" 
                                className="text-white hover:text-gray-100 transition-colors duration-200"
                            >
                                Cart
                            </Link>
                            <Link 
                                href="/pages/Accounts" 
                                className="text-white hover:text-gray-100 transition-colors duration-200"
                            >
                                Account
                            </Link>
                            <Link 
                                href="/dashboard" 
                                className="text-white hover:text-gray-100 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        </nav>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full sm:w-auto mt-4 sm:mt-0">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-96 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all duration-200"
                            />
                            <svg 
                                className="absolute right-3 top-2.5 h-5 w-5 text-white/70" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        {currentUser ? (
                            <>
                                <span className="text-white/90">Welcome, {currentUser.username}!</span>
                                <button 
                                    onClick={() => setCurrentUser(null)}
                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/pages/Authentication">
                                <button className="px-4 py-2 rounded-lg bg-white text-[#63B5C5] hover:bg-gray-100 transition-colors duration-200">
                                    Login / Signup
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;  