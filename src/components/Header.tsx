import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import isDesktopPhotosPage from "@/lib/isDesktopPhotosPage";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "ABOUT" },
  { to: "/work", label: "WORK" },
  { to: "/play", label: "PLAY" },
  { to: "/photos", label: "PHOTOS" },
];

const Nav = () => {
  return (
    <div className="flex gap-0.5 md:gap-2">
      {navItems.map((item, i) => (
        <span key={item.to} className="flex gap-2">
          {i > 0 && <span className="text-gray-400">/</span>}
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              twMerge(
                "text-base",
                isActive
                  ? "text-primary"
                  : "text-gray-600 hover:text-black transition-colors duration-300",
              )
            }
          >
            {item.label}
          </NavLink>
        </span>
      ))}
    </div>
  );
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isContentDetail = /^\/(work|play)\/.+/.test(location.pathname);
  const isDesktopPhotosRoute = isDesktopPhotosPage();

  if (isContentDetail || isDesktopPhotosRoute) {
    return (
      <div
        className={cn(
          "flex items-center w-full justify-between",
          isDesktopPhotosRoute && "pb-3",
        )}
      >
        <button
          onClick={() =>
            window.history.length > 1 ? navigate(-1) : navigate("/")
          }
          className="flex items-center gap-2 text-black hover:text-gray-500 transition-colors z-10"
        >
          <ArrowLeftIcon size={20} weight="bold" />
        </button>
        {isDesktopPhotosRoute && (
          <span className="text-sm text-black">shot on film</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center w-full">
      <Link
        to="/"
        className="text-base md:text-xl font-mono text-black hover:text-primary transition-colors duration-300"
      >
        <span className="group">
          BTO<span className="inline-block group-hover:hidden">.</span>
          <span className="hidden group-hover:inline-block">!</span>
        </span>
      </Link>

      <Nav />
    </div>
  );
}
