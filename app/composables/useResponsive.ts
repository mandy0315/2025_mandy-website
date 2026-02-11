import { useMediaQuery } from "@vueuse/core";

export const useResponsive = () => {
  const SSR_WIDTH = 375; // SSG 時假設為手機版，避免樣式跳動
  const isMobile = useMediaQuery("(max-width: 767px)", {
    ssrWidth: SSR_WIDTH,
  });

  const isDesktop = useMediaQuery("(min-width: 768px)", {
    ssrWidth: SSR_WIDTH,
  });

  return {
    isMobile,
    isDesktop,
  };
};
