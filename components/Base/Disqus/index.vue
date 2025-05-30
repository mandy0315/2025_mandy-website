<script setup lang="ts">
import type { DisqusConfig, DisqusInstance } from './types'

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
  url: window.location.origin + route.path,
  title: props.title
});

const loadDisqus = () => {
  if (loaded.value) return;

  window.disqus_config = disqusConfig;

  const script: HTMLScriptElement = document.createElement('script');
  script.src = 'https://2025-mandy-website.disqus.com/embed.js';
  script.setAttribute('data-timestamp', String(+new Date()));
  script.async = true;
  document.head.appendChild(script);

  loaded.value = true;
}


const resetDisqus = async () => {
  await nextTick();

  if (window.DISQUS && loaded.value) {
    window.DISQUS.reset({
      reload: true,
      config: function (this: DisqusConfig) {
        this.page = disqusConfig();
      }
    });
  };
};

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

watch(() => route.path, async () => {
  if (window.DISQUS && loaded.value) {
    await resetDisqus();
  } else {
    loadDisqus();
  };
});

watch(colorMode, async () => {
  await reloadDisqus();
});
</script>

<template>
  <div>
    <ClientOnly>
      <div id="disqus_thread"></div>
    </ClientOnly>
  </div>
</template>
