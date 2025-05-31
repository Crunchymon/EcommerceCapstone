import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "../context/contextAPI";
import { useCart } from "../context/CartContext";
import {Card} from "./card"

function MainContent() {
    const {showCaseData, setShowCaseData, currentUser} = useAppContext();
    const { addToCart } = useCart();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getData() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        console.log('Fetched products:', data);
        setShowCaseData(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getData();
    }, []);

    const handleAddToCart = (item) => {
      try {
        if (!currentUser) {
          alert('Please login to add items to cart');
          return;
        }
        addToCart(item);
        setError(null);
      } catch (err) {
        setError(err.message);
        alert(err.message);
      }
    }
  
    return (
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-[#63B5C5] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to Our Store
              </h1>
              <p className="text-lg mb-6">
                Discover our collection of amazing products at great prices
              </p>
              <Link 
                href="/pages/carts" 
                className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-lg bg-white text-[#63B5C5] hover:bg-gray-50 transition-colors duration-200"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg" role="alert">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Products Section */}
          <section className="py-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Featured Products
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Explore our handpicked selection of the best products
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-10 h-10 border-4 border-[#63B5C5] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : showCaseData && showCaseData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {showCaseData.map((item, idx) => (
                  <Card 
                    key={`items${idx}`} 
                    item={item} 
                    callback={() => handleAddToCart(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">No products available</p>
              </div>
            )}
          </section>

          {/* Call to Action */}
          <section className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Shop?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Browse our collection and find the perfect items for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/pages/carts" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-[#63B5C5] text-white hover:bg-[#4A9BA8] transition-colors duration-200"
              >
                View Cart
              </Link>
              <Link 
                href="/pages/Authentication" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg border-2 border-[#63B5C5] text-[#63B5C5] hover:bg-gray-50 transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

export default MainContent;