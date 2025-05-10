"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../../context/contextAPI'

function page() {
  const router = useRouter();
  const [show, setShow] = useState("Login")
  const { currentUser, setCurrentUser } = useAppContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (email, password, username) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username })
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
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;
    
    if (show === "Login") {
      login(email, password);
    } else {
      const username = e.target.username.value;
      register(email, password, username);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-gray-700">Authentication</h1>
        <div className="flex flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShow("Login")}>
            Login
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setShow("Signup")}>
            Signup
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {show === "Login" ? (
          <div className='mt-4'>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Login</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                className="border border-gray-300 rounded px-4 py-2 text-gray-500" 
                required
              />
              <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                className="border border-gray-300 rounded px-4 py-2 text-gray-500" 
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        ) : (
          <div className='mt-4'>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Signup</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input 
                name="username" 
                type="text" 
                placeholder="Username" 
                className="border border-gray-300 rounded px-4 py-2 text-gray-500" 
                required
              />
              <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                className="border border-gray-300 rounded px-4 py-2 text-gray-500" 
                required
              />
              <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                className="border border-gray-300 rounded px-4 py-2 text-gray-500" 
                required
              />
              <button 
                type="submit" 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Signup"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default page