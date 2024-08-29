import React from "react";

interface ProjectContentProps {
  content: string;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ content }) => {
  return <p>{content}</p>;
};

export default ProjectContent;
