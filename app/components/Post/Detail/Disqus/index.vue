<script setup lang="ts">
import type { DisqusInstance } from './types'

declare global {
  interface Window {
    DISQUS?: DisqusInstance;
    disqus_config?: () => void;
  }
};

const props = defineProps<{
  id: string;
  title: string;
}>()

const route = useRoute();
const colorMode = useColorMode();
const loaded = ref(false);

const disqusConfig = () => ({
  identifier: props.id,
  url: route.path,
  title: props.title
});

const loadDisqus = () => {
  if (loaded.value) return;

  window.disqus_config = disqusConfig;

  const script: HTMLScriptElement = document.createElement('script');
  script.src = 'https://2025-mandy-website.disqus.com/embed.js';
  script.setAttribute('data-timestamp', String(+new Date()));

  setTimeout(() => {
    document.head.appendChild(script);
    loaded.value = true;
  }, 1000);
}

/** 重建 Disqus */
const reloadDisqus = async (): Promise<void> => {
  await nextTick();

  // 清空 Disqus 容器元素
  const disqusThread = document.getElementById('disqus_thread');
  if (disqusThread) {
    disqusThread.innerHTML = '';
  };

  // 找到並移除 Disqus 腳本
  document.querySelectorAll('script').forEach(script => {
    if (script.src.includes('disqus.com')) {
      script.remove()
    };
  });

  // 清除 Disqus 相關的全局變量
  delete window.DISQUS;
  delete window.disqus_config;

  // 重置載入狀態
  loaded.value = false;
  // 等待 1 秒後重新載入 Disqus
  setTimeout(() => {
    loadDisqus();
  }, 1000);
};

onMounted(() => {
  loadDisqus();
});

watch(() => route.path, async (from, to) => {
  if (from === to) return;
  await reloadDisqus();
});

watch(colorMode, async () => {
  await reloadDisqus();
});
</script>

<template>
  <div id="disqus_thread"></div>
</template>
