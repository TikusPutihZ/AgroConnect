import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/mockData";
import { useLikes } from "@/context/LikesContext";
import { cn } from "@/lib/utils";

const meetupLocations: Record<string, string> = {
  "1": "Taman Melawati Community Centre",
  "2": "Kampung Baru Food Court",
  "3": "Bukit Jalil Park Entrance",
  "4": "Setiawangsa Market Pavilion",
  "5": "Ampang Street Lantern Plaza",
  "6": "Kota Damansara Green Market",
  "7": "SS2 Night Food Hub",
  "8": "Subang Jaya Central Mall",
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);
  const { isLiked, toggleLike } = useLikes();

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  const liked = isLiked(post.id);

  return (
    <motion.div
      className="flex flex-col min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header image */}
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full aspect-[4/3] object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="fixed w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-md z-50"
          style={{ top: 'calc(50vh - 422px + 16px)', left: 'calc(50vw - 195px + 16px)' }}
        >
          <ArrowLeft className="w-5 h-5 text-card-foreground" />
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => toggleLike(post.id)}
            className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-md"
          >
            <Heart className={cn("w-5 h-5", liked ? "fill-destructive text-destructive" : "text-card-foreground")} />
          </button>
        </div>
        <Badge
          variant={post.price === null ? "default" : "secondary"}
          className="absolute bottom-4 left-4 text-sm px-3 py-1"
        >
          {post.price === null ? "Free" : `RM${post.price}`}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{post.quantity} available</p>
        </div>

        {/* Poster info */}
        <div className="flex items-center gap-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-foreground">{post.user.name}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {post.distance}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {post.postedAt}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-1">Description</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
        </div>

        {/* Meet-up Place */}
        <div className="rounded-xl bg-green-900 p-4 text-white shadow-inner">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Meet-up Place
          </h3>
          <p className="text-sm">{meetupLocations[post.id] ?? "Near local community spot"}</p>
        </div>

        {/* Deal Safely */}
        <div className="rounded-xl border bg-white p-4">
          <h3 className="text-sm font-bold mb-3 text-green-900">🛡️ Deal Safely</h3>
          <ul className="space-y-2 text-xs text-green-900">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Meet in public, busy places during daylight hours</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Bring someone you trust with you</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Inspect items before paying</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Trust your instincts—if something feels off, walk away</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Use secure payment methods</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Share your location with a trusted friend</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 p-4 bg-background border-t border-border">
        <Button className="w-full h-12 text-base font-semibold rounded-xl gap-2" onClick={() => navigate(`/chat/1`)}>
          <MessageCircle className="w-5 h-5" />
          Chat with Seller
        </Button>
      </div>
    </motion.div>
  );
};

export default PostDetail;