import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Photos from "./pages/Photos";
import { ThemeProvider } from "./context/ThemeContext";
import { CursorTooltipProvider } from "./context/CursorTooltipContext";
import CursorTooltip from "./components/CursorTooltip";
import LangCard from "./pages/projects/LangCard";
import LangooV2 from "./pages/projects/LangooV2";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CursorTooltipProvider>
          <CursorTooltip />
          <div className="text-default dark:text-white font-mono min-h-screen flex flex-col max-w-3xl mx-auto h-full">
            <Header />
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/photos" element={<Photos />} />
              <Route path="/projects/langcard" element={<LangCard />} />
              <Route path="/projects/langoo-v2" element={<LangooV2 />} />
            </Routes>
            <Footer />
          </div>
        </CursorTooltipProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
