"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [showCaseData, setShowCaseData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userList, setUserList] = useState([]);

  async function getUsers() {
    const res = await fetch("https://fakestoreapi.com/users");
    const users = await res.json();
    setUserList(users);
  }

  // Initialize user from localStorage
  useEffect(() => {
    getUsers();
    try {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem("currentUser");
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("currentUser");
      }
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  }, [currentUser]);

  const value = {
    data,
    setData,
    showCaseData,
    setShowCaseData,
    currentUser,
    setCurrentUser,
    userList
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
