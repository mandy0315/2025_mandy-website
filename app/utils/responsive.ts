import { useMediaQuery } from "@vueuse/core";

const SSR_WIDTH = 768; // ssr 預設寬度 768px，一開始 isMobile 為 false，等到 client 端載入後才會根據實際寬度更新 isMobile 的值

export const isMobile = useMediaQuery("(max-width: 767px)", {
  ssrWidth: SSR_WIDTH,
}); // < 768px
export const isDesktop = computed(() => !isMobile.value);
