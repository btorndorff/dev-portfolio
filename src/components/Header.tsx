import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import isDesktopPhotosPage from "@/lib/isDesktopPhotosPage";

const navItems = [
  { to: "/", label: "ABOUT" },
  { to: "/writing", label: "WRITING" },
  { to: "/photos", label: "PHOTOS" },
];

const Nav = () => {
  return (
    <div className="flex flex-col items-end gap-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            twMerge(
              "text-base",
              isActive
                ? "text-primary"
                : "text-black hover:text-primary transition-colors duration-300",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isWritingDetail =
    location.pathname.startsWith("/writing/") &&
    location.pathname !== "/writing";
  const isDesktopPhotosRoute = isDesktopPhotosPage();

  if (isWritingDetail || isDesktopPhotosRoute) {
    return (
      <div className="flex items-center w-full justify-between">
        <button
          onClick={() =>
            window.history.length > 1 ? navigate(-1) : navigate("/")
          }
          className="flex items-center gap-2 text-black hover:text-primary transition-colors duration-300 z-10"
        >
          <ArrowLeftIcon size={20} weight="bold" />
        </button>
        {isDesktopPhotosRoute && (
          <span className="text-black text-sm">shot on film</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start w-full">
      <Link
        to="/"
        className="text-2xl font-mono text-black hover:text-primary transition-colors duration-300"
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
