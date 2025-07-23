"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [showCaseData, setShowCaseData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function getUser(userId) {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }
      const userData = await res.json();
      
      // Validate user data
      if (!userData || !userData.id || !userData.email) {
        throw new Error('Invalid user data received');
      }
      
      return userData;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Load user from localStorage on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const storedUserId = localStorage.getItem("currentUserId");
        
        if (storedUserId) {
          const parsedUserId = JSON.parse(storedUserId);
          const user = await getUser(parsedUserId);
          
          if (user) {
            setCurrentUser(user);
            setRetryCount(0); // Reset retry count on successful load
          } else {
            // If user data is invalid, clear storage and retry once
            if (retryCount < 1) {
              setRetryCount(prev => prev + 1);
              localStorage.removeItem("currentUserId");
              // Retry loading after a short delay
              setTimeout(loadUser, 1000);
            } else {
              localStorage.removeItem("currentUserId");
            }
          }
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("currentUserId");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadUser();
  }, [retryCount]);

  // Update localStorage when user changes
  useEffect(() => {
    try {
      if (currentUser && currentUser.id) {
        localStorage.setItem("currentUserId", JSON.stringify(currentUser.id));
      } else if (currentUser === null) {
        localStorage.removeItem("currentUserId");
      }
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  }, [currentUser]);

  async function getData() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setData(data);
    setShowCaseData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const value = {
    data,
    setData,
    showCaseData,
    setShowCaseData,
    currentUser,
    setCurrentUser,
    isLoading,
    isMenuOpen,
    setIsMenuOpen
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
