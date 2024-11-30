import ProjectTemplate from '../../components/ProjectTemplate';

const Langoo = () => {
    const projectData = {
        title: "Langoo",
        video: "https://res.cloudinary.com/dcdfuucla/video/upload/f_auto:video,q_auto/v1/dev-portfolio/kayze5pv1dpaxbhnxbn2",
        overview: "A personal language learning dashboard designed to be an (almost) all-in-one platform to support every step of your language journey.",
        features: [
            "Activity Logging - Track any practice with support for text and audio",
            "Streak Tracking - Stay motivated with daily practice tracking",
            "AI-Generated Writing Suggestions - Receive instant, AI-driven writing suggestions",
            "Conversation Practice - Live conversations powered by OpenAI's realtime API",
        ],
        technologies: [
            { name: "Next.js" },
            { name: "React" },
            { name: "TypeScript" },
            { name: "Python Flask" },
            { name: "MongoDB" },
            { name: "OpenAI API" },
            {name: "LiveKit API"}
        ],
        links: [
            {
                text: "GitHub",
                url: "https://github.com/btorndorff/langoo"
            }
        ]
    };

    return (
        <ProjectTemplate {...projectData}/>
    );
};

export default Langoo;