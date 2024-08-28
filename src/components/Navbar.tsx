import React from "react";
import Header from "./Header.tsx";
import Nav from "./Nav.tsx";

const Navbar = ({
  selectedPage,
  setSelectedPage,
}: {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
}) => {
  return (
    <nav
      className={`absolute left-0 right-0 transition-all duration-500 ease-in-out ${
        selectedPage === "home"
          ? "top-1/2 transform -translate-y-1/2"
          : "top-10 transform translate-y-0"
      }`}
      style={{ zIndex: 10 }}
    >
      <Header
        selectedPage={selectedPage}
        onClick={() => setSelectedPage("home")}
      />
      <div className="flex justify-center items-center gap-7">
        <Nav selectedPage={selectedPage} onSelectPage={setSelectedPage} />
      </div>
    </nav>
  );
};

export default Navbar;
