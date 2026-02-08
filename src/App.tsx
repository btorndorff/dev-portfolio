import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectPage from "@/pages/ProjectPage";
import { CursorTooltipProvider } from "@/context/CursorTooltipContext";
import CursorTooltip from "@/components/CursorTooltip";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "motion/react";
import HalftoneBackground from "@/components/HalftoneBackground";
import Paper from "@/components/Paper";
import Header from "@/components/Header";
import { playPaperSlip, playPaperClick } from "@/lib/sounds";
import Photos from "@/pages/Photos";
import isDesktopPhotosPage from "@/lib/isDesktopPhotosPage";
import { cn } from "./lib/utils";

function AppContent() {
  const location = useLocation();
  const isDesktopPhotosRoute = isDesktopPhotosPage();

  return (
    <div
      className={cn(
        "relative z-10 min-h-screen flex flex-col items-center pt-[15vh] overflow-hidden",
        isDesktopPhotosRoute && "justify-end pointer-events-none"
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          exit={isDesktopPhotosRoute ? {} : { y: "100vh" }}
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
          <Paper
            className={cn(
              isDesktopPhotosRoute &&
                "!min-h-0 !h-fit after:!h-screen after:bottom-0 pointer-events-auto"
            )}
          >
            <div className="flex flex-col justify-between gap-8 flex-1">
              <div className="flex flex-col gap-8">
                <Header />
                <Routes location={location}>
                  <Route path="/" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<ProjectPage />} />
                  <Route path="/photos" element={<Photos />} />
                </Routes>
              </div>
              {!isDesktopPhotosRoute && <Footer />}
            </div>
          </Paper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CursorTooltipProvider>
        <CursorTooltip />
        <HalftoneBackground />
        <AppContent />
      </CursorTooltipProvider>
    </Router>
  );
}

export default App;
