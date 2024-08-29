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
            src="/icons/mail.svg"
            alt="email"
            className="cursor-pointer"
            onClick={() => handleRedirect("mailto:btorndorff@gmail.com")}
          />
        </div>
      </div>

      <p className="text-left w-full md:w-2/3 self-center">
        Hi, I'm Ben, amatuer designer and somewhat profession full stack
        software engineer. I enjoy building cool things end to end and working
        on challenges. I am a language learning enthusiast as well as love film
        photography!
      </p>
    </div>
  );
};

export default About;
