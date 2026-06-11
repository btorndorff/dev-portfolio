export interface ContentFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  previewMedia: string;
  layout?: "article" | "blank";
  link?: string;
  hidden?: boolean;
  ogImage?: string;
}

export interface ContentModule {
  default: React.ComponentType;
  frontmatter: ContentFrontmatter;
}
