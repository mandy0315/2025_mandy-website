<script setup lang="ts">
const route = useRoute();
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

const resetFilters = () => {
  currentCategory.value = 'all';
  currentType.value = 'all';
};

const selectWorks = computed(() => {
  if (!works.value) return [];
  let filteredWorks = works.value;
  // 步驟1：分類篩選
  if (currentCategory.value !== 'all') {
    filteredWorks = worksByCategory.value[currentCategory.value] || [];
  }
  // 步驟2：類型篩選
  if (currentType.value !== 'all') {
    filteredWorks = filteredWorks.filter(work => work.type === currentType.value);
  }

  return filteredWorks
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

      <WorkList :works="selectWorks" @resetFilters="resetFilters" />
    </template>
  </div>
</template>