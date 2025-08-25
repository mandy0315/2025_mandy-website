<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const route = useRoute();
const { currSection,
  setNavListener } = useNavListener();

const { data: collectionAllTocs } = await useAsyncData(`${props.collection}-detail-toc`, () => {
  return queryCollectionSearchSections(props.collection);
});

const currTocs = computed(() => collectionAllTocs.value?.filter(toc =>
  toc.id.startsWith(route.path)
) || [])
const initListenerPage = async (retryCount = 0) => {
  if (currTocs.value.length === 0) return;

  const maxRetries = 5;
  const delay = Math.min(100 * Math.pow(2, retryCount), 1000);

  const navs = currTocs.value.map(toc => {
    const id = toc.title.trim().replace(/\s+/g, '-').toLowerCase();
    const element = document.getElementById(id);

    return {
      title: toc.title,
      element
    };
  });


  const foundElements = navs.filter(nav => nav.element).length;

  if (foundElements > 0) {
    setNavListener({ navs });
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
  <div>
    <ClientOnly>
      <p class="font-zen-old-mincho font-black text-sm pb-4">
        <span>Toc</span>
        <span class="pl-2">目錄</span>
      </p>

      <ul class="border-l c-border-secondary pl-2">
        <li v-for="toc in currTocs">
          <NuxtLink v-if="toc.level > 1" :to="toc.id" class="c-text-secondary"
            :class="{ 'text-primary': currSection === toc.title }"
            :style="{ paddingLeft: `${(toc.level - 2) * 1}rem` }">
            {{ toc.title }}
          </NuxtLink>
        </li>
      </ul>
    </ClientOnly>
  </div>
</template>