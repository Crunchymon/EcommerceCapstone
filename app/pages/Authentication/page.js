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
  const [address, setAddress] = useState(null);

  const generateAddress = async () => {
    try {
      const res = await fetch("../../api/generate-address");
      const data = await res.json();
      if (res.ok) {
        setAddress(data.address);
      } else {
        setError("Failed to generate address");
      }
    } catch (err) {
      setError("Failed to generate address");
    }
  };

  const register = async (formData) => {
    try {
      setLoading(true);
      setError("");
      
      if (!address) {
        await generateAddress();
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          address
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
      console.log(data.user)
      setCurrentUser(data.user);
      router.push("/");
    } catch (err) {
      console.log(err)
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
                name="firstName" 
                type="text" 
                placeholder="First Name" 
                className="border border-gray-300 rounded px-4 py-2 text-gray-500" 
                required
              />
              <input 
                name="lastName" 
                type="text" 
                placeholder="Last Name" 
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
                name="phoneNumber" 
                type="tel" 
                placeholder="Phone Number" 
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
              {address && (
                <div className="p-4 bg-gray-50 rounded text-gray-700">
                  <h3 className="font-semibold mb-2">Generated Address:</h3>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                </div>
              )}
              <button 
                type="button"
                onClick={generateAddress}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Generate Address
              </button>
              <button 
                type="submit" 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={loading || !address}
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