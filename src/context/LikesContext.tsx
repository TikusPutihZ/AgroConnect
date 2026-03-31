import { createContext, useContext, useState, ReactNode } from "react";

interface LikesContextType {
  likedIds: Set<string>;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
}

const LikesContext = createContext<LikesContextType | null>(null);

export const LikesProvider = ({ children }: { children: ReactNode }) => {
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set(["3", "6"])); // pre-liked for demo

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isLiked = (id: string) => likedIds.has(id);

  return (
    <LikesContext.Provider value={{ likedIds, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error("useLikes must be used within LikesProvider");
  return ctx;
};