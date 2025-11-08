"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import CheckoutModal from "./CheckoutModal";

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const userId = "mohan123"; // Replace later with auth user ID

  // ✅ Fetch Cart Data from Backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`https://add-to-cart-project.onrender.com/api/cart?userId=${userId}`);
        const data = await res.json();
        setCartItems(data || []);
      } catch (err) {
        toast.error("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // ✅ Handle Quantity Change
  const handleQuantityChange = async (id: string, type: "increase" | "decrease") => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          const newQuantity = type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // ✅ Handle Remove Item
  const handleRemoveItem = async (id: string) => {
    try {
      const res = await fetch(`https://add-to-cart-project.onrender.com/api/cart/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
        toast.success("Removed item from cart");
      }
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // ✅ Promo Code
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "nextgen10") {
      setDiscount(10);
      toast.success("🎉 Promo code applied successfully!");
    } else {
      setDiscount(0);
      toast.error("Invalid promo code");
    }
  };

  // ✅ Totals
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - subtotal * (discount / 100);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(price);

  if (loading) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto">
        <h1 className="text-2xl font-bold mb-6">🛍️ Your Cart</h1>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-[1600px] mx-auto">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">
                  Looks like you haven’t added anything yet.
                </p>
                <Button asChild>
                  <a href="/dashboard/products">Continue Shopping</a>
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
                >
                  <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{item.product.title}</h3>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">
                      {item.product.brand} — {item.product.category}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item._id, "decrease")}
                          className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="px-3 py-1 border-t border-b border-gray-300 w-10 text-center text-sm">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => handleQuantityChange(item._id, "increase")}
                          className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>
                      -{formatPrice(calculateSubtotal() * discount / 100)}
                    </span>
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label htmlFor="promo-code" className="block text-sm font-medium mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <Input
                    id="promo-code"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleApplyPromo} variant="outline">
                    Apply
                  </Button>
                </div>
              </div>

              <CheckoutModal />

              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>By proceeding, you agree to our</p>
                <p>Terms of Service & Privacy Policy</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
