import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/contextAPI";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce Capstone",
  description: "A modern e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AppProvider>
      </body>
    </html>
  );
}
