"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MainContent from "./components/Main";
import Footer from "./components/Footer";
import { AppProvider } from "./context/contextAPI";
export default function App() {
  return (
    <>
      <AppProvider>
        <Header />
        <MainContent />
        <Footer />
      </AppProvider>
    </>
  );
}




