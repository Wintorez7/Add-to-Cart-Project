import { Button } from "@/components/ui/button";
import heroWatch from "@/assets/hero-watch.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-px w-12 bg-primary"></div>
              <span>01 — 04</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Make life different.
              <br />
              <span className="text-foreground/80">Your life — a ride.</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Whether you're walking, driving, cycling, or taking public transit, 
              smartwatches make it easy every step of the way.
            </p>
            
            <Button size="lg" className="rounded-lg px-8 h-12">
              Buy $99.89
            </Button>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative animate-fade-in">
              <img
                src={heroWatch}
                alt="Smartwatch with blue band"
                className="w-full max-w-xl mx-auto drop-shadow-2xl hover-scale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
