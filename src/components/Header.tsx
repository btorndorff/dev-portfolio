import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Nav from './Nav';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed w-full top-0 h-16 bg-gray-50 dark:bg-gray-900 z-50">
      <header className="max-w-3xl mx-auto px-6 h-full flex justify-between items-center relative">
        <Link to="/" className="text-2xl font-mono dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          BTO.
        </Link>
        <Nav />
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'light' ? (
            <Sun className="w-5 h-5 dark:text-white" />
          ) : (
            <Moon className="w-5 h-5 dark:text-white" />
          )}
        </button>
      </header>
    </div>
  );
};

export default Header;