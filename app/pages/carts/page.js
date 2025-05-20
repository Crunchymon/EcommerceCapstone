"use client"
import { useAppContext } from '../../context/contextAPI'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Carts() {
  const { currentUser } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/pages/Authentication')
    }
  }, [currentUser, router])

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Please login to view your cart</h1>
        <button 
          onClick={() => router.push('/pages/Authentication')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>
      
      {currentUser.cart && currentUser.cart.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {currentUser.cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price}</p>
                  <p className="text-gray-600">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">
                ${currentUser.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4">Add some items to your cart to see them here</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default Carts