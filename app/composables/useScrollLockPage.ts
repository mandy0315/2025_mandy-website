import { useScrollLock } from "@vueuse/core";

export const useScrollLockPage = () => {
  // 等到客戶端再初始化 useScrollLock
  const isScrollLocked = import.meta.client
    ? useScrollLock(document.body)
    : ref(false);

  return {
    isScrollLocked,
  };
};
