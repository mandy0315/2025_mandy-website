<script setup lang="ts">
import { workDataMap, type WorkItem } from '@/utils/workDataMap'


type WorkCategoriesType = (typeof WorkCategories)[number];
type WorkTypesType = (typeof WorkTypes)[number];

const currentCategory = ref<WorkCategoriesType | 'all'>('all');
const currentType = ref<WorkTypesType | 'all'>('all');
const WorkTypes = ['commercial', 'personal'] as const;
const WorkCategories = ["ui", "vision", "web"] as const;

const workData = computed(() => {
  const allData = [...workDataMap.values()].flat();
  // 先處理 tag 
  const selectedDataInCategories = currentCategory.value === 'all' ? allData : workDataMap.get(currentCategory.value) || [];

  if (selectedDataInCategories.length === 0) return [];

  // 再處理 category 
  const selectedDataInTypes = currentType.value === 'all' ? selectedDataInCategories : selectedDataInCategories.filter((item: WorkItem) => item.type === currentType.value);
  return selectedDataInTypes;
})

const getGridClass = (index: number) => {
  const groupIndex = index % 6 // 每組6個，取得在這組中的位置（0~5）
  if (groupIndex === 1 || groupIndex === 3) {
    return 'col-span-2 row-span-2'
  }
  return 'col-span-1'
}

const { imgRefs,
  initObserver,
  disconnectedObserver, resetImageRefsState } = useImageObserver();


watch(workData, async () => {
  resetImageRefsState();
  await nextTick();
  initObserver();
}, {
  deep: true
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/images/default-image.jpg'; // 替換為預設圖片
}

onMounted(async () => {
  await nextTick();
  initObserver();
})
onUnmounted(() => {
  disconnectedObserver()
});

</script>
<template>
  <div>
    <section class="flex items-center justify-between">
      <h1>Works</h1>
      <div class="grid grid-cols-2 gap-x-4">
        <div class="col-span-1">
          <p>Category</p>
          <button @click="currentCategory = 'all'" class="block"
            :class="{ 'text-c-light-blue': currentCategory === 'all' }">all</button>
          <button v-for="category in WorkCategories" :key="category" class="block" @click="currentCategory = category"
            :class="{ 'text-c-light-blue': currentCategory === category }">{{
              category }}</button>
        </div>
        <div class="col-span-1">
          <p>Type</p>
          <button @click="currentType = 'all'" class="block"
            :class="{ 'text-c-light-blue': currentType === 'all' }">all</button>
          <button v-for="type in WorkTypes" :key="type" class="block" @click="currentType = type"
            :class="{ 'text-c-light-blue': currentType === type }">{{
              type }}</button>
        </div>
      </div>
    </section>
    <section>
      <div class="col-start-2 col-end-6 grid grid-cols-3">
        <NuxtLink v-for="(data, index) in workData" :key="data.id"
          class="w-full h-0 pb-[56.25%] relative bg-transparent overflow-hidden" :class="[getGridClass(index)]"
          :to="`/works/${data.id}`">
          <img :ref="(el) => { imgRefs[index] = el as HTMLImageElement }" :data-src="data.image" :data-index="index"
            class="w-full h-full absolute overflow-hidden object-cover transition-opacity opacity-0" :alt="data.title"
            @error="handleImageError($event)" />
        </NuxtLink>
      </div>
    </section>
  </div>


</template>