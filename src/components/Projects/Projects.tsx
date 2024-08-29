import React, { useState } from "react";
import ProjectItem from "./ProjectItem.tsx";
import ProjectContent from "./ProjectContent.tsx";
import LangCard from "./LangCard.tsx";

interface Project {
  title: string;
  component: React.ReactNode;
  wip: boolean;
}

const Projects: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      // Close the item by removing it from the array
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      // Open the item by adding it to the array
      setOpenItems([...openItems, index]);
    }
  };

  const projects: Project[] = [
    {
      title: "Lang Card - AI Generated Flashcards",
      component: <LangCard />,
      wip: true,
    },
  ];

  return (
    <div className="w-4/5 md:w-3/4 mx-auto overflow-y-auto hide-scrollbar mb-5">
      {projects.map((project, index) => (
        <ProjectItem
          key={index}
          title={project.title}
          isOpen={openItems.includes(index)}
          toggleItem={() => toggleItem(index)}
          wip={project.wip}
        >
          {project.component}
        </ProjectItem>
      ))}
      <div className="border-t-4 border-black"></div>
    </div>
  );
};

export default Projects;
