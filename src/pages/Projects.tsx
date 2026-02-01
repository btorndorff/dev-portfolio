import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { getAllProjects } from "@/lib/projects";

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
        <h2 className="text-lg font-bold text-black">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
        <span className="text-sm text-gray-500">
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

const Projects = () => {
  const projects = getAllProjects();

  const projectCards = projects.map((project) => ({
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    link: `/projects/${project.frontmatter.slug}`,
    date: new Date(project.frontmatter.date),
  }));

  return (
    <div className="flex flex-col gap-3">
      {projectCards.map((project, index) => (
        <div key={project.link}>
          <ProjectCard
            title={project.title}
            description={project.description}
            link={project.link}
            date={project.date}
          />
          {index < projectCards.length - 1 && (
            <div className="bg-gray-400/20 h-[1px] w-full mt-3" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
