import { Link, NavLink, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useCursorTooltip } from "@/context/CursorTooltipContext";

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
  const isAbout = useLocation().pathname === "/";
  const { setTooltip } = useCursorTooltip();

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
          BTO.
        </Link>
      )}

      <Nav />
    </div>
  );
}
