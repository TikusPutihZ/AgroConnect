import { useState } from "react";
import { Camera, MapPin, ScanLine, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const CreatePost = () => {
  const [isSelling, setIsSelling] = useState(false);
  const [price, setPrice] = useState("");
  const [aiEstimating, setAiEstimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Post published! 🌱", {
      description: "Your listing is now live.",
    });
  };

  const handleAiEstimate = () => {
    setAiEstimating(true);
    toast.info("📸 Scanning your crop...", { description: "AI is analyzing the image" });
    setTimeout(() => {
      const prices = ["4.50", "8.00", "2.50", "6.00", "3.00"];
      const suggested = prices[Math.floor(Math.random() * prices.length)];
      setPrice(suggested);
      setAiEstimating(false);
      toast.success(`💡 Suggested price: RM${suggested}`, {
        description: "Based on current market rates",
      });
    }, 2000);
  };

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Share Your Harvest</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          List your crop for neighbors to enjoy
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-5 pb-8 space-y-5">
        {/* Image upload */}
        <div className="w-full aspect-[16/10] rounded-xl border-2 border-dashed border-border bg-muted flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
          <Camera className="w-10 h-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Tap to add photos</p>
          <p className="text-[10px] text-muted-foreground">JPEG or PNG, max 5MB</p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Plant Title</Label>
          <Input id="title" placeholder="e.g. Cherry Tomatoes" className="rounded-xl" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            placeholder="Tell your neighbors about your crop..."
            className="rounded-xl min-h-[100px]"
          />
        </div>

        {/* Sell / Give toggle */}
        <div className="flex items-center justify-between bg-muted rounded-xl p-4">
          <div>
            <p className="text-sm font-medium text-foreground">
              {isSelling ? "Selling" : "Giving Away"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isSelling ? "Set your price below" : "Share for free with neighbors"}
            </p>
          </div>
          <Switch checked={isSelling} onCheckedChange={setIsSelling} />
        </div>

        {/* Price with AI estimator */}
        {isSelling && (
          <div className="space-y-2">
            <Label htmlFor="price">Price (RM)</Label>
            <div className="flex gap-2">
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="rounded-xl flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAiEstimate}
                disabled={aiEstimating}
                className="rounded-xl gap-1.5 border-primary text-primary hover:bg-primary/10 shrink-0"
              >
                {aiEstimating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ScanLine className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <ScanLine className="w-4 h-4" />
                )}
                <Zap className="w-3 h-3" />
                AI Price
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Use the AI estimator to scan your crop and get a suggested price
            </p>
          </div>
        )}

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Pickup Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="e.g. Taman Melawati, KL"
              className="pl-9 rounded-xl"
            />
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl">
          Publish Post 🌿
        </Button>
      </form>
    </motion.div>
  );
};

export default CreatePost;