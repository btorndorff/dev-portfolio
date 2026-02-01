import { cn } from "@/lib/utils";

interface PaperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Paper({ children, className = "" }: PaperProps) {
  return (
    <div
      className={cn(
        "relative bg-white w-[95%] sm:w-[85%] lg:w-[60%] max-w-3xl min-h-[85vh] flex flex-col shadow-lg p-6",
        "after:absolute after:top-[calc(100%-1px)] after:left-0 after:right-0 after:h-screen after:bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
