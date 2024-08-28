import React, { useState } from "react";

const IconButton = ({
  icon,
  selected,
  onClick,
}: {
  icon: string;
  selected: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  const iconSrc = `/icons/${icon}${hovered || selected ? "-dark" : ""}.svg`;

  return (
    <img
      src={iconSrc}
      alt={icon}
      className="cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

export default IconButton;
