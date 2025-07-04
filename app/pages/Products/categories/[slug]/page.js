"use client"
import React, { useState, useEffect , use} from 'react';
import { useAppContext } from '@/app/context/contextAPI';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Card } from '@/app/components/card';
import Link from 'next/link';

function Products({params}) {
  const unwrappedParams = use(params);
  console.log(unwrappedParams.slug.replace("'","").split("%20").join("-"))
  const { data, setData, showCaseData, setShowCaseData } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(`${unwrappedParams.slug.replace("'","").split("%20").join("-")}`);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from data
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    setCategories(uniqueCategories);

  }, [data]);

  useEffect(() => {
    if (searchQuery === "") {
      if (selectedCategory === "all") {
        setShowCaseData(data);
      } else {
        setShowCaseData(data.filter(item => item.category === selectedCategory));
      }
    } else {
      const filteredData = data.filter(item =>
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory === "all" || item.category === selectedCategory)
      );
      setShowCaseData(filteredData);
    }
  }, [searchQuery, selectedCategory, data]);

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
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-gray-700 w-full px-4 py-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
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
              <div className="w-full md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#023047] focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {showCaseData.map((item) => (
              
              <Card key={item.id} item={item} />
           
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