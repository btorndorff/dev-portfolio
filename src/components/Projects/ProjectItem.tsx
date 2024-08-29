import React from "react";

const ProjectItem = ({
  title,
  isOpen,
  toggleItem,
  children,
  wip,
}: {
  title: string;
  isOpen: boolean;
  toggleItem: () => void;
  children: React.ReactNode;
  wip: boolean;
}) => {
  return (
    <div className="border-t-4 border-black">
      <div
        className="flex justify-between items-center text-black p-2 md:p-4 cursor-pointer transition duration-500 ease-in-out"
        onClick={toggleItem}
      >
        <div className="flex items-center gap-2">
          {wip && (
            <span className="bg-black text-white text-xs px-2 py-2 rounded-[25px] flex items-center gap-1">
              <img src="/icons/hammer.svg" alt="Building" className="w-4 h-4" />
              <p className="hidden md:block">In Progress</p>
            </span>
          )}
          <span className="text-xl md:text-2xl font-semibold">{title}</span>
        </div>
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
        <div className="text-black p-2 md:p-4">{children}</div>
      </div>
    </div>
  );
};

export default ProjectItem;
