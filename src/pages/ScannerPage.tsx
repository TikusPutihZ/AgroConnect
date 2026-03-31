import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanResult {
  name: string;
  price: string;
  confidence: string;
  image: string;
}

const mockResults: ScanResult[] = [
  { name: "Cherry Tomatoes", price: "RM 4.50 / kg", confidence: "96%", image: "🍅" },
  { name: "Thai Basil", price: "RM 2.00 / bunch", confidence: "92%", image: "🌿" },
  { name: "Mango (Harum Manis)", price: "RM 8.00 / kg", confidence: "89%", image: "🥭" },
];

const ScannerPage = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const startScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setScanning(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-foreground relative overflow-hidden">
      {/* Camera viewfinder mock */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-foreground/90" />

        {/* Viewfinder frame */}
        <div className="relative w-64 h-64">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />

          {/* Scanning line animation */}
          {scanning && (
            <motion.div
              className="absolute left-2 right-2 h-0.5 bg-primary shadow-lg shadow-primary/50"
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Center icon */}
          {!scanning && !result && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <ScanLine className="w-12 h-12 text-primary/60" />
              <p className="text-primary/80 text-xs mt-2 font-medium">Point at a crop to scan</p>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-primary-foreground">AI Scanner</h1>
            <p className="text-xs text-primary-foreground/60">Identify crops & estimate prices</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-medium text-primary">AI Powered</span>
          </div>
        </div>
      </div>

      {/* Scan button */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center">
        <Button
          onClick={startScan}
          disabled={scanning}
          className="w-16 h-16 rounded-full shadow-xl shadow-primary/40"
          size="icon"
        >
          <ScanLine className="w-7 h-7" />
        </Button>
      </div>

      {/* Result popup */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute bottom-20 left-4 right-4 bg-card rounded-2xl border border-border shadow-2xl p-5"
          >
            <button
              onClick={() => setResult(null)}
              className="absolute top-3 right-3 p-1 text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-3xl">
                {result.image}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Identified as</p>
                <h3 className="text-lg font-bold text-foreground">{result.name}</h3>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-accent rounded-xl p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Market Price</p>
                <p className="text-sm font-bold text-primary mt-0.5">{result.price}</p>
              </div>
              <div className="bg-accent rounded-xl p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Confidence</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{result.confidence}</p>
              </div>
            </div>
            <Button className="w-full mt-4 rounded-xl">
              Use This Price for Listing
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScannerPage;