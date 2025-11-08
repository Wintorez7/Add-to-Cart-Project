"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";

import { ProductsHeader } from "@/dashboard/DashboardHeader";
import { ProductCard } from "@/dashboard/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

// ✅ Fetch function for DummyJSON products
async function fetchProducts(page = 1, limit = 12) {
  const skip = (page - 1) * limit;
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json(); // returns { products, total, skip, limit }
}

const Products = () => {
  // 🧠 States
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [availability, setAvailability] = useState<Record<number, boolean>>({});

  // 🧩 Fetch data with React Query
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: ({ queryKey }) => {
      const [, currentPage] = queryKey as [string, number];
      return fetchProducts(currentPage);
    },
    placeholderData: keepPreviousData,
  });

  const products = data?.products || [];
  const total = data?.total || 0;

  // 🧮 Sorting & Filtering
  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "stock") return a.stock - b.stock;
      return 0;
    });

  // 🧭 Pagination
  const totalPages = Math.ceil(total / 12);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  // 🧾 Availability Toggle
  const handleToggleAvailability = (id: number) => {
    setAvailability((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ⚙️ Error state
  if (isError) {
    toast.error("Failed to load products. Try again later.");
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500 font-medium">⚠️ Unable to fetch products.</p>
      </div>
    );
  }

  // ⏳ Loading Skeleton
  if (isLoading) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto">
        <ProductsHeader
          onSearch={setSearchQuery}
          onSort={setSortBy}
          onViewChange={setView}
          currentView={view}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-[260px] rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // ✅ Render
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-[1600px] mx-auto">
        <ProductsHeader
          onSearch={setSearchQuery}
          onSort={setSortBy}
          onViewChange={setView}
          currentView={view}
        />

        <div
          className={`grid gap-5 ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((p: any) => (
            <ProductCard
              key={p.id}
              product={p}
              available={availability[p.id] ?? true}
              onToggle={handleToggleAvailability}
            />
          ))}
        </div>

        {/* Pagination
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 rounded-md bg-muted hover:bg-accent disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-md bg-muted hover:bg-accent disabled:opacity-50"
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Products;
