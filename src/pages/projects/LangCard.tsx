import ProjectTemplate from '../../components/ProjectTemplate';

const LangCard = () => {
    const projectData = {
        title: "LangCard",
        video:"https://res.cloudinary.com/dcdfuucla/video/upload/f_auto:video,q_auto/v1/dev-portfolio/gcakh74cpc80xtmarmhc",
        overview: "Generative language learning flashcards powered by AI to help create effective study materials. Created because I couldn't find a good anki set for Vietnamese anywhere.",
        features: [
            "Text and audio input",
            "Example sentence generation",
            "Native level TTS audio generation",
            "Exportable to Anki or Quizlet"
        ],
        technologies: [
            { name: "Next.js" },
            { name: "React" },
            { name: "Typescript" },
            { name: "Python Flask" },
            { name: "OpenAI API" },
            { name: "ElevenLabs API" },
            { name: "Google TTS"}
        ],
        links: [
            {
                text: "GitHub",
                url: "https://github.com/btorndorff/lang-card"
            },
            {
                text: "Live Demo",
                url: "https://langcard.pages.dev"
            }
        ]
    };

    return (
        <ProjectTemplate {...projectData} />
    );
};

export default LangCard; 