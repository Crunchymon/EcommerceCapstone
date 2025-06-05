"use client"
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/contextAPI';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Card } from '@/app/components/card';
import Link from 'next/link';

function Products() {
  const { data, setData, showCaseData, setShowCaseData, currentUser } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [filterBy, setFilterBy] = useState("Filter By")
  const [isLoading, setIsLoading] = useState(true);

  async function updateCart(userID,updatedCart){

    try {
      const response = await fetch(`/api/cart/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCart),
      });
    }
    catch(error){
      console.log(error)
    }
  
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/products');
        const products = await res.json();
        setData(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setData]);

  useEffect(() => {
    // Extract unique categories from data
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    setCategories(uniqueCategories);

  }, [data]);

  useEffect(() => {
    let filteredData = [...data]; // Create a copy of the data

    // Apply category filter
    if (selectedCategory !== "all") {
      filteredData = filteredData.filter(item => item.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery !== "") {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    if (filterBy !== "Filter By"){
      if (filterBy === "Price") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (filterBy === "Rating") {
      filteredData.sort((a, b) => b.rating - a.rating);
    }
    }
    

    setShowCaseData(filteredData);
  }, [searchQuery, selectedCategory, data, filterBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#023047]"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">

        {/* Products Header */}
        <section className="bg-[#023047] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Our Products</h1>
            <p className="mt-2 text-white/80">Discover our wide range of products</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filter Section */}
          <div className="mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-gray-500 w-full px-4 py-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                  />
                  <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 w-full md:w-64">

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-gray-400 w-full p-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>

              </div>
              <div className="flex-1 w-full md:w-64">

                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="text-gray-400 w-full p-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                >
                  <option>Filter By</option>
                  <option value = "Price">Price</option>
                  <option value = "Rating">Rating</option>
                </select>

              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {showCaseData.map((item) => (
             
              <Card key={item.id} item={item} callback={updateCart}/>
              
            ))}
          </div>

          {/* Empty State */}
          {showCaseData.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Products; 