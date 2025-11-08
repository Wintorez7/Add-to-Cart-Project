import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Warranty Card */}
          <Card className="rounded-2xl p-8 bg-primary text-primary-foreground border-0">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Warranty</h3>
                <p className="text-primary-foreground/80">
                  The store guarantees you 1 year standard warranty cover from purchase. Extended warranties can be purchased separately. Contact support for more info.
                </p>
              </div>
            </div>
          </Card>

          {/* Newsletter Card */}
          <Card className="rounded-2xl p-8 border">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Sign up to receive special offers, news and great events.
                </h3>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="E-mail"
                  className="rounded-lg h-12"
                />
                
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" className="mt-1" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    I agree to the Privacy Policy and Terms and Conditions
                  </label>
                </div>
                
                <Button className="w-full rounded-lg h-12">
                  Subscribe
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
