export default defineNuxtRouteMiddleware((to, from) => {
  // 第一次載入與切換頁面時觸發 loading;針對 hash 不觸發
  const isFirstLoad = !from.name;
  const isDifferentPage = to.path !== from.path;
  if (isFirstLoad || isDifferentPage) {
    const { startLoading } = usePageLoading();

    nextTick(() => {
      startLoading();
    });
  }
});
