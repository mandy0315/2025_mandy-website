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
  <div class="flex relative">
    <ClientOnly>
      <div class="flex-1 pr-4 min-h-screen">
        <slot name="content" />
      </div>

      <div class="w-0 relative transition-all ease-in-out duration-300" :class="isShowSidebar ? 'w-70' : 'w-0'">
        <div class="rounded-t-full bg-primary/10 h-screen sticky top-10">
          <BaseButton size="sm" variant="solid" class="absolute rounded-l-3xl rounded-r-none top-30 right-full z-50"
            @click="toggleSidebar">

            <Icon v-if="isShowSidebar" name="solar:double-alt-arrow-right-line-duotone" class="align-middle"
              size="1rem" />
            <span v-else class="text-nowrap">
              <Icon name="solar:double-alt-arrow-left-line-duotone" size="1rem" class="align-middle" />
              <span class="align-middle pr-1 text-xs">側邊欄</span>
            </span>
          </BaseButton>

          <aside class="h-full overflow-y-auto transition-opacity duration-300 pt-24 px-4"
            :class="isShowSidebar ? 'opacity-100 delay-300' : 'opacity-0'">
            <slot name="right-side" />
          </aside>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>