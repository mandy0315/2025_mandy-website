<script setup lang="ts">
import { workListGroup } from "@/utils/workListMap/index"

const { isMobile } = useResponsive();
const route = useRoute();

usePageSEO({
  title: '作品',
  path: route.path,
})

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

const allWorks = computed(() => [...workListGroup.values()].flat());

const { getAssetPath } = useAssetPath();
const selectWorks = computed(() => {
  if (allWorks.value.length === 0) return [];

  // 先處理所有作品的圖片路徑
  const worksWithImages = allWorks.value.map(work => ({
    ...work,
    image: work.image ? getAssetPath(work.image) : '',
  }));

  // 先處理分類篩選
  const selectedDataInCategories = currentCategory.value === 'all'
    ? worksWithImages
    : worksWithImages.filter(work => {
      const categoryWorks = workListGroup.get(currentCategory.value) || [];
      return categoryWorks.some(item => item.id === work.id);
    });

  if (selectedDataInCategories.length === 0) return [];

  // 再處理類型篩選
  const selectedDataInTypes = currentType.value === 'all'
    ? selectedDataInCategories
    : selectedDataInCategories.filter(item => item.type === currentType.value);

  return selectedDataInTypes;
})

const getGridClass = (index: number) => {
  if (isMobile.value) return 'col-span-1'

  const groupIndex = index % 6 // 每組6個，取得在這組中的位置（0~5）
  if (groupIndex === 1 || groupIndex === 3) {
    return 'col-span-2 row-span-2'
  }
  return 'col-span-1'
}

const resetFilters = () => {
  currentCategory.value = 'all';
  currentType.value = 'all'
}
</script>
<template>
  <div class="c-container">
    <section class="pb-4">
      <div class="pb-6">
        <BaseTitle>作品</BaseTitle>
        <p v-if="allWorks.length > 0" class="text-center">
          <template v-if="selectWorks.length === allWorks.length">
            共 <span class="text-primary font-medium">{{ allWorks.length }}</span> 項
          </template>
          <template v-else>
            顯示 <span class="text-primary font-medium">{{ selectWorks.length }}</span> 項
            <span class="c-text-secondary">（共 {{ allWorks.length }} 項）</span>
          </template>
        </p>
      </div>
      <BaseSelect class="pr-2" v-model="currentCategory" labelTitle="分類:" :options="Object.values(categoryOptions)" />
      <BaseSelect v-model="currentType" labelTitle="類型:" :options="Object.values(typeOptions)" />
    </section>
    <section>
      <div v-if="selectWorks.length === 0" class="w-full min-h-80 flex items-center justify-center flex-col">
        <p class="text-center col-span-3 text-xl">
          <Icon name="mdi:emoticon-cry-outline" class="text-3xl align-middle" />
          <span class="align-middle">沒有符合條件的作品</span>
        </p>
        <BaseButton class="mt-4" variant="solid" size="md" @click="resetFilters">重置篩選</BaseButton>
      </div>
      <div v-else class="col-start-2 col-end-6 grid " :class="isMobile ? 'grid-cols-1' : 'grid-cols-3'">
        <NuxtLink v-for="(data, index) in selectWorks" :key="data.id"
          class="w-full h-0 pb-[56.25%] relative bg-transparent overflow-hidden group" :class="[getGridClass(index)]"
          :to="`/works/${data.id}`">
          <BaseHoverMask :contentText="data.title" />
          <img :src="data.image || ''" :alt="data.title"
            class="w-full h-full absolute overflow-hidden object-cover transition-all group-hover:blur-sm"
            loading="lazy" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>