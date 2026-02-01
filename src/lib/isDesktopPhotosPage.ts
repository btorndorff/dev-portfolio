import { useLocation } from "react-router-dom";
import { useIsDesktop } from "@/hooks/useMediaQuery";

const isDesktopPhotosPage = () => {
  const location = useLocation();
  const isDesktop = useIsDesktop();

  return isDesktop && location.pathname === "/photos";
};

export default isDesktopPhotosPage;
