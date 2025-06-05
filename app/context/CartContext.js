'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAppContext } from './contextAPI';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAppContext();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from server on initial render or when user changes
  useEffect(() => {
    async function fetchCart() {
      if (currentUser?.id) {
        try {
          setLoading(true);
          // Fetch cart from the server API
          const res = await fetch(`/api/cart/${currentUser.id}`);
          if (!res.ok) {
            // Handle cases where user is found but has no cart yet or API error
            console.error('Failed to fetch cart:', res.status);
            setCart([]); // Assume empty cart on error
          } else {
            const userCart = await res.json();
            setCart(userCart || []); // Set cart, default to empty array if null/undefined
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
          setCart([]); // Set cart to empty on error
        } finally {
          setLoading(false);
        }
      } else {
        // Clear cart if no user is logged in and loading is complete
        if (!loading) {
           setCart([]);
        }
        setLoading(false);
      }
    }

    fetchCart();

  }, [currentUser]); // Depend on currentUser

  // Save cart to server whenever it changes, if user is logged in and not loading
  useEffect(() => {
    async function saveCart() {
      // Only save if not in initial loading state, user is logged in, and cart is initialized
      if (!loading && currentUser?.id && cart !== null) {
        try {
          // Send the updated cart to the server API
          const res = await fetch(`/api/cart/${currentUser.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart }),
          });

          if (!res.ok) {
            console.error('Failed to save cart:', res.status);
          }
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    }
    // Add a small delay to avoid excessive API calls on rapid cart changes
    const handler = setTimeout(() => {
      saveCart();
    }, 500); // Adjust delay as needed

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };

  }, [cart, loading, currentUser]); // Depend on cart, loading, and currentUser

  const addToCart = (item) => {
    if (!currentUser?.id) {
      alert('User must be logged in to add items to cart');
      // Optionally redirect to login or show a message
      return;
    }

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex > -1) {
        // Item already in cart, increase quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newCart[existingItemIndex].quantity + 1 };
        return newCart;
      } else {
        // Item not in cart, add new item with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
     if (!currentUser?.id) {
        console.error('User must be logged in to remove items from cart');
        return;
      }
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
     if (!currentUser?.id) {
        console.error('User must be logged in to update cart');
        return;
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
        console.error('User must be logged in to clear cart');
        return;
      }
    setCart([]);
  };

  const getCartTotal = () => {
    // Ensure cart is an array before reducing
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

   const getCartCount = () => {
     // Ensure cart is an array before reducing
     if (!Array.isArray(cart)) return 0;
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

export default CartContext; 