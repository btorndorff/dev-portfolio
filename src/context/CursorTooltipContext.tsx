import { createContext, useContext, useState, ReactNode } from "react";

interface CursorTooltipContextType {
  tooltip: ReactNode | null;
  setTooltip: (content: ReactNode | null) => void;
}

const CursorTooltipContext = createContext<CursorTooltipContextType | null>(
  null
);

export const CursorTooltipProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tooltip, setTooltip] = useState<ReactNode | null>(null);

  return (
    <CursorTooltipContext.Provider value={{ tooltip, setTooltip }}>
      {children}
    </CursorTooltipContext.Provider>
  );
};

export const useCursorTooltip = () => {
  const context = useContext(CursorTooltipContext);
  if (!context) {
    throw new Error(
      "useCursorTooltip must be used within a CursorTooltipProvider"
    );
  }
  return context;
};
