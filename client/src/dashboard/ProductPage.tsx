"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Star, Minus, Plus, ShoppingCart, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🧠 Fetch product if not passed via state (direct URL)
  useEffect(() => {
    if (!product && id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`https://add-to-cart-project.onrender.com/api/products/${id}`);
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          toast.error("Failed to load product details");
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") setQuantity((prev) => prev + 1);
    else if (type === "decrease" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://add-to-cart-project.onrender.com/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "mohan123", // replace with real user later
          productId: product._id || id,
          quantity,
        }),
      });

      const data = await res.json();
      if (res.ok) toast.success("🛒 Product added to cart!");
      else toast.error(data.message || "Failed to add product");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 text-lg">Loading product details...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🖼 Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square">
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-md border-2 ${
                    selectedImage === index ? "border-black" : "border-gray-200"
                  }`}
                >
                  <img src={image} alt={`product-${index}`} className="w-full h-full object-cover aspect-square" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 🧾 Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {renderStars(product.rating || 0)}
                <span className="ml-2 text-sm font-medium">{product.rating?.toFixed(1)}</span>
              </div>
              {product.brand && (
                <span className="text-sm text-gray-500 ml-3">Brand: {product.brand}</span>
              )}
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price?.toFixed(2)}</div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <div className="px-1 py-1 border-t border-b border-gray-300 w-16 text-center">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            className="w-full py-3 text-base font-medium flex items-center justify-center gap-2"
            onClick={handleAddToCart}
            disabled={loading}
          >
            <ShoppingCart size={20} />
            {loading ? "Adding..." : "Add to Cart"}
          </Button>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p>{product.description || "No description available."}</p>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Truck size={18} className="text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Shipping Info</h4>
                    <p className="text-sm text-gray-600">
                      Estimated delivery in 3–5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
