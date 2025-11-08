import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    title: "Excellent",
    rating: 5,
    author: "Alexey P.",
    date: "2 days ago",
    content:
      "Excellent, large screen, like a tablet. The sensors are sensitive when the spaceship takes up a lot of space. Nice colors from the sides and the quality is good.",
  },
  {
    id: 2,
    title: "Not bad",
    rating: 3,
    author: "Maria F.",
    date: "5 days ago",
    content:
      "The controller is good. Excellent in gaming. However, the buttons are really creaky and weird at times. Still purchased.",
  },
  {
    id: 3,
    title: "Great quality",
    rating: 5,
    author: "John D.",
    date: "2 weeks ago",
    content:
      "It's just a fairy tale. Smartphone control. There is even a quick search. It is almost impossible to find it in stores, and everyone is chill about it so weird.",
  },
];

const Reviews = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Popular Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="rounded-2xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{review.title}</h3>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.content}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">{review.author}</span>
                <button className="text-sm text-primary hover:underline">
                  Read more
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
