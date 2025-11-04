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
  <header ref="headerRef" class="fixed z-100 p-4 flex items-center justify-between w-full backdrop-blur-xs">
    <NuxtLink to="/" class="block w-20">
      <IconLogo class="dark:fill-white" />
    </NuxtLink>
    <AppMenu class="hidden lg:block" />
    <div class="flex items-center gap-x-2">
      <AppColorModel />
      <AppSearch />
      <AppMenu class="block lg:hidden" />
    </div>
  </header>

</template>
<style scoped>
.write-vertical-right {
  writing-mode: vertical-rl;
}
</style>
