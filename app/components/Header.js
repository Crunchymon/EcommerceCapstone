import React, { useState , useEffect, use} from "react";
import Link from "next/link";
import { useAppContext } from "../context/contextAPI";
import {Button} from "@heroui/react";



function Header() {
    const { data, setData , showCaseData, setShowCaseData ,currentUser , setCurrentUser, userList ,currentUserId} = useAppContext();
    const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
  
    setShowCaseData((prevData) =>
      prevData.filter((item) =>
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||  item.category.toLowerCase().includes(searchQuery.toLowerCase()) )
      )
    )
  };

  useEffect(() => {
    if (searchQuery === "") {
      setShowCaseData(data);
    } else {
      handleSearch();
    }

  }, [searchQuery]);

return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto justify-center">
        <img
          src="/HomePage/01_Logo.png"
          alt="Logo"
          className="h-10 w-10 mr-4"
        />
        <nav className="flex space-x-6 ml-6">
          <Link href="/pages/carts" className="hover:underline">
            Carts
          </Link>
          <Link href="/pages/Accounts" className="hover:underline">
            Account
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </div>
      <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto justify-center mt-4 sm:mt-0">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none border border-gray-300 rounded px-4 py-2 w-full sm:w-96"
        />
        </div>
        <div>
        {currentUser ? (
          <>
            <span className="text-white">Welcome {currentUser.username}!</span>
            <button 
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 mt-2 sm:mt-0 sm:ml-4"
              onClick={() => setCurrentUser(null)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
          <Link href="../pages/Authentication">
            <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 mt-2 sm:mt-0 sm:ml-4">
              Login / Signup
            </button>
          </Link>
          </>
        )}
        
      </div>
    </header>
  );
}

export default Header;  