import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    category: string;
    brand: string;
    price: number;
    rating: number;
    discountPercentage: number;
    thumbnail: string;
  };
  available: boolean;
  onToggle: (id: number) => void;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    // ✅ Navigate to the product details page
    navigate(`/dashboard/product/${product.id}`, { state: { product } });
  };

  return ( 
    <Card
      onClick={handleViewProduct}
      className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="aspect-square bg-muted/30 flex items-center justify-center overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-base mb-0.5 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.category} — {product.brand}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          </div>
          {product.discountPercentage > 0 && (
            <Badge variant="outline" className="text-green-600 border-green-600">
              {product.discountPercentage.toFixed(1)}% OFF
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-semibold text-foreground">${product.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={(e) => {
              e.stopPropagation(); // 🧠 prevent Card click event
              handleViewProduct();
            }}
          >
            View
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              console.log("🛒 Add to cart clicked:", product);
            }}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
