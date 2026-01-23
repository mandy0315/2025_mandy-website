<script setup lang="ts">
const route = useRoute();
const { isMobile } = useResponsive();

usePageSEO({
  title: '作品',
  path: route.path,
})
const { works, pending, worksByCategory } = await useWorks();

type CategoryOptionsKeys = keyof typeof categoryOptions;
type TypeOptionsKeys = keyof typeof typeOptions;

const categoryOptions = {
  all: {
    label: '全部',
    value: 'all'
  },
  ui: {
    label: '介面',
    value: 'ui'
  },
  vision: {
    label: '視覺',
    value: 'vision'
  },
  web: {
    label: '網頁',
    value: 'web'
  }
} as const;

const typeOptions = {
  all: {
    label: '全部',
    value: 'all'
  },
  commercial: {
    label: '商業',
    value: 'commercial'
  },
  personal: {
    label: '個人',
    value: 'personal'
  }
} as const;

const currentCategory = ref<CategoryOptionsKeys>('all');
const currentType = ref<TypeOptionsKeys>('all');

const { getAssetPath } = useAssetPath();

const selectWorks = computed(() => {
  if (!works.value) return [];

  // 步驟1：分類篩選
  let filteredByCategory = works.value;
  if (currentCategory.value !== 'all') {
    filteredByCategory = worksByCategory.value[currentCategory.value] || [];
  }

  // 步驟2：類型篩選
  let filteredByType = filteredByCategory;
  if (currentType.value !== 'all') {
    filteredByType = filteredByCategory.filter(work => work.type === currentType.value);
  }

  // 步驟3：處理圖片路徑
  return filteredByType.map(work => ({
    ...work,
    image: work.image ? getAssetPath(work.image) : '',
  }));
});

const getGridClass = (index: number) => {
  if (isMobile.value) return 'col-span-1';
  const groupIndex = index % 6 // 每組6個，取得在這組中的位置（0~5）
  if (groupIndex === 1 || groupIndex === 3) {
    return 'col-span-2 row-span-2'
  }
  return 'col-span-1'
}

const resetFilters = () => {
  currentCategory.value = 'all';
  currentType.value = 'all';
}

// 圖片觀察器邏輯
const { imgRefs, initObserver, disconnectedObserver, resetImageRefsState } = useImageObserver();

watch(selectWorks, async () => {
  resetImageRefsState();
  await nextTick();
  initObserver();
}, {
  deep: true
})

onMounted(async () => {
  await nextTick();
  initObserver();
})

onUnmounted(() => {
  disconnectedObserver()
});
</script>

<template>
  <div class="c-container">
    <div v-if="pending" class="py-10 text-center">載入中...</div>
    <template v-else>
      <section class="pb-4">
        <div class="pb-6">
          <BaseTitle>作品</BaseTitle>
          <p v-if="works && works.length > 0" class="text-center">
            <template v-if="selectWorks.length === works.length">
              共 <span class="text-primary-dark dark:text-primary font-medium">{{ works.length }}</span> 項
            </template>
            <template v-else>
              顯示 <span class="text-primary-dark dark:text-primary font-medium">{{ selectWorks.length }}</span> 項
              <span class="c-text-secondary">（共 {{ works.length }} 項）</span>
            </template>
          </p>
        </div>
        <BaseSelect class="pr-2" v-model="currentCategory" labelTitle="分類:" :options="Object.values(categoryOptions)" />
        <BaseSelect v-model="currentType" labelTitle="類型:" :options="Object.values(typeOptions)" />
      </section>

      <section>
        <div v-if="selectWorks.length === 0" class="w-full min-h-80 flex items-center justify-center flex-col">
          <p class="text-center text-xl">
            <Icon name="mdi:emoticon-cry-outline" class="text-3xl align-middle" />
            <span class="align-middle">沒有符合條件的作品</span>
          </p>
          <BaseButton class="mt-4" variant="solid" size="md" @click="resetFilters">重置篩選</BaseButton>
        </div>

        <div v-else class="col-start-2 col-end-6 grid grid-cols-1 md:grid-cols-3">
          <NuxtLink v-for="(data, index) in selectWorks" :key="data.id"
            class="w-full h-auto aspect-video relative bg-transparent overflow-hidden group"
            :class="[getGridClass(index)]" :to="`/works/${data.slug}`" :aria-label="`前往${data.title}詳情頁面`">
            <BaseHoverMask :contentText="data.title" />
            <img :ref="(el) => { imgRefs[index] = el as HTMLImageElement }" :data-src="data.image" :data-index="index"
              class="w-full h-full inset-0 absolute overflow-hidden object-cover transition-all opacity-0 group-hover:blur-sm"
              :alt="data.title" />
          </NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>