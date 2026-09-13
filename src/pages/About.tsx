import { Link } from "react-router-dom";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { externalTooltip, INTERNAL_TOOLTIP } from "@/lib/tooltips";

const Section = ({
  title,
  to,
  children,
}: {
  title: string;
  to: string;
  children: React.ReactNode;
}) => {
  const { setTooltip } = useCursorTooltip();
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-mono">
        <Link
          to={to}
          className="group text-black hover:text-gray-500 transition-colors duration-300"
          onMouseEnter={() => setTooltip(INTERNAL_TOOLTIP)}
          onMouseLeave={() => setTooltip(null)}
          onClick={() => setTooltip(null)}
        >
          {/* dashes swap to dots on hover, mirroring the BTO logo's . -> ! */}
          <span className="inline-block group-hover:hidden">-</span>
          <span className="hidden group-hover:inline-block">·</span> {title}{" "}
          <span className="inline-block group-hover:hidden">-</span>
          <span className="hidden group-hover:inline-block">·</span>
        </Link>
      </h2>
      <div className="text-gray-600 leading-relaxed text">{children}</div>
    </div>
  );
};

const About = () => {
  const { setTooltip } = useCursorTooltip();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <img
          src="/images/pfp.avif"
          alt="Me"
          width={128}
          height={128}
          className="size-32 shrink-0 object-cover"
          style={{ cursor: "var(--cursor-default)" }}
          decoding="async"
          onMouseEnter={() => setTooltip("me & ghib")}
          onMouseLeave={() => setTooltip(null)}
        />
        <h1 className="text-3xl font-bold text-black">
          Hi there, I'm{" "}
          <span
            onMouseEnter={() => setTooltip("me")}
            onMouseLeave={() => setTooltip(null)}
          >
            Ben!
          </span>
        </h1>
      </div>

      <Section title="WORK" to="/work">
        <p>
          Product Engineer in SF passionate about crafting beautiful user
          experiences. Currently at{" "}
          <a
            href="https://plasmidsaurus.com/"
            target="_blank"
            className="text-primary hover:underline"
            onMouseEnter={() =>
              setTooltip(externalTooltip("https://plasmidsaurus.com/"))
            }
            onMouseLeave={() => setTooltip(null)}
          >
            Plasmidsaurus
          </a>
          , building tools to help scientist analyze their sequencing results.
          Before that, I was at{" "}
          <a
            href="https://www.replo.app/"
            target="_blank"
            className="text-primary hover:underline"
            onMouseEnter={() => setTooltip(externalTooltip("https://www.replo.app/"))}
            onMouseLeave={() => setTooltip(null)}
          >
            Replo
          </a>{" "}
          and{" "}
          <a
            href="https://www.cambly.com/"
            target="_blank"
            className="text-primary hover:underline"
            onMouseEnter={() => setTooltip(externalTooltip("https://www.cambly.com/"))}
            onMouseLeave={() => setTooltip(null)}
          >
            Cambly
          </a>.
        </p>
      </Section>

      <Section title="PLAY" to="/play">
        <p>
          When I'm not working, I'm building tools like{" "}
          <Link
            to="/play/noi"
            className="text-primary hover:underline"
            onMouseEnter={() => setTooltip(INTERNAL_TOOLTIP)}
            onMouseLeave={() => setTooltip(null)}
            onClick={() => setTooltip(null)}
          >
            Noi
          </Link>{" "}
          to make language learning easier for everyone. Also learning
          Vietnamese and Japanese, and shooting{" "}
          <Link
            to="/photos"
            className="text-primary hover:underline"
            onMouseEnter={() => setTooltip(INTERNAL_TOOLTIP)}
            onMouseLeave={() => setTooltip(null)}
            onClick={() => setTooltip(null)}
          >
            film photos
          </Link>
          .
        </p>
      </Section>
    </div>
  );
};

export default About;
