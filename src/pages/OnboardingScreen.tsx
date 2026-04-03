import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import bgPic1 from "@/assets/Bg_Pic1.jpg";
import bgPic2 from "@/assets/Bg_Pic2.jpg";
import bgPic3 from "@/assets/Bg_Pic3.jpg";

const slides = [
  {
    title: "Discover Flowing Farm Insights",
    subtitle: "Know what matters, fast",
    description:
      "Track posts, chat with your community, and find the best produce around you. Swipe to learn more.",
    image: bgPic1,
  },
  {
    title: "Connect with Local Growers",
    subtitle: "Share, ask, and support",
    description:
      "Create impactful posts, send private chat messages, and build trust with real farmers in your network.",
    image: bgPic2,
  },
  {
    title: "Grow Together",
    subtitle: "Purpose-driven agriculture",
    description:
      "Get inspired by community stories, discover new tips, and help local agriculture thrive with your contributions.",
    image: bgPic3,
  }
];

const OnboardingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [current, setCurrent] = useState(0);
  const isLast = current === slides.length - 1;

  const goNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setCurrent((prev) => Math.min(prev + 1, slides.length - 1));
    }
  };

  const goBack = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const slide = slides[current];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center min-h-screen bg-muted">
      <div
        className="w-[390px] h-[844px] bg-cover bg-center rounded-xl overflow-hidden shadow-2xl"
        style={{ backgroundImage: `url('${slide.image}')` }}
      >
        <div className="bg-black/65 backdrop-blur-sm min-h-[844px] flex flex-col justify-between p-6 text-white">
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-blue-200">
              {`Step ${current + 1} of ${slides.length}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-3 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold">{slide.title}</h2>
              <h3 className="text-lg text-blue-100/90">{slide.subtitle}</h3>
              <p className="text-sm md:text-base text-white/90">{slide.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={goBack}
              disabled={current === 0}
              className="rounded-lg border border-white/40 bg-white/10 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            <div className="flex-1 flex items-center justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 w-2 rounded-full ${index === current ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400"
            >
              {isLast ? "Get Started" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
