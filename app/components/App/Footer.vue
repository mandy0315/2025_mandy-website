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
  <footer ref="footerRef" class="bg-[var(--bg-color)]/50 relative z-50">
    <div class="c-container flex justify-between items-center py-2">
      <div>
        <IconLogoHorizontal class="dark:fill-white w-36" />
        <div class="pt-2">
          <p class="c-text-secondarys text-xs pl-1 pb-2">
            <em>嗨～我是蔓蒂<br />可以透過以下方式聯絡我：</em>
          </p>
          <div class="flex gap-x-1">
            <BaseIconLink icon="mdi:email" to="mailto:mandy3152618@gmail.com" external />
            <BaseIconLink icon="mdi:facebook" to="https://www.facebook.com/MandyTsai0315" target="_blank" external />
            <BaseIconLink icon="mdi:github" to="https://github.com/mandy0315" target="_blank" external />
          </div>
        </div>
      </div>
      <div>
        <BaseLink v-for="item in pageInfo.values()" variant="underline" :to="item.path" class="text-xs no-underline">{{
          item.title }}
        </BaseLink>
      </div>
    </div>
  </footer>
</template>