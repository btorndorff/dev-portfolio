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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="/projects/langcard" element={<LangCard />} />
      <Route path="/projects/langoo-v2" element={<LangooV2 />} />
      <Route path="/projects/noi" element={<Noi />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <CursorTooltipProvider>
        <CursorTooltip />
        <HalftoneBackground />
        <div className="relative z-10 min-h-screen flex flex-col items-center pt-[15vh]">
          <Paper>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="flex flex-col justify-between gap-8 flex-1"
              >
                <Header />
                <AnimatedRoutes />
                <Footer />
              </motion.div>
            </AnimatePresence>
          </Paper>
        </div>
      </CursorTooltipProvider>
    </Router>
  );
}

export default App;
