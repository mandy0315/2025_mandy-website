<script setup lang="ts">
const { setHeaderObserver } = useLayoutSizes();

const headerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (headerRef.value) {
    setHeaderObserver(headerRef.value);
  }
});
</script>
<template>
  <header ref="headerRef" class="h-14">
    <NuxtLink to="/" class="fixed z-80 p-5">
      <IconLogo class="w-18 dark:fill-white lg:w-20" />
    </NuxtLink>
    <div
      class="flex items-end fixed z-100 right-4 top-4 flex-row-reverse gap-x-2 lg:flex-col lg:items-center lg:gap-y-2">
      <AppMenu />
      <AppColorModel />
      <AppSearch />
    </div>

    <div class="fixed right-5 text-sm write-vertical-right top-1/2 -translate-y-1/2">@2025mandyspace.</div>

  </header>

</template>
<style scoped>
.write-vertical-right {
  writing-mode: vertical-rl;
}
</style>
