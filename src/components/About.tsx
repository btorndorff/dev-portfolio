import React, { useState } from "react";

const About = ({
  setSelectedPage,
}: {
  setSelectedPage: (page: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  const handleRedirect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="w-4/5 md:w-3/4 mx-auto flex flex-col md:flex-row gap-8 opacity-0 transition-opacity duration-500 ease-in-out overflow-y-auto hide-scrollbar"
      style={{
        animation: "fadeIn 0.5s forwards",
      }}
    >
      <div className="flex flex-col items-center gap-3 w-full md:w-1/3">
        <img
          src="/images/me.jpeg"
          alt="me"
          className="rounded-full border-black border-4 object-cover"
        />
        <div className="flex gap-3 items-center justify-center">
          <img
            src="/icons/github.svg"
            alt="github"
            className="cursor-pointer"
            onClick={() => handleRedirect("https://github.com/btorndorff")}
          />
          <img
            src="/icons/linkedin.svg"
            alt="linkedin"
            className="cursor-pointer"
            onClick={() =>
              handleRedirect("https://www.linkedin.com/in/benjaminorndorff")
            }
          />
          <img
            src={`/icons/mail${hovered ? "-open" : ""}.svg`}
            alt="email"
            className="cursor-pointer"
            onClick={() => handleRedirect("mailto:btorndorff@gmail.com")}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </div>
      </div>

      <div className="text-left w-full md:w-2/3 self-center">
        <p>
          Hi! I'm Ben, a full-stack software engineer based in San Francisco. In
          my free time, I love working on fun, challenging projects where I can
          build things from scratch, end-to-end. I'm passionate about language
          learning—currently studying Vietnamese and Japanese—and am always
          looking for innovative ways to contribute to the space! I'm always
          open for a chat, so feel free to reach out wherever you can find me.
        </p>
        <br />
        <p>
          P.S. Check out some of my{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => setSelectedPage("projects")}
          >
            projects
          </span>{" "}
          and{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => setSelectedPage("photgraphy")}
          >
            film photography
          </span>{" "}
          ...
        </p>
      </div>
    </div>
  );
};

export default About;
