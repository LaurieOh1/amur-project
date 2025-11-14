import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);          
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ---- Get userId (adjust to your auth flow) ----
  useEffect(() => {

    try {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserId(parsed?._id || parsed?.id);
      }
    } catch {}
  }, []);

  const fetchCart = async (uid) => {
    if (!uid) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/cart/${uid}`);
      setCart(data);
      setErr("");
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCart(userId);
  }, [userId]);

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (sum, it) => sum + (it.price ?? it.productId?.price ?? 0) * it.quantity,
      0
    );
  }, [cart]);

  // ---- Handlers ----
  const updateQuantity = async (productId, nextQty) => {
    if (!userId || nextQty < 1) return;
    try {
      const { data } = await axios.put(`/api/cart/${userId}`, {
        productId,
        quantity: nextQty,
      });
      setCart(data);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to update quantity");
    }
  };

  const increment = (item) =>
    updateQuantity(item.productId._id || item.productId, item.quantity + 1);

  const decrement = (item) =>
    item.quantity > 1 &&
    updateQuantity(item.productId._id || item.productId, item.quantity - 1);

  const removeItem = async (productId) => {
    try {
      const { data } = await axios.delete(
        `/api/cart/${userId}/item/${productId}`
      );
      setCart(data);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`/api/cart/${userId}`);
      setCart({ ...cart, items: [] });
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to clear cart");
    }
  };

  const checkout = () => {
    
    navigate("/checkout");
  };

  if (!userId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="mb-6">Please sign in to view your cart.</p>
        <Link
          className="inline-block bg-black text-white px-6 py-3 rounded"
          to="/login"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-16">Loading cart...</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {err && (
        <div className="mb-4 rounded bg-red-100 text-red-700 p-3">{err}</div>
      )}

      {!cart?.items?.length ? (
        <div className="bg-white p-8 rounded shadow text-center">
          <p className="mb-6">Your cart is empty.</p>
          <Link className="bg-black text-white px-6 py-3 rounded" to="/shop">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              const p = item.productId || {};
              const productId = p._id || item.productId;
              const img = p.images?.[0];
              const name = p.name || "Product";
              const unitPrice = item.price ?? p.price ?? 0;

              return (
                <div
                  key={productId}
                  className="flex items-center gap-4 bg-white p-4 rounded shadow"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-gray-600">€{unitPrice.toFixed(2)}</p>

                    {/* Qty controls */}
                    <div className="mt-2 inline-flex items-center border rounded">
                      <button
                        className="px-3 py-1"
                        onClick={() => decrement(item)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="px-4 py-1 border-l border-r">
                        {item.quantity}
                      </span>
                      <button className="px-3 py-1" onClick={() => increment(item)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      €{(unitPrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="mt-2 text-sm text-red-600 underline"
                      onClick={() => removeItem(productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              onClick={clearCart}
              className="text-sm text-red-600 underline mt-2"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t my-3" />
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={checkout}
              className="w-full bg-black text-white px-4 py-3 rounded hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/shop"
              className="block text-center mt-3 text-sm underline text-gray-700"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
