import { LinkIcon } from '@phosphor-icons/react';
import { useCursorTooltip } from '@/context/CursorTooltipContext';

interface ArticleProps {
  title: string;
  date: string;
  link?: string;
  children: React.ReactNode;
}

export function Article({ title, date, link, children }: ArticleProps) {
  const { setTooltip } = useCursorTooltip();

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{title}</h1>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-300"
              onMouseEnter={() => setTooltip(link)}
              onMouseLeave={() => setTooltip(null)}
            >
              <LinkIcon size={20} weight="bold" />
            </a>
          )}
        </div>
        <time className="text-sm text-secondary">{formattedDate}</time>
      </header>
      <div className="prose prose-sm max-w-none">
        {children}
      </div>
    </article>
  );
}
