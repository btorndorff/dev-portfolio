declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { ProjectFrontmatter } from '@/types/project';

  export const frontmatter: ProjectFrontmatter;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
