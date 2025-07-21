"use client"
import { useAppContext } from '../../context/contextAPI'
import { useCart } from '../../context/CartContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Link from 'next/link'

function Carts() {
  const { currentUser } = useAppContext()
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const router = useRouter()

  const handleCheckout = async () => {
    if (!currentUser) {
      alert('Please login to checkout.');
      router.push('/pages/Authentication');
      return;
    }

    if (!cart || cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    try {
      const orderData = {
        userId: currentUser.id,
        isCartCheckout: true,
        items: cart.map(item => ({
          // console.log(item)
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          thumbnail: item.thumbnail
        }))
      };

      console.log(orderData)

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      const result = await res.json();
      alert(`Order placed successfully! Order ID: ${result.orderId}`);
      clearCart(); // Clear the cart after successful order
      router.push('/pages/Dashboard'); // Redirect to dashboard

    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Error placing order: ${error.message}. Please try again.`);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Please login to view your cart</h1>
          <button 
            onClick={() => router.push('/pages/Authentication')}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-[#023047] text-white hover:bg-[#012235] transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        {/* Header Section */}
        <section className="bg-[#023047] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {cart && cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {cart.map((item) => (
             
                      <div key={item.id} className="p-6">
                        <div className="flex items-center gap-6">
                          <div className="w-24 h-24 flex-shrink-0">
                            <Link 
                            href = {`/pages/Products/${item.id}`}
                            >
                            <img 
                              src={item.thumbnail} 
                              alt={item.title} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                            </Link>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                                >
                                  +
                                </button>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-700 font-medium"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-slate-900">${item.price}</p>
                            <p className="text-sm text-slate-600">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold text-slate-900">
                        <span>Total</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-[#023047] text-white hover:bg-[#012235] transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
                <p className="text-slate-600 mb-8">Add some items to your cart to see them here</p>
                <button 
                  onClick={() => router.push('/')}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-[#023047] text-white hover:bg-[#012235] transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
    <Footer />
    </>
    
  )
}

export default Carts