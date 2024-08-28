import React from "react";

interface ProjectItemProps {
  title: string;
  isOpen: boolean;
  toggleItem: () => void;
  children: React.ReactNode;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  isOpen,
  toggleItem,
  children,
}) => {
  return (
    <div className="border-t-4 border-black">
      <div
        className="flex justify-between items-center text-black p-2 md:p-4 cursor-pointer transition duration-500 ease-in-out"
        onClick={toggleItem}
      >
        <span className="text-xl md:text-2xl font-semibold">{title}</span>
        <span className="text-xl md:text-2xl font-bold">
          {isOpen ? "-" : "+"}
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "translate-y-0 max-h-full opacity-100"
            : "translate-y-4 max-h-0 opacity-0"
        }`}
      >
        <div className="text-black p-4">{children}</div>
      </div>
    </div>
  );
};

export default ProjectItem;
