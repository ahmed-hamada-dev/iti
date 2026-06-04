import { useState, useEffect } from 'react';
import { getCurrentUser } from '../api/auth';
import api from '../api/axios';


let cartState = JSON.parse(localStorage.getItem('cart') || '[]');
const listeners = new Set();

const notify = () => listeners.forEach(listener => listener([...cartState]));

// Sync cart with server if user is logged in
const syncWithServer = async (newCart) => {
  const user = getCurrentUser();
  if (user) {
    try {
      await api.patch(`/users/${user.id}`, { cart: newCart });
    } catch (error) {
      console.error('Failed to sync cart with server:', error);
    }
  }
};

export const useCart = () => {
  const [items, setItems] = useState(cartState);

  // Initial fetch from server if logged in
  useEffect(() => {
    const fetchServerCart = async () => {
      const user = getCurrentUser();
      if (user) {
        try {
          const response = await api.get(`/users/${user.id}`);
          const serverCart = response.data.cart || [];
          if (serverCart.length > 0 || cartState.length === 0) {
            cartState = serverCart;
            localStorage.setItem('cart', JSON.stringify(cartState));
            notify();
          }
        } catch (error) {
          console.error('Failed to fetch cart from server:', error);
        }
      }
    };
    fetchServerCart();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        cartState = JSON.parse(e.newValue || '[]');
        notify();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    listeners.add(setItems);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      listeners.delete(setItems);
    };
  }, []);

  const addToCart = async (product, quantity = 1) => {
    const existingIndex = cartState.findIndex(item => item.id === product.id);
    const currentQuantity = existingIndex > -1 ? cartState[existingIndex].quantity : 0;
    
    if (currentQuantity + quantity > product.stock) {
      return false; // Not enough stock
    }

    if (existingIndex > -1) {
      cartState[existingIndex].quantity += quantity;
    } else {
      cartState.push({ ...product, quantity });
    }
    
    const newCart = [...cartState];
    localStorage.setItem('cart', JSON.stringify(newCart));
    notify();
    await syncWithServer(newCart);
    return true;
  };

  const removeFromCart = async (productId) => {
    cartState = cartState.filter(item => item.id !== productId);
    const newCart = [...cartState];
    localStorage.setItem('cart', JSON.stringify(newCart));
    notify();
    await syncWithServer(newCart);
  };

  const updateQuantity = async (productId, quantity) => {
    const index = cartState.findIndex(item => item.id === productId);
    if (index > -1) {
      if (quantity <= 0) {
        await removeFromCart(productId);
      } else {
        const item = cartState[index];
        if (quantity > item.stock) return; // Cannot exceed stock
        
        cartState[index].quantity = quantity;
        const newCart = [...cartState];
        localStorage.setItem('cart', JSON.stringify(newCart));
        notify();
        await syncWithServer(newCart);
      }
    }
  };

  const clearCart = async () => {
    cartState.length = 0;
    localStorage.removeItem('cart');
    notify();
    await syncWithServer([]);
  };

  const total = cartState.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartState.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount
  };
};
