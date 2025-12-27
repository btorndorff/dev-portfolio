import ProjectTemplate from "@/components/ProjectTemplate";

const LangooV2 = () => {
  const projectData = {
    title: "Langoo (v2)",
    video:
      "https://www.loom.com/embed/66e349cfdf0640c9a18a80e71b2f0b0a?sid=c85bec84-337b-4e13-bda7-59bead353346",
    overview:
      "Langoo is a personalized language learning tutor that remembers your language learning journey and adapts to your needs to help you learn a language faster.",
    features: [
      "Human-like understanding and speaking of languages thanks to OpenAI's Speech-to-Speech model",
      "Persisted Memory - Langoo remembers his lessons with you thanks to Mem0",
      "Tailored curriculums for each user based on their goals and learning style that updates as you progress",
    ],
    technologies: [
      { name: "React" },
      { name: "Tanstack Query" },
      { name: "TypeScript" },
      { name: "Hono.js" },
      { name: "Drizzle ORM" },
      { name: "SQLite" },
      { name: "OpenAI realtime sts API" },
      { name: "Gemeni API" },
      { name: "Cloudflare" },
      { name: "BetterAuth" },
    ],
    links: [
      {
        text: "Live Demo",
        url: "https://langoo.pages.dev",
      },
    ],
  };

  return <ProjectTemplate {...projectData} />;
};

export default LangooV2;
