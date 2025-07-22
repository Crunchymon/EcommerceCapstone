import React from "react"
import Link from "next/link";
import { useAppContext } from '../context/contextAPI';

function Footer() {
  const { currentUser } = useAppContext();
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Mission */}
          <div className="text-center">
            <Link href="/" className="flex items-center justify-center mb-2">
              <span className="text-2xl font-bold tracking-tight text-white">LoopCart</span>
            </Link>
            <p className="text-gray-300 text-sm mt-2 max-w-xs mx-auto">
              Our goal is to provide our customers the best possible products and service.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Navigation</h3>
            <nav aria-label="Footer Navigation" className="flex justify-center">
              <ul className="flex flex-col gap-2 text-gray-300 text-left  w-1/4">
                <li>
                  <Link href="/" className="hover:text-gray-200 transition-colors">Home</Link>
                </li>
                <li>
                  <Link href="/pages/Products" className="hover:text-gray-100 transition-colors">Products</Link>
                </li>
                {currentUser ? (
                  <>
                    <li>
                      <Link href="/pages/carts" className="hover:text-gray-100 transition-colors">Cart</Link>
                    </li>
                    <li>
                      <Link href="/pages/Dashboard" className="hover:text-gray-100 transition-colors">Dashboard</Link>
                    </li>
                    <li>
                      <Link href="/pages/Accounts" className="hover:text-gray-100 transition-colors">Accounts</Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/pages/Authentication" className="hover:text-gray-100 transition-colors">Login</Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Legal & Social */}
          <div className="text-center flex flex-col gap-2">
            <h3 className="font-semibold text-lg mb-2">Legal</h3>
            <p className="text-gray-400 text-sm">© 2025 LoopCart. All rights reserved.</p>
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
              <div className="flex justify-center gap-4">
                {/* Placeholder social icons */}
                <a href="#" aria-label="Twitter" className="hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89-.385.104-.79.16-1.208.16-.295 0-.582-.028-.862-.08.583 1.816 2.277 3.137 4.287 3.173A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg>
                </a>
                <a href="#" aria-label="GitHub" className="hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;