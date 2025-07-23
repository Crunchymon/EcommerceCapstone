"use client"
import React, { useState, useEffect , use} from 'react';
import { useAppContext } from '@/app/context/contextAPI';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

function ProductPage({ params }) {
  const unbundledParams = use(params)
  const { currentUser } = useAppContext();
  const { cart, addToCart , updateQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // console.log(product)
  
  const cartItem = cart.find(cartItem => {
    if (product){
      return cartItem.id === product.id;
    }
    return false;
  });
  const currentQuantity = cartItem?.quantity || 0;
      
  // console.log("Hello this if is the indivisual items page")
  // console.log("The current quntity of this item is:")
  // console.log(currentQuantity)
  // Function to get initials from name/


  const handleQuantityChange = (newQuantity) => {
    // Prevent quantity from going below 1 (unless removing) or above stock
    if (newQuantity < 1 && newQuantity !== 0) return; // Allow 0 for removal
    if (newQuantity > product.stock) return; // Prevent exceeding stock
    updateQuantity(product.id, newQuantity);
  };
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
        const res = await fetch(`/api/products/${unbundledParams.id}`);
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
    
  }, [params]);

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

  const handleBuyNow = async () => {
    if (!currentUser?.id) {
      console.error('User not logged in');
      alert('Please login to purchase items.'); // Simple feedback
      return;
    }

    if (product.stock === 0) {
      alert('This item is out of stock.'); // Simple feedback
      return;
    }

    // Simulate a dummy payment process (replace with actual payment gateway integration)
    const paymentSuccessful = confirm('Proceed with dummy payment for ' + product.title + '?');

    if (paymentSuccessful) {
      try {
        // Send order details to the server API
        const res = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: currentUser.id,
            product: { // Include relevant product details for the order history
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1, // Buy Now is typically for a single item
                // Add other necessary fields like thumbnail, etc.
                thumbnail: product.thumbnail
            }
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to place order');
        }

        const result = await res.json();
        console.log('Order placed successfully:', result);
        alert('Order placed successfully!'); // Simple success feedback


      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order: ' + error.message); // Simple error feedback
      }
    } else {
      alert('Payment cancelled.'); // Simple feedback for cancelled payment
    }
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

                {/* Add to Cart Button */}

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
                                Total: ${(product.price * currentQuantity).toFixed(2)}
                              </span>
                            </div>
                ) : (
                <button
                    onClick={(e) => { e.preventDefault(); addToCart(product); }}
                  disabled={product.stock === 0}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 ${product.stock === 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-[#023047] text-white hover:bg-[#045b87]'
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
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                )}

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={!currentUser || product.stock === 0}
                  className={`w-full py-3 px-6 rounded-lg font-semibold border ${
                     !currentUser || product.stock === 0
                      ? 'border-gray-300 text-gray-500 cursor-not-allowed'
                      : 'border-[#023047] text-[#023047] hover:bg-slate-100'
                  } transition-colors duration-200`}
                >
                  {!currentUser
                    ? 'Login to Buy Now'
                    : product.stock === 0
                    ? 'Out of Stock'
                    : 'Buy Now'}
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