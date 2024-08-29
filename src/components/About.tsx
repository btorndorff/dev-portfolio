import React from "react";

const About = () => {
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
          src="dev-portfolio/images/me.jpeg"
          alt="me"
          className="rounded-full border-black border-4 object-cover"
        />
        <div className="flex gap-3">
          <img
            src="dev-portfolio//icons/github.svg"
            alt="github"
            className="cursor-pointer"
            onClick={() => handleRedirect("https://github.com/btorndorff")}
          />
          <img
            src="dev-portfolio//icons/linkedin.svg"
            alt="linkedin"
            className="cursor-pointer"
            onClick={() =>
              handleRedirect("https://www.linkedin.com/in/benjaminorndorff")
            }
          />
        </div>
      </div>

      <p className="text-left w-full md:w-2/3 self-center">
        Our longing isn’t surprising given that the Internet doesn’t look too
        hopeful these days. Every month there seems to be another obituary for
        an internet “public square” dismantled by private interventions.
        Companies are cracking down on the open internet, AI startups are
        harvesting our data to automate our livelihoods, and the spaces we’ve
        hung out in for years are kicking us out and changing the rules by the
        day. The Internet, now, feels like monopolized app stores, devices that
        slowly die and can’t be repaired, and pages crammed with content
        perfected for machines rather than people. New platforms promise a
        wonderful new world to users and, once it has them, slowly die.
      </p>
    </div>
  );
};

export default About;
