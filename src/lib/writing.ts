import type { WritingFrontmatter, WritingModule } from '@/types/writing';

// Use import.meta.glob to load all MDX files
const writingModules = import.meta.glob<WritingModule>(
  '../content/writing/*.mdx',
  { eager: true }
);

export interface WritingEntry {
  slug: string;
  frontmatter: WritingFrontmatter;
  Component: React.ComponentType;
}

export function getAllWriting(): WritingEntry[] {
  const entries = Object.entries(writingModules)
    .map(([path, module]) => {
      const slug = path.replace('../content/writing/', '').replace('.mdx', '');
      return {
        slug,
        frontmatter: module.frontmatter,
        Component: module.default,
      };
    })
    .filter((entry) => !entry.frontmatter.hidden);

  // Sort by date descending (newest first)
  return entries.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getWritingBySlug(slug: string): WritingEntry | undefined {
  const allEntries = Object.entries(writingModules).map(([path, module]) => {
    const entrySlug = path.replace('../content/writing/', '').replace('.mdx', '');
    return {
      slug: entrySlug,
      frontmatter: module.frontmatter,
      Component: module.default,
    };
  });
  return allEntries.find((entry) => entry.frontmatter.slug === slug);
}
