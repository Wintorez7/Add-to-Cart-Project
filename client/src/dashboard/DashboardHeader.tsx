import { useState } from "react";
import { Search, Plus, SlidersHorizontal, List, Grid2x2, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Bell, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
  onViewChange: (view: "grid" | "list") => void;
  currentView: "grid" | "list";
}

export const DashboardHeader = ({
  onSearch,
  onSort,
  onViewChange,
  currentView,
}: DashboardHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-card"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-2">
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
              <Link to="/dashboard/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
              {/* <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px]">
                0
              </Badge> */}
            </button>
        </div>
      </div>
    </header>
  );
};

interface ProductsHeaderProps {
  onSearch: (query: string) => void;
  onSort: (sortBy: string) => void;
  onViewChange: (view: "grid" | "list") => void;
  currentView: "grid" | "list";
}

export const ProductsHeader = ({
  onSort,
  onViewChange,
  currentView,
}: ProductsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Orders / Carts</p>
        <h1 className="text-2xl font-bold text-foreground">All Products</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center border border-border rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            className={currentView === "list" ? "bg-muted" : ""}
            onClick={() => onViewChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={currentView === "grid" ? "bg-muted" : ""}
            onClick={() => onViewChange("grid")}
          >
            <Grid2x2 className="h-4 w-4" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSort("name")}>Name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("price")}>Price</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort("stock")}>Stock</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add new product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the product details below to add it to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Tableware" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="PL-024" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="32.45" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="350" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max">Max Stock</Label>
                  <Input id="max" type="number" placeholder="1200" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="https://..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
