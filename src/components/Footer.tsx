import { useCursorTooltip } from "@/context/CursorTooltipContext";
import {
  ArrowUpRightIcon,
  PaperPlaneTiltIcon,
  XLogoIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  MailboxIcon,
} from "@phosphor-icons/react";
import { ReactNode } from "react";

const socialLinks: {
  href: string;
  icon: ReactNode;
  tooltip: ReactNode;
}[] = [
  {
    href: "mailto:btorndorff@gmail.com",
    icon: <MailboxIcon size={20} weight="bold" />,
    tooltip: (
      <div className="flex items-center gap-2">
        <PaperPlaneTiltIcon size={16} weight="bold" /> btorndorff@gmail.com
      </div>
    ),
  },
  {
    href: "https://x.com/borffstuff",
    icon: <XLogoIcon size={20} weight="bold" />,
    tooltip: <ArrowUpRightIcon size={16} weight="bold" />,
  },
  {
    href: "https://github.com/btorndorff",
    icon: <GithubLogoIcon size={20} weight="bold" />,
    tooltip: <ArrowUpRightIcon size={16} weight="bold" />,
  },
  {
    href: "https://www.linkedin.com/in/benjaminorndorff/",
    icon: <LinkedinLogoIcon size={20} weight="bold" />,
    tooltip: <ArrowUpRightIcon size={16} weight="bold" />,
  },
];

export default function Footer() {
  const { setTooltip } = useCursorTooltip();

  return (
    <footer className="md:absolute md:bottom-0 w-full flex justify-center items-center pb-32 md:pb-0">
      <div className="flex justify-center md:justify-between items-center gap-2 w-full md:bg-gradient-to-t from-background-bottom via-background-bottom/85 to-transparent py-3 px-6">
        <span className="hidden md:block text-sm font-mono text-secondary">
          → UPDATED 12/27/25
        </span>

        <div className="flex gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-secondary transition-colors group"
                onMouseEnter={() => setTooltip(link.tooltip)}
                onMouseLeave={() => setTooltip(null)}
                target="_blank"
              >
                {Icon}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
