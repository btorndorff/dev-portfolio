import React from "react";

const LangCard = () => {
  return (
    <div className="flex flex-col md:flex-row w-full md:px-4">
      {/* Left Side - Video */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="w-full h-64 bg-gray-200">
          <video
            className="w-full h-full object-cover"
            controls
            src="https://res.cloudinary.com/dcdfuucla/video/upload/v1724911203/dev-portfolio/rprhwkcpiiayosofbqsr.mov"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center pt-1 md:pt-0 md:px-4 font-light text-left md:text-center">
        <div>
          <p>
            LangCard is a personal project I've been working on to help my
            language learning + explore OpenAI's tools. It allows users to
            generate flashcards from audio in the language they are learning.
            The flashcards can be exported and used in applications like Quizlet
            or Anki.
          </p>
          <p className="mt-2">
            The process works as follows: <strong>Whisper → GPT → TTS</strong>.
          </p>
          <p className="mt-2">
            Check it out here:{" "}
            <a
              href="https://lang-card.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              lang-card.pages.dev
            </a>
          </p>
        </div>
        <div className="mt-2">
          <a
            href="https://github.com/btorndorff/lang-card"
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

export default LangCard;
