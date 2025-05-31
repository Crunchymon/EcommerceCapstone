'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAppContext } from './contextAPI';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAppContext();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on initial render or when user changes
  useEffect(() => {
    if (currentUser?.id) {
      const savedCarts = localStorage.getItem('userCarts');
      const userCarts = savedCarts ? JSON.parse(savedCarts) : {};
      setCart(userCarts[currentUser.id] || []);
    } else {
      setCart([]);
    }
    setLoading(false);
  }, [currentUser]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading && currentUser?.id) {
      const savedCarts = localStorage.getItem('userCarts');
      const userCarts = savedCarts ? JSON.parse(savedCarts) : {};
      userCarts[currentUser.id] = cart;
      localStorage.setItem('userCarts', JSON.stringify(userCarts));
    }
  }, [cart, loading, currentUser]);

  const addToCart = (item) => {
    if (!currentUser?.id) {
      throw new Error('User must be logged in to add items to cart');
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    if (!currentUser?.id) {
      throw new Error('User must be logged in to remove items from cart');
    }
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (!currentUser?.id) {
      throw new Error('User must be logged in to update cart');
    }

    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    if (!currentUser?.id) {
      throw new Error('User must be logged in to clear cart');
    }
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 