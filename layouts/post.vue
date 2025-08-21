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

</script>
<template>
  <div class="flex relative c-container">
    <ClientOnly>
      <div class="flex-1 pr-4 min-h-screen">
        <slot name="content" />
      </div>

      <div class="relative transition-width duration-500 ease-linear" :class="isShowSidebar ? 'w-60' : 'w-0'">
        <div class="sticky top-12 w-full c-sidebar-height">
          <BaseButton size="sm" variant="solid"
            class="absolute rounded-l-3xl rounded-r-none top-16 right-full z-50 text-nowrap" @click="toggleSidebar">

            <Icon v-if="isShowSidebar" name="solar:double-alt-arrow-right-line-duotone" class="align-middle "
              size="1rem" />
            <Icon v-else name="solar:double-alt-arrow-left-line-duotone" size="1rem" class="align-middle" />
            <span class="text-xs">
              {{ isShowSidebar ? '收回' : '側邊欄' }}
            </span>
          </BaseButton>
          <div class="rounded-t-full bg-primary/10 h-20 relative">
          </div>

          <aside class="bg-primary/10 overflow-hidden h-full">
            <div class="h-full overflow-y-auto transition-opacity px-4"
              :class="isShowSidebar ? 'opacity-100 delay-400' : 'opacity-0'">
              <slot name="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>