import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import iphone13 from "@/assets/iphone-13-blue.png";

const SpecialOffer = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="rounded-2xl overflow-hidden border-0 bg-gradient-to-br from-category-dark to-category-dark/90">
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-sm font-medium">Special Offer</span>
                <span className="text-2xl">✨</span>
              </div>
              
              <h2 className="text-4xl font-bold">
                New Apple iPhone 13 Pro Blue
              </h2>
              
              <p className="text-white/70 text-lg">
                The most advanced pro camera system ever on iPhone. Super-fast 5G. Durable design and the best battery life ever in an iPhone.
              </p>
              
              <div className="space-y-3">
                <p className="text-sm text-white/70">Storage capacity</p>
                <div className="flex gap-3">
                  {["128", "44", "256", "512"].map((size, index) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        index === 1
                          ? "bg-white text-category-dark font-semibold"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <div className="text-lg font-bold">{size}</div>
                      <div className="text-xs opacity-70">
                        {index === 0 ? "Basic" : index === 1 ? "Medium" : "Storage"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <Button size="lg" className="rounded-lg">
                  Buy $999.99
                </Button>
                <Badge variant="outline" className="border-white/20 text-white">
                  🍎 Online shop only
                </Badge>
              </div>
            </div>

            {/* Right Content - Product Image */}
            <div className="relative flex items-center justify-center">
              <div className="relative animate-fade-in">
                <img
                  src={iphone13}
                  alt="iPhone 13 Pro Blue"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SpecialOffer;
