import { useParams, Navigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { getWritingBySlug } from '@/lib/writing';
import { mdxComponents } from '@/components/MDXComponents';
import { Article } from '@/components/Article';

const WritingPage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/writing" replace />;
  }

  const entry = getWritingBySlug(slug);

  if (!entry) {
    return <Navigate to="/writing" replace />;
  }

  const { frontmatter, Component } = entry;

  return (
    <MDXProvider components={mdxComponents}>
      <Article title={frontmatter.title} date={frontmatter.date} link={frontmatter.link}>
        <Component />
      </Article>
    </MDXProvider>
  );
};

export default WritingPage;
