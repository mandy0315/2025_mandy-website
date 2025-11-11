<script setup lang="ts">
import { pageInfo } from '@/utils/pageInfoMap';

const { setFooterObserver } = useLayoutSizes();

const footerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (footerRef.value) {
    setFooterObserver(footerRef.value);
  }
});
</script>
<template>
  <footer ref="footerRef" class="bg-[var(--bg-color)] relative z-50 py-10 lg:py-6">
    <div class="c-container flex flex-col lg:flex-row lg:justify-between items-center py-2">
      <div class="pb-4">
        <IconLogoHorizontal class="dark:fill-white w-36" />
        <div class="pt-2">
          <p class="c-text-secondarys text-xs pl-1 pb-2 text-center lg:text-left">
            <em><span class="hidden lg:block">嗨～我是蔓蒂</span>可以透過以下方式聯絡我：</em>
          </p>
          <div class="flex gap-x-1 justify-center lg:justify-start">
            <BaseIconLink icon="mdi:email" to="mailto:mandy3152618@gmail.com" external />
            <BaseIconLink icon="mdi:facebook" to="https://www.facebook.com/MandyTsai0315" target="_blank" external />
            <BaseIconLink icon="mdi:github" to="https://github.com/mandy0315" target="_blank" external />
          </div>
        </div>
      </div>
      <div class="lg:mt-auto">
        <div class="lg:pb-2">
          <BaseLink v-for="item in pageInfo.values()" variant="underline" :to="item.path" class="text-xs no-underline">
            {{
              item.title }}
          </BaseLink>
        </div>
        <p class="text-xs text-center lg:text-right">©2024-2025 MandySpace.</p>
      </div>
    </div>
  </footer>
</template>