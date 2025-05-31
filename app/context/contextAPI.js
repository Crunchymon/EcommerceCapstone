"use client"
import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AppContext = createContext();

// Store the user state outside the component to persist across Fast Refresh
let globalUser = null;

export const AppProvider = ({ children }) => {
  const [data,setData] = useState([]);
  const [showCaseData, setShowCaseData] = useState([]);
  const [currentUser, setCurrentUser] = useState(globalUser);
  const initialized = useRef(false);

  async function getUser(userId) {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Initialize user from localStorage only once
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function loadUser() {
      try {
        const storedUserId = localStorage.getItem("currentUserId");
        console.log("Loading user from localStorage:", storedUserId);
        
        if (storedUserId) {
          const parsedUserId = JSON.parse(storedUserId);
          const user = await getUser(parsedUserId);
          
          if (user) {
            console.log("Setting current user:", user);
            globalUser = user;
            setCurrentUser(user);
          } else {
            console.log("No user found, clearing localStorage");
            globalUser = null;
            localStorage.removeItem("currentUserId");
          }
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        globalUser = null;
        localStorage.removeItem("currentUserId");
      }
    }
    
    loadUser();
  }, []);

  // Update localStorage and global state when user changes
  useEffect(() => {
    if (!initialized.current) return;

    try {
      if (currentUser && currentUser.id) {
        console.log("Saving user to localStorage:", currentUser.id);
        globalUser = currentUser;
        localStorage.setItem("currentUserId", JSON.stringify(currentUser.id));
      } else if (currentUser === null) {
        console.log("Clearing user from localStorage");
        globalUser = null;
        localStorage.removeItem("currentUserId");
      }
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  }, [currentUser]);

  async function getData(){
    const res = await fetch("../api/products")
    const data = await res.json()
    setData(data)
    setShowCaseData(data)
  }

  useEffect(()=>{
    getData()
  },[])

  const value = {
    data,
    setData,
    showCaseData,
    setShowCaseData,
    currentUser,
    setCurrentUser
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
