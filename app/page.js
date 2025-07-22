"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MainContent from "./components/Main";
import Footer from "./components/Footer";
import { AppProvider } from "./context/contextAPI";
import Link from 'next/link';
import Image from 'next/image';




export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <MainContent/>
      <Footer />
    </div>
  );
}




