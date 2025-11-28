import { useMediaQuery } from "@vueuse/core";

export const useResponsive = () => {
  if (import.meta.server) {
    return {
      isMobile: ref(false),
      isTablet: ref(false),
      isDesktop: ref(false),
    };
  }
  const isMobile = useMediaQuery("(max-width: 767px)"); // < 768px
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)"); // 768-1023px
  const isDesktop = useMediaQuery("(min-width: 1024px)"); // >= 1024px
  return {
    isDesktop,
    isMobile,
    isTablet,
  };
};
