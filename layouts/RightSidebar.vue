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
  <div class="flex ">
    <ClientOnly>
      <div class="w-full pr-4">
        <slot name="content" />
      </div>

      <div class="transition-all ease-in delay-150 rounded-t-full bg-primary/10 h-screen relative"
        :class="isShowSidebar ? 'w-70' : 'w-0'">
        <BaseButton size="sm" variant="solid" class=" absolute  rounded-l-3xl rounded-r-none top-24 right-full z-10"
          @click="toggleSidebar">

          <Icon v-if="isShowSidebar" name="solar:double-alt-arrow-right-line-duotone" size="1rem"
            class="align-middle" />
          <span v-else class="text-nowrap">
            <Icon name="solar:double-alt-arrow-left-line-duotone" size="1rem" class="align-middle" />
            <span class="align-middle pr-1 text-xs">側邊欄</span>
          </span>
        </BaseButton>
        <!-- 右側目錄 -->
        <aside class="sticky transition-all pt-24 px-4" :class="isShowSidebar ? 'opacity-100 delay-300' : 'opacity-0'">
          <slot name="right-side" />
        </aside>
      </div>
    </ClientOnly>
  </div>
</template>