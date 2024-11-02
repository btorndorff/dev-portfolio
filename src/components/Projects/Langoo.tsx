import React from "react";

const Langoo = () => {
  return (
    <div className="flex flex-col md:flex-row w-full md:px-4">
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="w-full h-64 bg-gray-200">
          <video
            className="w-full h-full object-cover"
            controls
            src="https://res.cloudinary.com/dcdfuucla/video/upload/v1730522217/dev-portfolio/kayze5pv1dpaxbhnxbn2.mov"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center pt-1 md:pt-0 md:px-4 font-light text-left md:text-center">
        <div>
          <p>
            Langoo is my personalized language learning dashboard, designed to
            support learning at every stage of the journey. I’ve developed
            features such as activity logging, AI-generated writing suggestions,
            streak tracking, and real-time conversation practice. Built with a
            Next JS frontend with a Flask backend with integrations to MongoDB,
            AWS, OpenAI, and LiveKit.
          </p>
        </div>
        <div className="mt-2">
          <a
            href="https://github.com/btorndorff/langoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/github.svg"
              alt="GitHub"
              className="w-6 h-6 cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Langoo;
