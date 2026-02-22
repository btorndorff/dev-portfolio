import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { getAllWriting } from "@/lib/writing";

interface WritingCardProps {
  title: string;
  link: string;
  description?: string;
  date: Date;
}

const WritingCard = ({ title, link, description, date }: WritingCardProps) => {
  const { setTooltip } = useCursorTooltip();

  return (
    <Link
      to={link}
      className="block w-full hover:opacity-50 transition-opacity duration-300"
      onMouseEnter={() =>
        setTooltip(<ArrowRightIcon size={16} weight="bold" />)
      }
      onMouseLeave={() => setTooltip(null)}
      onClick={() => setTooltip(null)}
    >
      <div className="h-full flex flex-col gap-3">
        <h2 className="text-lg font-bold text-black">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
        <span className="text-sm text-gray-500">
          {date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
};

const Writing = () => {
  const entries = getAllWriting();

  const cards = entries.map((entry) => ({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    link: `/writing/${entry.frontmatter.slug}`,
    date: new Date(entry.frontmatter.date),
  }));

  return (
    <div className="flex flex-col gap-3">
      {cards.map((card, index) => (
        <div key={card.link}>
          <WritingCard
            title={card.title}
            description={card.description}
            link={card.link}
            date={card.date}
          />
          {index < cards.length - 1 && (
            <div className="bg-gray-400/20 h-[1px] w-full mt-3" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Writing;
