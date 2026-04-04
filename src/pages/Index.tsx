import { useState } from "react";
import { Search, MapPin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import agroconnectOriginal from "@/assets/agroConnect_LogoWithName-removebg-preview.png";
import bgPicIndex from "@/assets/Bg_Pic_Index.jpg";
import bgpicHeader from "@/assets/Bg_Pic_Header.jpg";
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
      className="relative flex min-h-full flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >

      <div className="relative z-10 flex min-h-full flex-col">
    {/* Header Container */}
    <div className="relative border-b border-green-200/60 px-5 pb-4 pt-6 overflow-hidden">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-30" // Adjust opacity-20 (0.2) to your liking
        style={{
          backgroundImage: `url(${bgpicHeader})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

    <div className="absolute inset-0 bg-emerald-200/20" aria-hidden />

      {/* Content Layer (Must have relative and z-10 to sit above image) */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-0.5">
            <div className="flex h-7 w-auto items-center">
              <img src={agroconnectOriginal} alt="Logo" className="h-7 w-auto object-contain" />
            </div>
            <div className="leading-tight">
              <span className="font-cursive text-base text-emerald-800/70 leading-none">by RasaRakyat</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/chats")}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-200/70 bg-white/70 text-emerald-800/80 shadow-sm transition hover:bg-emerald-50 hover:text-primary"
            aria-label="Messages"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-green-900 mt-2 ml-3">
          Hello, Neighbor!
        </h2>
        <p className="text-sm font-medium text-emerald-800/85 mt-0.5 ml-3">
          Fresh crops from your community
        </p>
      </div>
    </div>

      {/* Search bar */}
      <div className="px-5 mb-3 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 z-[1] -translate-y-1/2 w-4 h-4 text-emerald-700/55" />
          <Input
            placeholder="Search crops, herbs, fruits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 rounded-xl border border-emerald-200/80 bg-white/90 shadow-sm placeholder:text-emerald-900/35 focus-visible:border-primary/40 focus-visible:ring-primary/20"
          />
        </div>
        {/* Inspirational card */}
        <div className="mt-4">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-100/90 via-teal-50/80 to-green-100/90 p-4 shadow-sm">
            <img
              src={bgPicIndex}
              alt="Community farm field"
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-900/95 px-2.5 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
                🌿 Grow Together!
              </span>
              <h3 className="text-lg font-bold text-emerald-950 drop-shadow-sm">
                Join the village harvest community
              </h3>
              <p className="text-sm leading-relaxed text-emerald-900/90">
                List your fresh produce, support neighbors, and earn from local demand. Your next harvest hero story starts here.
              </p>
            </div>
          </div>
        </div>

        {/* Location chips */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide -mx-0.5 px-0.5">
          {distances.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDistance(d)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap border transition-colors",
                activeDistance === d
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "border-emerald-200/90 bg-white/85 text-emerald-900/75 hover:border-primary/35 hover:bg-emerald-50"
              )}
            >
              <MapPin className="w-3 h-3 opacity-90" />
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mb-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors",
              !activeCategory
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "border-emerald-200/90 bg-white/85 text-emerald-900/75 hover:border-primary/35 hover:bg-emerald-50"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "border-emerald-200/90 bg-white/85 text-emerald-900/75 hover:border-primary/35 hover:bg-emerald-50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="px-4 pb-6 flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-emerald-900">Recent listings</h2>
          <span className="text-[11px] font-medium text-emerald-700/80 tabular-nums">{filtered.length} nearby</span>
        </div>
        {filtered.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <PostCard
              post={post}
              className="border-black-200/80 bg-white/85 shadow-sm hover:border-primary/25 hover:shadow-md"
            />
          </motion.div>
        ))}
      </div>
      </div>
    </motion.div>
  );
};

export default Index;