import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { twMerge } from "tailwind-merge";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

const navItems = [
  { to: "/", label: "ABOUT" },
  { to: "/projects", label: "PROJECTS" },
  { to: "/photos", label: "PHOTOS" },
];

const Nav = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-2 md:gap-4 text-gray-600 dark:text-gray-400 text-sm md:text-lg">
        {navItems.map((item, index) => (
          <>
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                twMerge(
                  isActive
                    ? "text-primary"
                    : "text-secondary hover:text-primary transition-colors duration-300"
                )
              }
            >
              {item.label}
            </NavLink>
            {index < navItems.length - 1 && (
              <div className="w-[1px] bg-secondary opacity-50 h-4" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute w-full top-0 h-16 z-50 max-w-3xl mx-auto px-6">
      <header className="h-full w-full flex justify-between items-center relative bg-gradient-to-b from-background-top via-background-top/85 to-transparent">
        <Link
          to="/"
          className="text-2xl font-mono hover:text-primary transition-colors duration-300 group"
        >
          <span className="group-hover:hidden">BTO.</span>
          <span className="hidden group-hover:inline">BTO!</span>
        </Link>
        <Nav />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-300/20 dark:hover:bg-gray-600/20 transition-colors"
        >
          {theme === "light" ? (
            <SunIcon size={20} weight="bold" />
          ) : (
            <MoonIcon size={20} weight="bold" />
          )}
        </button>
      </header>
    </div>
  );
};

export default Header;
