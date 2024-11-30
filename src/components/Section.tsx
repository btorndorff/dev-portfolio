import React from 'react';

interface SectionProps {
  title: string;
  percentage: string;
  children: React.ReactNode;
}

const Section = ({ title, percentage, children }: SectionProps) => {
  return (
    <div className="mb-16">
      <div className="text-sm font-mono mb-4 dark:text-white">
        {percentage} {title}
      </div>
      <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{children}</div>
    </div>
  );
};

export default Section;