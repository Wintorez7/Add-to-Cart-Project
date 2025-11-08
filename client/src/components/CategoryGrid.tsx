import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import cameraBlue from "@/assets/camera-blue.png";
import actionCamera from "@/assets/action-camera.png";
import ledSpeakers from "@/assets/led-speakers.png";
import gamingController from "@/assets/gaming-controller.png";
import headphonesBlue from "@/assets/headphones-blue.png";

const categories = [
  {
    id: 1,
    title: "Electronics",
    subtitle: "From $39.99",
    image: cameraBlue,
    bgColor: "bg-category-dark",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Travelling",
    subtitle: "From $29.99",
    image: actionCamera,
    bgColor: "bg-category-dark",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Music & Sound",
    subtitle: "From $39.99",
    image: ledSpeakers,
    bgColor: "bg-category-blue",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "I am a Gamer",
    subtitle: "From $19.99",
    image: gamingController,
    bgColor: "bg-category-pink",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "All categories",
    subtitle: "From $9.99",
    image: headphonesBlue,
    bgColor: "bg-card",
    textColor: "text-foreground",
  },
  {
    id: 6,
    title: "Special Offers",
    subtitle: "From $59.99",
    image: null,
    bgColor: "bg-card",
    textColor: "text-foreground",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`${category.bgColor} ${category.textColor} p-8 rounded-2xl border-0 overflow-hidden relative group cursor-pointer hover-scale transition-all`}
            >
              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
                  <p className={`text-sm ${category.textColor === "text-white" ? "text-white/70" : "text-muted-foreground"}`}>
                    {category.subtitle}
                  </p>
                </div>
                
                <button className={`flex items-center gap-2 ${category.textColor === "text-white" ? "text-white" : "text-primary"} font-medium group-hover:gap-3 transition-all`}>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              
              {category.image && (
                <div className="absolute bottom-0 right-0 w-48 h-48 transform translate-x-6 translate-y-6">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
