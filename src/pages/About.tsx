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
    <div className="space-y-3">
      <div className="text-sm font-mono">{title}</div>
      <div className="text-secondary text-lg leading-relaxed">{children}</div>
    </div>
  );
};

const About = () => {
  const { setTooltip } = useCursorTooltip();

  return (
    <main className="px-6 h-screen relative">
      <div className="h-full overflow-y-auto no-scrollbar space-y-16 pt-24 pb-16">
        <div className="flex gap-6 items-center w-full">
          <img
            src="/images/pfp_lg.jpeg"
            alt="Me"
            className="size-32 shrink-0 object-cover"
            onMouseEnter={() => setTooltip("me & ghib")}
            onMouseLeave={() => setTooltip(null)}
          />
          <h1 className="text-3xl md:text-5xl font-semibold">
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
    </main>
  );
};

export default About;
