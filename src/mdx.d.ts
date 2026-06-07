declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { ContentFrontmatter } from '@/types/content';

  export const frontmatter: ContentFrontmatter;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
