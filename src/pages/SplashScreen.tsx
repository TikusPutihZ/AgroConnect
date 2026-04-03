import { motion } from "framer-motion";
import agroconnectWhite from "@/assets/agroconnect-white.png";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <motion.div
      className="fixed z-[100] flex items-center justify-center w-[390px] h-[844px] rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--primary)), hsl(152, 60%, 30%))",
        left: 'calc(50vw - 195px)',
        top: 'calc(50vh - 422px)',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      onAnimationComplete={() => {}}
    >
      {/* Watery ripple circles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-white/20"
          initial={{ width: 80, height: 80, opacity: 0.6 }}
          animate={{
            width: [80, 400],
            height: [80, 400],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Inner glow circle */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
        }}
        initial={{ width: 200, height: 200 }}
        animate={{ width: [200, 300, 200], height: [200, 300, 200] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={agroconnectWhite}
          alt="AgroConnect"
          className="w-32 h-32 object-contain drop-shadow-2xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white tracking-tight">
            AgroConnect
          </h1>
          <p className="font-cursive text-white/70 text-sm mt-1">
            by RasaRakyat
          </p>
        </motion.div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-white/60"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Auto-dismiss after 3.5 seconds */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3.5 }}
        onAnimationComplete={onFinish}
      />
    </motion.div>
  );
};

export default SplashScreen;
