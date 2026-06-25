import { Link } from "react-router-dom";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { INTERNAL_TOOLTIP } from "@/lib/tooltips";
import { getEntries, isVideo, type Section } from "@/lib/content";

interface ContentCardProps {
  title: string;
  link: string;
  previewMedia: string;
  description?: string;
}

const ContentCard = ({
  title,
  link,
  previewMedia,
  description,
}: ContentCardProps) => {
  const { setTooltip } = useCursorTooltip();

  const mediaClassName = "w-full h-full object-cover";

  return (
    <Link
      to={link}
      className="block w-full flex flex-col gap-1 hover:opacity-50 transition-opacity duration-300"
      onMouseEnter={() => setTooltip(INTERNAL_TOOLTIP)}
      onMouseLeave={() => setTooltip(null)}
      onClick={() => setTooltip(null)}
    >
      {isVideo(previewMedia) ? (
        <video
          src={previewMedia}
          autoPlay
          muted
          loop
          playsInline
          className={mediaClassName}
        />
      ) : (
        <img src={previewMedia} alt={title} className={mediaClassName} />
      )}
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm">{title}</h2>
        {description && <p className="text-xs text-gray-600">{description}</p>}
      </div>
    </Link>
  );
};

const ContentList = ({ section }: { section: Section }) => {
  const entries = getEntries(section);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {entries.map((entry) => (
        <ContentCard
          key={entry.frontmatter.slug}
          title={entry.frontmatter.title}
          description={entry.frontmatter.description}
          previewMedia={entry.frontmatter.previewMedia}
          link={`/${section}/${entry.frontmatter.slug}`}
        />
      ))}
    </div>
  );
};

export default ContentList;
