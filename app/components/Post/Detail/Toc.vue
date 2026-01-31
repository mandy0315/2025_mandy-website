<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const route = useRoute();
const { currSection,
  setSectionListener } = useSectionTracker();

const { data: collectionAllTocs } = await useAsyncData(`${props.collection}-detail-toc`, () => {
  return queryCollectionSearchSections(props.collection);
});

const tocList = computed(() => {
  const path = route.path.replace(/\/$/, ''); // 移除結尾的斜線
  return collectionAllTocs.value?.filter(toc =>
    toc.id.startsWith(path)
  ) || []
});

const tocsWithNumbers = computed(() => {
  const counters: Record<number, number> = {};

  return tocList.value.map(toc => {
    const level = toc.level;

    // 重置更深層的計數器
    Object.keys(counters).forEach(key => {
      if (Number(key) > level) {
        delete counters[Number(key)];
      }
    });

    // 增加當前層級的計數
    counters[level] = (counters[level] || 0) + 1;

    // 生成編號（例如：1, 1-1, 1-1-1）
    const numbers: number[] = [];
    for (let i = 2; i <= level; i++) {
      numbers.push(counters[i] || 0);
    }

    return {
      ...toc,
      number: numbers.join('-')
    };
  });
});
const initListenerPage = async (retryCount = 0) => {
  if (tocList.value.length === 0) return;
  const maxRetries = 5;
  const delay = Math.min(100 * Math.pow(2, retryCount), 1000);

  const navs = tocList.value.map(toc => {
    const id = toc.id.split('#')[1] || '';
    const element = document.getElementById(id);

    return {
      title: toc.title,
      element
    };
  });


  const foundElements = navs.filter(nav => nav.element).length;

  if (foundElements > 0) {
    setSectionListener({ navs });
    await navigateTo(route.fullPath); // 有抓到元素，重新導航以觸發導航事件
  } else if (retryCount < maxRetries) {
    setTimeout(() => initListenerPage(retryCount + 1), delay);
  } else {
    console.warn('達到最大重試次數，無法找到導航元素');
  }
};
onMounted(() => {
  initListenerPage();
});
</script>
<template>
  <div class="hidden lg:block">
    <p class="font-zen-old-mincho font-bold pb-2 text-lg border-b c-border-secondary">
      <span class="pr-2">目錄</span>
      <span>Toc</span>
    </p>

    <nav class="px-3 py-5">
      <ClientOnly fallback-tag="div" fallback="目錄內容">

        <div v-for="toc in tocsWithNumbers" :key="toc.id">
          <NuxtLink v-if="toc.level > 1" :to="toc.id" class="c-text-secondary mt-2 block truncate"
            :class="[{ 'text-primary': currSection === toc.title }, { 'text-sm': toc.level !== 2 }]"
            :style="{ paddingLeft: `${(toc.level - 2) * 1}rem` }">
            <span v-if="toc.level > 1">{{ toc.number }}<span class="px-1 opacity-50">|</span></span>
            <span>{{ toc.title }}</span>
          </NuxtLink>
        </div>
      </ClientOnly>
    </nav>
  </div>
</template>