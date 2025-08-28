export default defineNuxtRouteMiddleware((to, from) => {
  const { toggleStartLoading } = usePageLoading();
  if (to.path !== from.path) {
    toggleStartLoading.value = true;
  }
});
