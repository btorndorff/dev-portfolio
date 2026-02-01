import { Link } from "react-router-dom";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import {
  HandPointingIcon,
  ArrowUpRightIcon,
  CameraIcon,
} from "@phosphor-icons/react";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-base font-mono text-black">{title}</div>
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
          src="/images/pfp_lg.jpeg"
          alt="Me"
          className="size-32 shrink-0 object-cover"
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

      <Section title="- WORK -">
        <p>
          Full stack engineer in SF passionate about crafting beautiful user
          experiences. Currently at{" "}
          <a
            href="https://www.replo.app/"
            target="_blank"
            className="text-primary hover:underline"
            onMouseEnter={() =>
              setTooltip(<ArrowUpRightIcon size={16} weight="bold" />)
            }
            onMouseLeave={() => setTooltip(null)}
          >
            Replo
          </a>
          , building an AI native ecommerce platform. Before that, I was at{" "}
          <a
            href="https://www.cambly.com/"
            target="_blank"
            className="text-primary hover:underline"
            onMouseEnter={() =>
              setTooltip(<ArrowUpRightIcon size={16} weight="bold" />)
            }
            onMouseLeave={() => setTooltip(null)}
          >
            Cambly
          </a>{" "}
          helping people learn English online.
        </p>
      </Section>

      <Section title="- LIFE -">
        <p>
          When I'm not working, I'm building tools like{" "}
          <Link
            to="/projects/noi"
            className="text-primary hover:underline"
            onMouseEnter={() =>
              setTooltip(<HandPointingIcon size={16} weight="bold" />)
            }
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
            onMouseEnter={() =>
              setTooltip(<CameraIcon size={16} weight="bold" />)
            }
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
