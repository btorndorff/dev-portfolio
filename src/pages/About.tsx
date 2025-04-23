import Section from "../components/Section";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="max-w-3xl mx-auto px-6 h-[calc(100vh-64px)] mt-16 relative">
      <div className="h-full overflow-y-auto no-scrollbar">
        <h1 className="text-5xl font-bold mb-20 dark:text-white pt-8">
          Hi, I'm Ben Orndorff!
        </h1>

        <Section title="WORK" percentage="50%">
          <p>
            SF Full Stack Software Engineer committed to creating beautiful and
            impactful digital solutions. Currently at{" "}
            <a
              href="https://www.replo.app/"
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Replo
            </a>
            , where I work on creating tools to revolutionize e-commerce.
          </p>
        </Section>

        <Section title="SIDE" percentage="30%">
          <p>
            In my spare time, I'm working on side projects like{" "}
            <Link
              to="/projects/langoo-v2"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Langoo
            </Link>
            , a personal language learning dashboard, and{" "}
            <Link
              to="/projects/langcard"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              LangCard
            </Link>
            , generative language learning anki flashcards, to help people learn
            languages.
          </p>
        </Section>

        <Section title="LIFE" percentage="20%">
          <p>
            When I'm not deep in code, I'm learning Vietnamese and Japanese or
            out shooting{" "}
            <Link
              to="/photos"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              film photos
            </Link>{" "}
            on my Canon F-1.
          </p>
        </Section>
      </div>
    </main>
  );
};

export default About;
