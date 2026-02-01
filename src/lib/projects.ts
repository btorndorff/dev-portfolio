import type { ProjectFrontmatter, ProjectModule } from '@/types/project';

// Use import.meta.glob to load all MDX files
const projectModules = import.meta.glob<ProjectModule>(
  '../content/projects/*.mdx',
  { eager: true }
);

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  Component: React.ComponentType;
}

export function getAllProjects(): Project[] {
  const projects = Object.entries(projectModules).map(([path, module]) => {
    const slug = path.replace('../content/projects/', '').replace('.mdx', '');
    return {
      slug,
      frontmatter: module.frontmatter,
      Component: module.default,
    };
  });

  // Sort by date descending (newest first)
  return projects.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((project) => project.frontmatter.slug === slug);
}
