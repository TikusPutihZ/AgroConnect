import { useState } from "react";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { currentUser, posts } from "@/data/mockData";
import { useLikes } from "@/context/LikesContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import SettingsSheet from "@/components/SettingsSheet";

const userPosts = posts.filter((p) => p.user.name === currentUser.name);

const ProfilePage = () => {
  const [tab, setTab] = useState<"active" | "liked">("active");
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const { likedIds } = useLikes();

  const likedPosts = posts.filter((p) => likedIds.has(p.id));

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h1 className="text-lg font-bold text-foreground">{currentUser.name}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{currentUser.bio}</p>
          </div>
        </div>
        <button className="p-2 text-muted-foreground" onClick={() => setShowSettings(true)}>
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="mx-5 bg-muted rounded-xl p-4 grid grid-cols-3 gap-1 text-center">
        {([
          ["Given", currentUser.stats.givenAway],
          ["Sold", currentUser.stats.sold],
          ["Followers", currentUser.stats.followers],
        ] as const).map(([label, value]) => (
          <div key={label}>
            <p className="text-lg font-bold text-foreground">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mt-5">
        {(["active", "liked"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              tab === t
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            {t === "active" ? "My Listings" : "Liked Posts"}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {tab === "active" &&
          userPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="bg-card rounded-xl border border-border overflow-hidden text-left"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
              <div className="p-2.5">
                <h3 className="text-xs font-semibold text-card-foreground truncate">{post.title}</h3>
                <Badge
                  variant={post.price === null ? "default" : "secondary"}
                  className="text-[10px] mt-1"
                >
                  {post.price === null ? "Free" : `RM${post.price}`}
                </Badge>
              </div>
            </button>
          ))}

        {tab === "liked" &&
          likedPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => !post.soldOut && navigate(`/post/${post.id}`)}
              className={cn(
                "bg-card rounded-xl border border-border overflow-hidden text-left relative",
                post.soldOut && "opacity-50 pointer-events-none"
              )}
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className={cn(
                    "w-full aspect-square object-cover",
                    post.soldOut && "grayscale"
                  )}
                  loading="lazy"
                />
                {post.soldOut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                    <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-lg rotate-[-12deg]">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-semibold text-card-foreground truncate">{post.title}</h3>
                <Badge
                  variant={post.price === null ? "default" : "secondary"}
                  className="text-[10px] mt-1"
                >
                  {post.price === null ? "Free" : `RM${post.price}`}
                </Badge>
              </div>
            </button>
          ))}

        {tab === "active" && userPosts.length === 0 && (
          <div className="col-span-2 py-12 text-center text-sm text-muted-foreground">
            No active listings
          </div>
        )}
        {tab === "liked" && likedPosts.length === 0 && (
          <div className="col-span-2 py-12 text-center text-sm text-muted-foreground">
            No liked posts yet
          </div>
        )}
      </div>

      <SettingsSheet open={showSettings} onOpenChange={setShowSettings} />
    </motion.div>
  );
};

export default ProfilePage;