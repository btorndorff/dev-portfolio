import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-2 md:gap-4 text-gray-600 dark:text-gray-400 text-sm md:text-lg">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "text-gray-800 dark:text-gray-200" : "hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          }
        >
          ABOUT
        </NavLink>
        <span className="text-gray-400 dark:text-gray-600">|</span>
        <NavLink 
          to="/projects" 
          className={({ isActive }) => 
            isActive ? "text-gray-800 dark:text-gray-200" : "hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          }
        >
          PROJECTS
        </NavLink>
        <span className="text-gray-400 dark:text-gray-600">|</span>
        <NavLink 
          to="/photos" 
          className={({ isActive }) => 
            isActive ? "text-gray-800 dark:text-gray-200" : "hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          }
        >
          PHOTOS
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;