"use client"
import React from "react";
import Link from "next/link";
import { useAppContext } from "../context/contextAPI";

function Header() {
    const { currentUser, setCurrentUser } = useAppContext();

    return (
        <header className="bg-[#023047] text-white shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-4">
                {/* Logo and Navigation */}
                <div className="flex items-center space-x-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-white rounded flex items-center">
                            <img
                                src="/HomePage/01_Logo.png"
                                alt="Logo"
                                className="h-15 w-17"
                            />
                        </div>
                    </Link>
                    <nav className="hidden sm:flex space-x-6">
                        <Link
                            href="/pages/Products"
                            className="text-white hover:text-gray-100 transition-colors duration-200"
                        >
                            Products
                        </Link>
                        <Link
                            href="/pages/carts"
                            className="text-white hover:text-gray-100 transition-colors duration-200"
                        >
                            Cart
                        </Link>

                        <Link
                            href="/pages/Dashboard"
                            className="text-white hover:text-gray-100 transition-colors duration-200"
                        >
                            Dashboard
                        </Link>
                    </nav>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    {currentUser ? (
                        <>
                            <Link
                                href="/pages/Accounts"
                                className="text-white hover:text-gray-100 transition-colors duration-200"
                            >
                                <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center text-[#023047] text-3xl font-bold">
                                    {currentUser.firstName[0]}{currentUser.lastName[0]}
                                </div>
                            </Link>


                        </>
                    ) : (
                        <Link href="/pages/Authentication">
                            <button className="px-4 py-2 rounded-lg bg-white text-[#023047] hover:bg-gray-100 transition-colors duration-200">
                                Login / Signup
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;  