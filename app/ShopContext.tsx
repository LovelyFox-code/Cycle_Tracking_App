import React, { createContext, useState, useContext } from 'react';
import { shopItems, ShopItem } from '@/data/shop';

type ShopContextType = {
  cartItems: ShopItem[];
  addToCart: (item: ShopItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
};

const ShopContext = createContext<ShopContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0,
});

export const useShop = () => useContext(ShopContext);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ShopItem[]>([]);

  const addToCart = (item: ShopItem) => {
    if (!item.inStock) return;
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId: string) => {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};