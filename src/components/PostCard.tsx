import { MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useLikes } from "@/context/LikesContext";
import { cn } from "@/lib/utils";
import type { Post } from "@/data/mockData";

const PostCard = ({ post }: { post: Post }) => {
  const navigate = useNavigate();
  const { isLiked, toggleLike } = useLikes();
  const liked = isLiked(post.id);

  return (
    <div className="flex gap-3 p-3 bg-card rounded-xl border border-border hover:shadow-md transition-shadow w-full text-left relative">
      <button
        onClick={() => navigate(`/post/${post.id}`)}
        className="flex gap-3 flex-1 min-w-0"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex flex-col flex-1 min-w-0 gap-1">
          <div className="flex items-start justify-between gap-2 pr-8">
            <h3 className="font-semibold text-sm text-card-foreground truncate">{post.title}</h3>
            <Badge
              variant={post.price === null ? "default" : "secondary"}
              className={cn(
                "text-[10px] shrink-0",
                post.price === null && "bg-primary text-primary-foreground"
              )}
            >
              {post.price === null ? "Free" : `RM${post.price}`}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{post.quantity}</p>
          <div className="flex items-center gap-1 mt-auto">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{post.distance}</span>
            <span className="text-xs text-muted-foreground ml-auto">{post.postedAt}</span>
          </div>
        </div>
      </button>
      {/* Like button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(post.id);
        }}
        className="absolute top-3 right-3 p-1"
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-colors",
            liked ? "fill-destructive text-destructive" : "text-muted-foreground"
          )}
        />
      </button>
    </div>
  );
};

export default PostCard;