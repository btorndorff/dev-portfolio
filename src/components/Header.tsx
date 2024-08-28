import React, { useState } from "react";

const Header = ({
  selectedPage,
  onClick,
}: {
  selectedPage: string;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  const getHeaderText = () => {
    let headerText = "";

    if (selectedPage === "home" || selectedPage === "about") {
      headerText = "Ben Orndorff";
    } else {
      headerText = selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1);
    }

    if (hovered) {
      headerText += "!";
    }

    return headerText;
  };

  return (
    <h1
      className="text-5xl md:text-8xl font-bold mb-3 cursor-pointer transition-opacity duration-500 ease-in-out"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {getHeaderText()}
    </h1>
  );
};

export default Header;
