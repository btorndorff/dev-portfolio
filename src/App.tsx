import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Projects from './pages/Projects';
import Photos from './pages/Photos';
import { MobileFooter, DesktopFooter } from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Langoo from './pages/projects/Langoo';
import LangCard from './pages/projects/LangCard';
import Todo from './pages/projects/Todo';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="bg-gray-50 dark:bg-gray-900 font-mono transition-colors">
          <Header />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/projects/langoo" element={<Langoo />} />
            <Route path="/projects/langcard" element={<LangCard />} />
            <Route path="/projects/todo" element={<Todo />} />
          </Routes>
          <MobileFooter />
          <DesktopFooter />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;