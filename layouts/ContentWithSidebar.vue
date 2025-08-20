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
  <div class="flex">
    <ClientOnly>
      <div class="pb-10 relative w-full">
        <BaseButton size="sm" variant="solid" class="sticky rounded-l-3xl rounded-r-none top-15 left-full z-10"
          @click="toggleSidebar">

          <Icon v-if="isShowSidebar" name="solar:double-alt-arrow-right-line-duotone" size="1rem"
            class="align-middle" />
          <span v-else>
            <Icon name="solar:double-alt-arrow-left-line-duotone" size="1rem" class="align-middle" />
            <span class="align-middle pr-1 text-xs">側邊欄</span>
          </span>
        </BaseButton>
        <div class="pr-4">
          <slot name="content" />
        </div>
      </div>
      <div class="transition-all ease-in delay-150 rounded-l bg-primary/10 h-screen"
        :class="isShowSidebar ? 'w-70' : 'w-0'">
        <!-- 右側目錄 -->
        <aside class="sticky transition-all pt-10 px-4" :class="isShowSidebar ? 'opacity-100 delay-300' : 'opacity-0'">
          <slot name="right-side" />
        </aside>
      </div>
    </ClientOnly>
  </div>
</template>