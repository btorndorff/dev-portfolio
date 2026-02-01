import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Photos from "@/pages/Photos";
import { CursorTooltipProvider } from "@/context/CursorTooltipContext";
import CursorTooltip from "@/components/CursorTooltip";
import LangCard from "@/pages/projects/LangCard";
import LangooV2 from "@/pages/projects/LangooV2";
import Footer from "@/components/Footer";
import Noi from "@/pages/projects/Noi";
import { AnimatePresence, motion } from "motion/react";
import HalftoneBackground from "@/components/HalftoneBackground";
import Paper from "@/components/Paper";
import Header from "@/components/Header";
import { playPaperSlip, playPaperClick, unlockAudio } from "@/lib/sounds";
import { useEffect } from "react";

function AnimatedPaper() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        onAnimationStart={(definition) => {
          if (typeof definition === "object" && definition.y === "100vh") {
            playPaperSlip();
          }
        }}
        onAnimationComplete={(definition) => {
          if (typeof definition === "object" && definition.y === 0) {
            playPaperClick();
          }
        }}
        className="w-full flex justify-center"
      >
        <Paper>
          <div className="flex flex-col justify-between gap-8 flex-1">
            <Header />
            <Routes location={location}>
              <Route path="/" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/projects/langcard" element={<LangCard />} />
              <Route path="/projects/langoo-v2" element={<LangooV2 />} />
              <Route path="/projects/noi" element={<Noi />} />
            </Routes>
            <Footer />
          </div>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const handleInteraction = () => {
      unlockAudio();
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("click", handleInteraction);
    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  return (
    <Router>
      <CursorTooltipProvider>
        <CursorTooltip />
        <HalftoneBackground />
        <div className="relative z-10 min-h-screen flex flex-col items-center pt-[15vh] overflow-hidden">
          <AnimatedPaper />
        </div>
      </CursorTooltipProvider>
    </Router>
  );
}

export default App;
