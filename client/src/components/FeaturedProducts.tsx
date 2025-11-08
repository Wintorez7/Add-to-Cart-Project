import { Heart, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import speakerJbl from "@/assets/speaker-jbl.png";
import cameraPink from "@/assets/camera-pink.png";
import appleWatchTeal from "@/assets/apple-watch-teal.png";
import controllerYellow from "@/assets/controller-yellow.png";

const products = [
  {
    id: 1,
    name: "JBL Partybox 300",
    category: "Music & Sound",
    price: 449.99,
    originalPrice: null,
    image: speakerJbl,
    badge: null,
    favorite: false,
  },
  {
    id: 2,
    name: "Polaroid Snap Touch",
    category: "Instant Cameras",
    price: 99.89,
    originalPrice: null,
    image: cameraPink,
    badge: null,
    favorite: true,
  },
  {
    id: 3,
    name: "Apple Watch 7",
    category: "Smart Watches",
    price: 399.99,
    originalPrice: null,
    image: appleWatchTeal,
    badge: null,
    favorite: false,
  },
  {
    id: 4,
    name: "Xbox Mini One Controller",
    category: "Gaming Devices",
    price: 49.99,
    originalPrice: 99.99,
    image: controllerYellow,
    badge: "SALE",
    favorite: false,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="rounded-2xl overflow-hidden border group hover:shadow-lg transition-shadow">
              <div className="relative bg-muted/30 p-6 aspect-square flex items-center justify-center">
                {product.badge && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                    {product.badge}
                  </Badge>
                )}
                <button
                  className={`absolute top-4 left-4 p-2 rounded-lg transition-colors ${
                    product.favorite
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-background/80 hover:bg-background"
                  }`}
                >
                  <Heart className="h-4 w-4" fill={product.favorite ? "currentColor" : "none"} />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button size="sm" variant="outline" className="rounded-lg">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
