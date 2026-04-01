import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mapPins } from "@/data/mockData";
import mapBackground from "@/assets/map-background.jpg";

const MapPage = () => {
  const [selectedPin, setSelectedPin] = useState<typeof mapPins[0] | null>(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full relative">
      {/* Mock map background */}
      <div className="flex-1 relative bg-accent overflow-hidden" style={{ minHeight: "calc(100vh - 64px)" }}>
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=1200&fit=crop"
          alt="Map"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Grid overlay for map feel */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }} />

        {/* Map pins */}
        {mapPins.map((pin, i) => (
          <motion.button
            key={pin.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            onClick={() => setSelectedPin(pin)}
            className="absolute flex flex-col items-center"
            style={{
              left: `${15 + (i * 13) % 70}%`,
              top: `${15 + ((i * 17 + 5) % 55)}%`,
            }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg border-2 border-card ${
              selectedPin?.id === pin.id ? "bg-primary scale-110" : "bg-card"
            } transition-all`}>
              {pin.emoji}
            </div>
            <div className="bg-card rounded-md px-1.5 py-0.5 mt-1 shadow-sm border border-border">
              <span className="text-[9px] font-medium text-card-foreground">{pin.title}</span>
            </div>
          </motion.button>
        ))}

        {/* Center marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary-foreground shadow-lg" />
          <div className="w-20 h-20 rounded-full border-2 border-primary/30 absolute -left-8 -top-8 animate-pulse" />
        </div>

        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-background/80 to-transparent">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Nearby Sellers</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Taman Melawati, KL</p>
        </div>
      </div>

      {/* Selected pin popup */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="absolute bottom-20 left-4 right-4 bg-card rounded-2xl border border-border shadow-xl p-4"
          >
            <button
              onClick={() => setSelectedPin(null)}
              className="absolute top-3 right-3 p-1 text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-2xl">
                {selectedPin.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{selectedPin.title}</h3>
                <Badge
                  variant={selectedPin.price === null ? "default" : "secondary"}
                  className="text-[10px] mt-1"
                >
                  {selectedPin.price === null ? "Free" : `RM${selectedPin.price}`}
                </Badge>
              </div>
            </div>
            <Button className="w-full mt-3 rounded-xl gap-2" size="sm">
              <MessageCircle className="w-4 h-4" />
              Chat with Seller
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapPage;