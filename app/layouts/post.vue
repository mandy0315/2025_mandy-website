<script setup lang="ts">
const isShowSidebar = useCookie('isShowSidebar', {
  default: () => true,
  path: '/',
  watch: true,
});
const toggleSidebar = () => {
  isShowSidebar.value = !isShowSidebar.value;
  refreshCookie('isShowSidebar');
}
const { sidebarHeightCalc, headerHeight } = useLayoutSizes();
const { isDesktop } = useResponsive();

watch(isDesktop, (val) => {
  if (!val) {
    isShowSidebar.value = true;
    refreshCookie('isShowSidebar');
  }
});

const sidebarStyle = computed(() => ({
  '--sidebar-top': `${headerHeight.value}px`,
  '--sidebar-height': sidebarHeightCalc.value,
}));

const { isLoading } = usePageLoading();
</script>

<template>
  <div class="flex flex-col min-h-screen" :class="isLoading
    ? 'opacity-0 pointer-events-none'
    : 'opacity-100 pointer-events-auto'">
    <AppHeader />
    <main class="lg:flex-1 mt-24">
      <div class="flex flex-col lg:flex-row relative c-container">
        <div class="flex-1 lg:w-[calc(100%-15rem)] lg:pr-4 lg:min-h-screen">
          <slot />
        </div>

        <div class="transition-all ease-linear flex flex-col lg:sticky sidebar-container"
          :class="isShowSidebar ? 'w-full lg:w-60' : 'w-0'" :style="sidebarStyle">

          <BaseButton size="sm" variant="solid"
            class="absolute rounded-l-3xl rounded-r-none top-16 right-full z-50 text-nowrap hidden lg:block"
            @click="toggleSidebar">
            <Icon v-if="isShowSidebar" name="solar:double-alt-arrow-right-line-duotone" class="align-middle"
              size="1rem" />
            <Icon v-else name="solar:double-alt-arrow-left-line-duotone" size="1rem" class="align-middle" />
            <span class="text-xs">
              {{ isShowSidebar ? '收回' : '側邊欄' }}
            </span>
          </BaseButton>

          <div class="hidden lg:block rounded-t-full bg-primary/10 h-20 relative shrink-0"></div>

          <aside class="lg:bg-primary/10 overflow-hidden flex-1">
            <div class="h-full overflow-y-auto transition-opacity lg:px-4"
              :class="isShowSidebar ? 'opacity-100 delay-400' : 'opacity-0'">
              <slot name="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>

</template>
<style scoped>
.sidebar-container {
  top: 0;
  height: auto;
}

@media (min-width: 1024px) {
  .sidebar-container {
    top: var(--sidebar-top);
    height: var(--sidebar-height);
  }
}
</style>