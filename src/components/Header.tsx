import { Link, NavLink, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { ArrowLeftIcon } from "@phosphor-icons/react";

const navItems = [
  { to: "/", label: "ABOUT" },
  { to: "/projects", label: "PROJECTS" },
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
  const isAbout = location.pathname === "/";
  const isProjectDetail =
    location.pathname.startsWith("/projects/") &&
    location.pathname !== "/projects";
  const { setTooltip } = useCursorTooltip();

  if (isProjectDetail) {
    return (
      <div className="flex items-start w-full">
        <Link
          to="/projects"
          className="flex items-center gap-2 text-black hover:text-primary transition-colors duration-300"
        >
          <ArrowLeftIcon size={20} weight="bold" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-start w-full">
      {isAbout ? (
        <img
          src="/images/pfp_lg.jpeg"
          alt="Me"
          className="size-32 shrink-0 object-cover"
          onMouseEnter={() => setTooltip("me & ghib")}
          onMouseLeave={() => setTooltip(null)}
        />
      ) : (
        <Link
          to="/"
          className="text-2xl font-mono text-black hover:text-primary transition-colors duration-300"
        >
          <span className="group">
            BTO<span className="inline-block group-hover:hidden">.</span>
            <span className="hidden group-hover:inline-block">!</span>
          </span>
        </Link>
      )}

      <Nav />
    </div>
  );
}
