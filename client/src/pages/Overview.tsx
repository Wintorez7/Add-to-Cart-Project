"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ProductCard } from "@/dashboard/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 8;

const Overview = () => {
  const [page, setPage] = useState(1);

  // Fetch paginated products
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products-overview", page],
    queryFn: ({ queryKey }) => {
      const [, currentPage] = queryKey as [string, number];
      return fetchProducts(currentPage, ITEMS_PER_PAGE);
    },
    placeholderData: keepPreviousData,
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Pagination Handlers
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (p: number) => setPage(p);

  // Loading UI
  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-[1600px] mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-4">Overview</h1>
          <p className="text-muted-foreground mb-8">
            Welcome to your ceramics store dashboard.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <Skeleton key={i} className="h-[260px] rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error UI
  if (isError) {
    toast.error("Failed to fetch products.");
    return (
      <div className="flex-1 overflow-auto flex items-center justify-center">
        <p className="text-red-500 font-medium text-lg">
          ⚠️ Couldn’t load products.
        </p>
      </div>
    );
  }

  // ✅ Render
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-foreground mb-2">Overview</h1>
        <p className="text-muted-foreground mb-8">
          Welcome to your ceramics store dashboard.
        </p>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Latest Products
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing {products.length} of {total} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <ProductCard
              key={p.id}
              product={p}
              available={true}
              onToggle={() => {}}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-10">
          <PaginationContent className="justify-center">
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrev}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={() => handlePageClick(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && <PaginationEllipsis />}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNext}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Overview;
