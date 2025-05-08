"use client";
import { AppProvider } from "./contextAPI"; // adjust path

export function Providers({ children }) {
  return <AppProvider>{children}</AppProvider>;
}
