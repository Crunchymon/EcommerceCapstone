"use client"
import React, { useState, useRef} from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../contextAPI.js'

function page() {
  const router = useRouter();
  const [show, setShow] = useState("Login")
  const { currentUser, setCurrentUser } = useAppContext();
  // setCurrentUser("Suryansh");
  // const [formData, setFormData] = useState({
  //   password: '',
  //   username: ''
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email ? e.target.email.value : null;

    if (show === "Login") {
      try {
        const res = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username : username, password: password }),
        });
        const data = await res.json();
        console.log("Login response:", data);
        // alert("Login successful");
        setCurrentUser(username);
        router.push("/");
      }
      catch (error) {
        console.error("Error during login:", error);
        alert("Login failed");
      }
      
    }
    else {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Signup successful");
      } else {
        alert("Signup failed");
      }
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
        {show === "Login" ?
          (<div className='mt-4'>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Login</h2>
            <form className="flex flex-col gap-4"
              onSubmit={handleSubmit}>
              <input name = "username" type="text" placeholder="Username" className="border border-gray-300 rounded px-4 py-2 text-gray-500" />
              <input name= "password" type="password" placeholder="Password" className="border border-gray-300 rounded px-4 py-2 text-gray-500" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
            </form>
          </div>)
          :
          (<div className='mt-4'>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Signup</h2>
            <form className="flex flex-col gap-4"
              onSubmit={handleSubmit}>
              <input name = "username" type="text" placeholder="Username" className="border border-gray-300 rounded px-4 py-2 text-gray-500" />
              <input name = "email" type="email" placeholder="Email" className="border border-gray-300 rounded px-4 py-2 text-gray-500" />
              <input name = "password" type="password" placeholder="Password" className="border border-gray-300 rounded px-4 py-2 text-gray-500" />
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Signup</button>
            </form>
          </div>)
        }
      </div>
    </>
  )
}

export default page