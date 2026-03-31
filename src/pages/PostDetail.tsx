import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/mockData";
import { useLikes } from "@/context/LikesContext";
import { cn } from "@/lib/utils";

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
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-md"
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
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 p-4 bg-background border-t border-border">
        <Button className="w-full h-12 text-base font-semibold rounded-xl gap-2">
          <MessageCircle className="w-5 h-5" />
          Chat with Poster
        </Button>
      </div>
    </motion.div>
  );
};

export default PostDetail;