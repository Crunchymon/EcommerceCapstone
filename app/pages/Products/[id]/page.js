"use client"
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/app/context/contextAPI';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

function ProductPage({ params }) {
  const { currentUser } = useAppContext();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#023047]"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
            <p className="text-slate-600">The product you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (!currentUser) {
      // Redirect to login or show login modal
      return;
    }
    addToCart(product);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Product Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-[#023047]' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
                  <p className="text-slate-600 mt-2">{product.brand}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    {product.discountPercentage > 0 ? (
                      <>
                        <span className="text-lg text-slate-500 line-through">
                          ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                        </span>
                        <span className="text-2xl font-bold text-slate-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-red-600 font-medium">
                          Save ${(product.price * (product.discountPercentage / 100)).toFixed(2)} ({product.discountPercentage}% OFF)
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-slate-600">({product.rating.toFixed(1)})</span>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-700">{product.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-600">Availability:</span>
                    <span className={`font-medium ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-slate-600">Brand:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-slate-600">Category:</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!currentUser || product.stock === 0}
                  className={`w-full py-3 px-6 rounded-lg font-semibold ${
                    !currentUser || product.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#023047] text-white hover:bg-[#012235]'
                  } transition-colors duration-200`}
                >
                  {!currentUser
                    ? 'Login to Add to Cart'
                    : product.stock === 0
                    ? 'Out of Stock'
                    : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Specifications</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-600">Weight:</span>
                    <span className="ml-2 font-medium">{product.weight} oz</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Dimensions:</span>
                    <span className="ml-2 font-medium">
                      {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600">Warranty:</span>
                    <span className="ml-2 font-medium">{product.warrantyInformation}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Shipping:</span>
                    <span className="ml-2 font-medium">{product.shippingInformation}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Minimum Order:</span>
                    <span className="ml-2 font-medium">{product.minimumOrderQuantity} units</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Return Policy:</span>
                    <span className="ml-2 font-medium">{product.returnPolicy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Customer Reviews</h2>
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-slate-200 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#023047] text-white flex items-center justify-center font-medium">
                          {getInitials(review.reviewerName)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{review.reviewerName}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-700 ml-13">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;