import { cn } from "@/lib/utils";
import Header from "@/components/Header";

interface MinimalPaperProps {
  className?: string;
  children?: React.ReactNode;
}

export default function MinimalPaper({
  className = "",
  children,
}: MinimalPaperProps) {
  return (
    <div
      className={cn(
        "relative bg-white w-[95%] sm:w-[85%] lg:w-[60%] max-w-3xl flex flex-col shadow-lg p-6",
        "after:absolute after:top-[calc(100%-1px)] after:left-0 after:right-0 after:h-screen after:bg-white",
        className
      )}
    >
      <Header />
      {children}
    </div>
  );
}
