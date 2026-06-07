import type { ContentFrontmatter, ContentModule } from '@/types/content';

export type Section = 'work' | 'play';

// import.meta.glob needs static literal patterns, so glob each section's folder
// separately and select by section at call time.
const workModules = import.meta.glob<ContentModule>('../content/work/*.mdx', {
  eager: true,
});
const playModules = import.meta.glob<ContentModule>('../content/play/*.mdx', {
  eager: true,
});

const modulesFor = (section: Section) =>
  section === 'work' ? workModules : playModules;

export interface ContentEntry {
  slug: string;
  frontmatter: ContentFrontmatter;
  Component: React.ComponentType;
}

const toEntries = (section: Section): ContentEntry[] => {
  const prefix = `../content/${section}/`;
  return Object.entries(modulesFor(section)).map(([path, module]) => ({
    slug: path.replace(prefix, '').replace('.mdx', ''),
    frontmatter: module.frontmatter,
    Component: module.default,
  }));
};

export function getEntries(section: Section): ContentEntry[] {
  return toEntries(section)
    .filter((entry) => !entry.frontmatter.hidden)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getEntryBySlug(
  section: Section,
  slug: string,
): ContentEntry | undefined {
  return toEntries(section).find((entry) => entry.frontmatter.slug === slug);
}

// previewMedia can be an image or a video (R2 URLs); infer from the extension.
export function isVideo(url: string): boolean {
  return /\.(mp4|webm|mov|m4v|ogg)$/i.test(url);
}
