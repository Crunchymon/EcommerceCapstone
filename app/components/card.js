import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export function Card({ item }) {
  const [imageError, setImageError] = useState(false);
  const { cart, addToCart, updateQuantity } = useCart();
  const handleImageError = () => {
    console.error('Failed to load image:', item.thumbnail);
    setImageError(true);
  };

  // Find the item in the cart
  const cartItem = cart.find(cartItem => cartItem.id === item.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleQuantityChange = (newQuantity) => {
    // Prevent quantity from going below 1 (unless removing) or above stock
    if (newQuantity < 1 && newQuantity !== 0) return; // Allow 0 for removal
    if (newQuantity > item.stock) return; // Prevent exceeding stock
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-[400px] flex flex-col">
      <Link
        href={`/pages/Products/${item.id}`}
      >
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageError ? 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image' : item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
      
      {/* Stock Badge */}
      <div className="absolute top-2 right-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.stock > 10
            ? 'bg-green-100 text-green-800'
            : item.stock > 0
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
          {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
        </span>
      </div>
    </div>
          </Link>
      {/* Content */ }
  <div className="p-4 flex flex-col flex-1">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-[#63B5C5]">
        {item.category}
      </span>
      <span className="text-xl font-bold text-slate-900">
        ${item.price}
      </span>
    </div>

    <h3 className="text-lg font-semibold text-slate-900 mb-4 line-clamp-2">
      {item.title}
    </h3>

    <div className="mt-auto">
      {/* Conditional rendering based on whether the item is in the cart */}
      {currentQuantity > 0 ? (
         <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => { e.preventDefault(); handleQuantityChange(currentQuantity - 1); }}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-base font-medium">{currentQuantity}</span>
                      <button
                         onClick={(e) => { e.preventDefault(); handleQuantityChange(currentQuantity + 1); }}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <span className="text-slate-600 text-sm">
                      Total: ${(item.price * currentQuantity).toFixed(2)}
                    </span>
                  </div>
      ) : (
      <button
           onClick={(e) => { e.preventDefault(); addToCart(item); }}
        disabled={item.stock === 0}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 ${item.stock === 0
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-[#023047] text-white hover:bg-[#4A9BA8]'
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      )}
    </div>
  </div>
    </div >
  );
}
