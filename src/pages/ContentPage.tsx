import { useParams, Navigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { getEntryBySlug, type Section } from '@/lib/content';
import { mdxComponents } from '@/components/MDXComponents';
import { Article } from '@/components/Article';

const ContentPage = ({ section }: { section: Section }) => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to={`/${section}`} replace />;
  }

  const entry = getEntryBySlug(section, slug);

  if (!entry) {
    return <Navigate to={`/${section}`} replace />;
  }

  const { frontmatter, Component } = entry;

  if (frontmatter.layout === "blank") {
    return <Component />;
  }

  return (
    <MDXProvider components={mdxComponents}>
      <Article
        title={frontmatter.title}
        date={frontmatter.date}
        link={frontmatter.link}
      >
        <Component />
      </Article>
    </MDXProvider>
  );
};

export default ContentPage;
