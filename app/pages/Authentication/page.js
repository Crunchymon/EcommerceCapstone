"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../../context/contextAPI'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

function Authentication() {
  const router = useRouter();
  const [show, setShow] = useState("Login")
  const { currentUser, setCurrentUser } = useAppContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (formData) => {
    try {
      setLoading(true);
      setError("");
      
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }
      
      setCurrentUser(data.user);
      router.push("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      
      setCurrentUser(data.user);
      router.push("/");
    } catch (err) {
      setError("Login failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    
    if (show === "Login") {
      login(formData.email, formData.password);
    } else {
      formData.username = e.target.username.value;
      formData.firstName = e.target.firstName.value;
      formData.lastName = e.target.lastName.value;
      formData.phoneNumber = e.target.phoneNumber.value;
      register(formData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
              <p className="mt-2 text-slate-600">Please sign in to your account</p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-8">
              <button 
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  show === "Login" 
                    ? "bg-[#023047] text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                onClick={() => setShow("Login")}
              >
                Login
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  show === "Signup" 
                    ? "bg-[#023047] text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                onClick={() => setShow("Signup")}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {show === "Signup" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                    <input 
                      name="username" 
                      type="text" 
                      required
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                      <input 
                        name="firstName" 
                        type="text" 
                        required
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                      <input 
                        name="lastName" 
                        type="text" 
                        required
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input 
                      name="phoneNumber" 
                      type="tel" 
                      required
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-[#023047] hover:bg-[#012235]"
                }`}
              >
                {loading 
                  ? (show === "Login" ? "Signing in..." : "Creating account...") 
                  : (show === "Login" ? "Sign In" : "Create Account")}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Authentication;