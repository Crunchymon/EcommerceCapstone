"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [data, setData] = useState([]);
  const [showCaseData, setShowCaseData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userList, setUserList] = useState([]);

  async function getUsers() {
    const res = await fetch("https://fakestoreapi.com/users");
    const users = await res.json();
    setUserList(users);
  }


useEffect(() => {
  getUsers();
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    setCurrentUser(storedUser);
    // setCurrentUserId(userList.find((user)=>{return user.username == storedUser}).id);
  }
}, []);


useEffect(() => {
  
  if (currentUser) {
    localStorage.setItem("currentUser", currentUser);
    // setCurrentUserId(userList.find((user)=>{return user.username === currentUser}).id);
  } else {
    localStorage.removeItem("currentUser");
  }
}, [currentUser]);

return (
  <AppContext.Provider value={{ data, setData, showCaseData, setShowCaseData, currentUser, setCurrentUser , userList , currentUserId}}>
    {children}
  </AppContext.Provider>
);
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
