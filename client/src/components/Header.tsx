import { Search, Heart, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">gadgets</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#catalog" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Catalog
            </a>
            <a href="#delivery" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Delivery
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
            <Link to={'/dashboard'}>
              <p className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Products
              </p>         
            </Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Items"
                className="w-[200px] pl-9 lg:w-[300px]"
              />
            </div>
            
            <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            
            <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
              <Link to="/dashboard/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px]">
                0
              </Badge>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
