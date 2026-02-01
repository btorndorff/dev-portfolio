export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  link?: string;
}

export interface ProjectModule {
  default: React.ComponentType;
  frontmatter: ProjectFrontmatter;
}
