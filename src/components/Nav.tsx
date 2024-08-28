import React from "react";
import IconButton from "./IconButton.tsx";

const icons = [
  { name: "about", label: "About" },
  { name: "projects", label: "Projects" },
  { name: "photography", label: "Photography" },
];

const Nav = ({
  selectedPage,
  onSelectPage,
}: {
  selectedPage: string;
  onSelectPage: (page: string) => void;
}) => {
  return (
    <div className="flex justify-center items-center gap-7">
      {icons.map((icon) => (
        <IconButton
          key={icon.name}
          icon={icon.name}
          selected={selectedPage === icon.name}
          onClick={() => onSelectPage(icon.name)}
        />
      ))}
    </div>
  );
};

export default Nav;
