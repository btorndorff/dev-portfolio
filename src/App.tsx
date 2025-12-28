import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "@/components/Header";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Photos from "@/pages/Photos";
import { ThemeProvider } from "@/context/ThemeContext";
import { CursorTooltipProvider } from "@/context/CursorTooltipContext";
import CursorTooltip from "@/components/CursorTooltip";
import LangCard from "@/pages/projects/LangCard";
import LangooV2 from "@/pages/projects/LangooV2";
import Footer from "@/components/Footer";
import Noi from "@/pages/projects/Noi";
import { AnimatePresence, motion } from "motion/react";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <Routes location={location}>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/projects/langcard" element={<LangCard />} />
          <Route path="/projects/langoo-v2" element={<LangooV2 />} />
          <Route path="/projects/noi" element={<Noi />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CursorTooltipProvider>
          <CursorTooltip />
          <div className="text-default font-mono h-screen flex flex-col max-w-3xl mx-auto relative overflow-hidden">
            <Header />
            <div className="flex flex-col justify-between flex-1 h-full gap-16 overflow-y-auto no-scrollbar">
              <main className="px-6 pt-24 md:pb-16">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </div>
        </CursorTooltipProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
