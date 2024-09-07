import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import About from "../components/About.tsx";
import Photography from "../components/Photography.tsx";
import Projects from "../components/Projects/Projects.tsx";

const Home = () => {
  const [selectedPage, setSelectedPage] = useState("home");

  return (
    <div className="relative h-screen w-full md:overflow-hidden">
      <div className="relative m-5 h-auto w-auto border-4 border-black p-4 min-h-[calc(100vh-50px)] md:h-[calc(100vh-50px)] w-[calc(100vw-50px)]">
        <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        <div className="flex flex-col items-center h-full w-full overflow-hidden pt-48 md:pt-56">
          {selectedPage === "about" && (
            <About setSelectedPage={setSelectedPage} />
          )}
          {selectedPage === "projects" && <Projects />}
          {selectedPage === "photography" && <Photography />}
        </div>
      </div>
    </div>
  );
};

export default Home;
