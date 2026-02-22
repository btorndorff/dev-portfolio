export interface WritingFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  link?: string;
  hidden?: boolean;
}

export interface WritingModule {
  default: React.ComponentType;
  frontmatter: WritingFrontmatter;
}
