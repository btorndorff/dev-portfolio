import { useParams, Navigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { getProjectBySlug } from '@/lib/projects';
import { mdxComponents } from '@/components/MDXComponents';
import { Article } from '@/components/Article';

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/projects" replace />;
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const { frontmatter, Component } = project;

  return (
    <MDXProvider components={mdxComponents}>
      <Article title={frontmatter.title} link={frontmatter.link}>
        <Component />
      </Article>
    </MDXProvider>
  );
};

export default ProjectPage;
