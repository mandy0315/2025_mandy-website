<script setup lang="ts">
import { useElementVisibility } from "@vueuse/core";
import { pageInfo } from '@/utils/pageInfoMap';

const { isFooterInView, footerHeight } = useLayoutSizes();

const footerRef = ref<HTMLElement | null>(null);
const config = useRuntimeConfig();

const pageVals = computed(() => {
  if (!config.public.SHOW_NOTES_PAGE) {
    return Array.from(pageInfo.values()).filter(item => item.name !== 'notes');
  }
  return Array.from(pageInfo.values());

});

const setFooterObserver = (footerElement: HTMLElement) => {
  // 監聽可見性
  const isFooterVisible = useElementVisibility(footerElement);
  footerHeight.value = footerElement.offsetHeight;

  // 更新全域狀態
  watch(
    isFooterVisible,
    (visible) => {
      isFooterInView.value = visible;
    },
    { immediate: true }
  );
};
onMounted(() => {
  if (footerRef.value) {
    setFooterObserver(footerRef.value);
  }
});
</script>
<template>
  <footer ref="footerRef" class="bg-[--bg-color] relative z-50 py-10 mt-auto lg:py-6">
    <div class="c-container flex flex-col lg:flex-row lg:justify-between items-center py-2">
      <div class="pb-4">
        <IconLogoHorizontal class="dark:fill-white w-36 mx-auto" />
        <div class="pt-2">
          <p class="c-text-secondarys text-base lg:text-xs pl-1 pb-2 text-center lg:text-left">
            <em><span class="hidden lg:block">嗨～我是蔓蒂</span>可以透過以下方式聯絡我：</em>
          </p>
          <div class="flex gap-x-3  lg:gap-x-1 justify-center lg:justify-start">
            <BaseIconLink icon="mdi:email" to="mailto:mandy3152618@gmail.com" />
            <BaseIconLink icon="mdi:facebook" to="https://www.facebook.com/MandyTsai0315" target="_blank" />
            <BaseIconLink icon="mdi:github" to="https://github.com/mandy0315" target="_blank" />
          </div>
        </div>
      </div>
      <div class="lg:mt-auto">
        <nav class="lg:pb-2">
          <BaseLink v-for="item in pageVals" variant="underline" :to="item.path"
            class="text-base lg:text-xs no-underline px-2 py-3 lg:pl-4 lg:pr-0">
            {{
              item.title }}
          </BaseLink>
        </nav>
        <p class="text-xs text-center lg:text-right">©2024-2025 MandySpace.</p>
      </div>
    </div>
  </footer>
</template>