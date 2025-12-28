import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useCursorTooltip } from "@/context/CursorTooltipContext";

interface ProjectCardProps {
  title: string;
  link: string;
  description?: string;
  date: Date;
}

const ProjectCard = ({ title, link, description, date }: ProjectCardProps) => {
  const { setTooltip } = useCursorTooltip();
  return (
    <Link
      to={link}
      className="block w-full hover:opacity-50 transition-opacity duration-300"
      onMouseEnter={() =>
        setTooltip(<ArrowRightIcon size={16} weight="bold" />)
      }
      onMouseLeave={() => setTooltip(null)}
      onClick={() => setTooltip(null)}
    >
      <div className="h-full flex flex-col gap-3">
        <h2 className="text-lg font-bold">{title}</h2>
        {description && <p className="text-secondary">{description}</p>}
        <span className="text-sm text-secondary">
          {date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
};

const projectCards: ProjectCardProps[] = [
  {
    title: "Noi",
    description: "Language learning video logs with feedback",
    link: "/projects/noi",
    date: new Date("2025-12-27"),
  },
  {
    title: "Langoo",
    description: "Prototyping a personalized Language Learning Tutor",
    link: "/projects/langoo-v2",
    date: new Date("2025-04-23"),
  },
  {
    title: "LangCard",
    description:
      "Generative language learning flashcards to help create effective study materials",
    link: "/projects/langcard",
    date: new Date("2024-10-16"),
  },
];

const Projects = () => {
  return (
    <div className="flex flex-col gap-3">
      {projectCards.map((project, index) => (
        <>
          <ProjectCard
            key={project.link}
            title={project.title}
            description={project.description}
            link={project.link}
            date={project.date}
          />
          {index < projectCards.length - 1 && (
            <div className="bg-gray-400/20 h-[1px] w-full" />
          )}
        </>
      ))}
    </div>
  );
};

export default Projects;
