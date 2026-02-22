declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { WritingFrontmatter } from '@/types/writing';

  export const frontmatter: WritingFrontmatter;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
