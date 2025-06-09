<script setup lang="ts">
import UIData from '@/public/json/works/ui.json'
import VisionData from '@/public/json/works/vision.json'
import WebData from '@/public/json/works/web.json'

type WorkCategoriesType = (typeof WorkCategories)[number];
type WorkTypesType = (typeof WorkTypes)[number];

const currentCategory = ref<WorkCategoriesType | 'all'>('all');
const currentType = ref<WorkTypesType | 'all'>('all');
const WorkCategories = ['ui', 'vision', 'web'] as const;
const WorkTypes = ['commercial', 'personal'] as const;

const workDataMap = new Map<WorkCategoriesType, any>([
  ['ui', UIData],
  ['vision', VisionData],
  ['web', WebData],
]);

const imageData = computed(() => {
  // 先處理 tag 
  const selectedDataInCategories = (currentCategory.value === 'all' ? [...workDataMap.values()] : [workDataMap.get(currentCategory.value)]).flat();
  // 再處理 category 
  const selectedDataInTypes = currentType.value === 'all' ? selectedDataInCategories : selectedDataInCategories.filter((item) => item.type === currentType.value);
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

watch(imageData, async () => {
  resetImageRefsState();
  await nextTick();
  initObserver();
}, {
  deep: true
})

onMounted(() => {
  initObserver();
})
onUnmounted(() => {
  disconnectedObserver()
});

</script>
<template>
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
  <ul class="col-start-2 col-end-6 grid grid-cols-3">
    <li v-for="(data, index) in imageData" :key="data.id"
      class="w-full h-0 pb-[56.25%] relative bg-transparent overflow-hidden" :class="[getGridClass(index)]">
      <img :ref="(el) => { imgRefs[index] = el as HTMLImageElement }" :data-src="data.image" :data-index="index"
        class="w-full h-full absolute overflow-hidden object-cover transition-opacity opacity-0" alt="image" />
    </li>
  </ul>

</template>