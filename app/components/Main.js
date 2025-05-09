import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "../context/contextAPI";
function MainContent() {
    const { data, setData , showCaseData , setShowCaseData} = useAppContext();  
    async function getData() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setData(data);
      setShowCaseData(data);
    }
  
    useEffect(() => {
      getData();
    }, []);
  
    return (
      <main className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Main Content</h2>
        <p className="text-center mb-8 text-gray-700">
          Browse through our collection of amazing products.
        </p>
        {showCaseData ? (
          <div className="flex flex-wrap justify-center gap-6">
            {showCaseData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow w-80"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-bold mb-2 text-gray-700">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {item.description.substring(0, 100)}...
                </p>
                <p className="text-blue-600 font-semibold">Price: ${item.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </main>
    );
  }

export default MainContent;