"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/contextAPI';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import MapComponent from './MapComponet';

function Dashboard() {
  const { currentUser } = useAppContext();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push('/pages/Authentication');
    }
    // Here you would typically fetch orders from your API
    // For now, we'll use mock data
    setOrders([
      {
        id: 1,
        date: '2024-01-15',
        status: 'Delivered',
        total: 299.99,
        items: [
          { id: 1, name: 'Product 1', quantity: 2, price: 149.99 }
        ]
      },
      {
        id: 2,
        date: '2024-01-20',
        status: 'Processing',
        total: 199.99,
        items: [
          { id: 2, name: 'Product 2', quantity: 1, price: 199.99 }
        ]
      }
    ]);
    setLoading(false);
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Please login to view your dashboard</h1>
          <button 
            onClick={() => router.push('/pages/Authentication')}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-[#023047] text-white hover:bg-[#012235] transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Dashboard Header */}
      <section className="bg-[#023047] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Welcome back, {currentUser.firstName}!</h1>
          <p className="mt-2 text-white/80">Here's an overview of your account</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-[#023047] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{currentUser.firstName} {currentUser.lastName}</h2>
                  <p className="text-slate-600">{currentUser.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Account Status</h3>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Member Since</h3>
                  <p className="text-slate-900">January 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Current Orders</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#023047] mx-auto"></div>
                  <p className="mt-4 text-slate-600">Loading orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900">Order #{order.id}</h3>
                          <p className="text-sm text-slate-600">Placed on {order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-slate-600">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="text-slate-900">${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">No orders yet</p>
                  <button 
                    onClick={() => router.push('/pages/Products')}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg bg-[#023047] text-white hover:bg-[#012235] transition-colors duration-200"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Your Location</h2>
            <MapComponent />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;