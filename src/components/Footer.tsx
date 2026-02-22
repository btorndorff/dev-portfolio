import { useCursorTooltip } from "@/context/CursorTooltipContext";
import {
  ArrowUpRightIcon,
  CheckIcon,
  PaperPlaneTiltIcon,
  XLogoIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  MailboxIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useRef, useState } from "react";

const EMAIL = "btorndorff@gmail.com";

const emailTooltip = (
  <div className="flex items-center gap-2">
    <PaperPlaneTiltIcon size={16} weight="bold" /> {EMAIL}
  </div>
);

const copiedTooltip = (
  <div className="flex items-center gap-2">
    <CheckIcon size={16} weight="bold" /> Copied!
  </div>
);

const socialLinks: {
  href: string;
  icon: ReactNode;
  tooltip: ReactNode;
}[] = [
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
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTooltip(copiedTooltip);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      setTooltip(emailTooltip);
    }, 1500);
  };

  return (
    <footer className="w-full shrink-0">
      <div className="flex justify-between items-center gap-2 w-full">
        <span className="text-sm font-mono text-gray-500">
          → UPDATED 02/21/26
        </span>

        <div className="flex gap-3 text-black">
          <button
            className="relative hover:text-gray-500 transition-colors cursor-pointer size-5"
            onClick={handleCopyEmail}
            onMouseEnter={() =>
              setTooltip(copied ? copiedTooltip : emailTooltip)
            }
            onMouseLeave={() => setTooltip(null)}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <CheckIcon size={20} weight="bold" />
                </motion.span>
              ) : (
                <motion.span
                  key="mailbox"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <MailboxIcon size={20} weight="bold" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gray-500 transition-colors group"
              onMouseEnter={() => setTooltip(link.tooltip)}
              onMouseLeave={() => setTooltip(null)}
              target="_blank"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
