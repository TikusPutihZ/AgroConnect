import { useState } from "react";
import { Search, MapPin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import agroconnectCircle from "@/assets/agroconnect-circle.png";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/PostCard";
import { posts, categories } from "@/data/mockData";
import { cn } from "@/lib/utils";

const distances = ["My Area", "1 km", "5 km", "10 km"];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeDistance, setActiveDistance] = useState("5 km");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = posts
    .filter((p) => !activeCategory || p.category === activeCategory)
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-2">
              <img src={agroconnectCircle} alt="AgroConnect" className="h-10 w-10 object-contain" />
              <div>
                <h1 className="text-lg font-bold text-primary tracking-tight">AgroConnect</h1>
                <span className="font-cursive text-[10px] text-muted-foreground leading-none">by RasaRakyat</span>
              </div>
            </div>
          </div>
          <button onClick={() => navigate("/chats")} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Hello, Neighbor! 👋</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Fresh crops from your community
        </p>
      </div>

      {/* Search bar */}
      <div className="px-5 mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search crops, herbs, fruits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-muted border-0 rounded-xl"
          />
        </div>
        {/* Location chips */}
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
          {distances.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDistance(d)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap border transition-colors",
                activeDistance === d
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border"
              )}
            >
              <MapPin className="w-3 h-3" />
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mb-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors",
              !activeCategory
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-muted-foreground px-1">
          Recent Listings
        </h2>
        {filtered.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Index;