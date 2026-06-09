import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import About from "@/pages/About";
import ContentList from "@/pages/ContentList";
import ContentPage from "@/pages/ContentPage";
import { CursorTooltipProvider } from "@/context/CursorTooltipContext";
import CursorTooltip from "@/components/CursorTooltip";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "motion/react";
import Paper from "@/components/Paper";
import Header from "@/components/Header";
import { playPaperSlip, playPaperClick } from "@/lib/sounds";
import isDesktopPhotosPage from "@/lib/isDesktopPhotosPage";
import Photos from "@/pages/Photos";
import { cn } from "./lib/utils";

// Split the shader bundle (@paper-design/shaders-react, WebGL) out of the
// initial JS — it's the background and doesn't block first paint. Photos is
// NOT lazy-loaded: the /photos route reshapes the Paper card synchronously
// (isDesktopPhotosPage), so a Suspense gap would briefly collapse the card.
const HalftoneBackground = lazy(() => import("@/components/HalftoneBackground"));

function AppContent() {
  const location = useLocation();
  const isDesktopPhotosRoute = isDesktopPhotosPage();

  return (
    <div
      className={cn(
        "relative z-10 min-h-screen flex flex-col items-center pt-[8vh] overflow-hidden",
        isDesktopPhotosRoute && "justify-end pointer-events-none",
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
                "!min-h-0 !h-fit after:!h-screen after:bottom-0 pointer-events-auto",
            )}
          >
            <div className="flex flex-col justify-between gap-8 flex-1">
              <div className="flex flex-col gap-8">
                <Header />
                <Routes location={location}>
                  <Route path="/" element={<About />} />
                  <Route path="/work" element={<ContentList section="work" />} />
                  <Route
                    path="/work/:slug"
                    element={<ContentPage section="work" />}
                  />
                  <Route path="/play" element={<ContentList section="play" />} />
                  <Route
                    path="/play/:slug"
                    element={<ContentPage section="play" />}
                  />
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
        {/* Beige base (set in HalftoneBackground's style) shows until the
            shader chunk loads, so the page is never blank. */}
        <Suspense fallback={null}>
          <HalftoneBackground />
        </Suspense>
        <AppContent />
      </CursorTooltipProvider>
    </Router>
  );
}

export default App;
