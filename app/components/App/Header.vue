<script setup lang="ts">
const { headerHeight } = useLayoutSizes();

const headerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (headerRef.value) {
    headerHeight.value = headerRef.value.offsetHeight;
  }
});
</script>
<template>
  <header ref="headerRef" class="fixed z-110 p-4 flex items-center justify-between w-full backdrop-blur-xs">
    <BaseLink to="/" class="block w-20" aria-label="前往首頁">
      <IconLogo class="dark:fill-white" />
    </BaseLink>
    <AppMenu class="hidden lg:block" />
    <div class="flex items-center gap-x-4 lg:gap-x-2">
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
