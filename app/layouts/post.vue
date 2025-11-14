<script setup lang="ts">
const isShowSidebar = useCookie('isShowSidebar', {
  default: () => false,
  path: '/',
  watch: true,
});
const toggleSidebar = () => {
  isShowSidebar.value = !isShowSidebar.value;
  refreshCookie('isShowSidebar');
}
const { sidebarHeightCalc, headerHeight } = useLayoutSizes();
const { isDesktop } = useResponsive();
const getSidebarClass = computed(() => {
  if (!isDesktop.value) return 'w-full';
  return isShowSidebar.value ? 'w-60' : 'w-0';
});
const getSidebarStyle = computed(() => {
  const sidebarHeight = isDesktop.value ? sidebarHeightCalc.value : 'auto';
  const topHeight = isDesktop.value ? `${headerHeight.value}px` : 0;
  return { top: topHeight, height: sidebarHeight }
})
</script>
<template>
  <div class="flex flex-col lg:flex-row relative c-container">
    <div class="flex-1 lg:pr-4 lg:min-h-screen">
      <slot />
    </div>

    <div class="transition-all ease-linear lg:sticky flex flex-col" :class="getSidebarClass" :style="getSidebarStyle">

      <BaseButton size="sm" variant="solid"
        class="absolute rounded-l-3xl rounded-r-none top-16 right-full z-50 text-nowrap hidden lg:inline-block"
        @click="toggleSidebar">

        <Icon v-if="isShowSidebar" name="solar:double-alt-arrow-right-line-duotone" class="align-middle " size="1rem" />
        <Icon v-else name="solar:double-alt-arrow-left-line-duotone" size="1rem" class="align-middle" />
        <span class="text-xs">
          {{ isShowSidebar ? '收回' : '側邊欄' }}
        </span>
      </BaseButton>
      <div class="hidden lg:inline-block rounded-t-full bg-primary/10 h-20 relative flex-shrink-0">
      </div>

      <aside class="lg:bg-primary/10 overflow-hidden flex-1">
        <div class="h-full overflow-y-auto transition-opacity lg:px-4"
          :class="isShowSidebar ? 'opacity-100 delay-400' : 'opacity-0'">
          <slot name="sidebar" />
        </div>
      </aside>
    </div>
  </div>
</template>