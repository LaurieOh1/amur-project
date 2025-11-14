import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext({ count: 0, refreshCart: () => {} });

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const getUserId = () => {
    try {
      const u = localStorage.getItem("userInfo");
      if (!u) return null;
      const parsed = JSON.parse(u);
      return parsed?._id || parsed?.id || null;
    } catch { return null; }
  };

  const refreshCart = async () => {
    const userId = getUserId();
    if (!userId) { setCount(0); return; }
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      const items = data?.items || [];
     
      setCount(items.reduce((sum, it) => sum + it.quantity, 0));
    } catch {
      setCount(0);
    }
  };


  useEffect(() => { refreshCart(); }, []);

  return (
    <CartContext.Provider value={{ count, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
