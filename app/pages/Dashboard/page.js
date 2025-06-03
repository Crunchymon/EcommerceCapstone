"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/contextAPI';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

function Dashboard() {
  const { currentUser } = useAppContext();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/pages/Authentication');
    }

    async function fetchOrders() {
      if (!currentUser?.id) return;

      try {
        setLoading(true);
        // Assuming your user API route returns user data including orders
        const res = await fetch(`/api/users/${currentUser.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await res.json();

        // Filter and set orders based on status
        const allOrders = userData.orders || [];
        setCurrentOrders(allOrders.filter(order => order.status === 'Processing'));
        setDeliveredOrders(allOrders.filter(order => order.status === 'Delivered')); // Assuming 'Delivered' is the status for delivered orders

      } catch (error) {
        console.error('Error fetching orders:', error);
        // Keep orders empty on error
        setCurrentOrders([]);
        setDeliveredOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();

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
          <h1 className="text-3xl font-bold">Welcome back, {currentUser?.firstName}!</h1>
          <p className="mt-2 text-white/80">Here's an overview of your account and orders</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-[#023047] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{currentUser?.firstName} {currentUser?.lastName}</h2>
                  <p className="text-slate-600">{currentUser?.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Account Status</h3>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Member Since</h3>
                  <p className="text-slate-900">{currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Sections */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Current Orders ({currentOrders.length})</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#023047] mx-auto"></div>
                  <p className="mt-4 text-slate-600">Loading orders...</p>
                </div>
              ) : currentOrders.length > 0 ? (
                <div className="space-y-6">
                  {currentOrders.map((order, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900">Order #{index + 1}</h3>
                          <p className="text-sm text-slate-600">Placed on {order.purchaseDate ? new Date(order.purchaseDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div key={order.id} className="flex justify-between text-sm items-center">
                          <div className="flex items-center space-x-2">
                            <img src={order.thumbnail} alt={order.title} className="w-8 h-8 rounded object-cover"/>
                            <span className="text-slate-600">
                              {order.title} x {order.quantity}
                            </span>
                          </div>
                          <span className="text-slate-900">${order.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${(order.price * order.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      {/* Map Component for tracking - Placeholder */}
                      {/* <MapComponent order={order} /> */}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">No current orders.</p>
                </div>
              )}
            </div>

            {/* Delivered Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Delivered Orders ({deliveredOrders.length})</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#023047] mx-auto"></div>
                  <p className="mt-4 text-slate-600">Loading orders...</p>
                </div>
              ) : deliveredOrders.length > 0 ? (
                <div className="space-y-6">
                  {deliveredOrders.map((order, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 opacity-70">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900">Order #{index + 1}</h3>
                          <p className="text-sm text-slate-600">Placed on {order.purchaseDate ? new Date(order.purchaseDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800`}>
                          Delivered
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div key={order.id} className="flex justify-between text-sm items-center">
                          <div className="flex items-center space-x-2">
                            <img src={order.thumbnail} alt={order.title} className="w-8 h-8 rounded object-cover"/>
                            <span className="text-slate-600">
                              {order.title} x {order.quantity}
                            </span>
                          </div>
                          <span className="text-slate-900">${order.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${(order.price * order.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">No delivered orders yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;