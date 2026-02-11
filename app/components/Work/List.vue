<script setup lang="ts" generic="T extends { id: string; title: string; slug: string; image: string }">
import { getAssetPath } from '@/utils/assetPath';
const { isMobile } = useResponsive();


const props = defineProps<{
  works: T[];
}>();

const emit = defineEmits<{
  resetFilters: [];
}>();

const getGridClass = (index: number) => {
  if (isMobile.value) return 'col-span-1';
  const groupIndex = index % 6; // 每組6個，取得在這組中的位置（0~5）
  if (groupIndex === 1 || groupIndex === 3) {
    return 'col-span-2 row-span-2';
  }
  return 'col-span-1';
};

const { imgRefs, initObserver, disconnectedObserver, resetImageRefsState } = useImageObserver();

watch(() => props.works, async () => {
  resetImageRefsState();
  await nextTick();
  initObserver();
}, {
  deep: true
});

onMounted(async () => {
  await nextTick();
  initObserver();
});

onUnmounted(() => {
  disconnectedObserver();
});
</script>

<template>
  <section>
    <div v-if="works.length === 0" class="w-full min-h-80 flex items-center justify-center flex-col">
      <p class="text-center text-xl">
        <Icon name="mdi:emoticon-cry-outline" class="text-3xl align-middle" />
        <span class="align-middle">沒有符合條件的作品</span>
      </p>
      <BaseButton class="mt-4" variant="solid" size="md" @click="$emit('resetFilters')">重置篩選</BaseButton>
    </div>

    <div v-else class="col-start-2 col-end-6 grid grid-cols-1 md:grid-cols-3">
      <NuxtLink v-for="(data, index) in works" :key="data.id"
        class="w-full h-auto aspect-video relative bg-transparent overflow-hidden group" :class="[getGridClass(index)]"
        :to="`/works/${data.slug}`" :aria-label="`前往${data.title}詳情頁面`">
        <BaseHoverMask :contentText="data.title" />
        <img :ref="(el) => { imgRefs[index] = el as HTMLImageElement }" :data-src="getAssetPath(data.image)"
          :data-index="index"
          class="w-full h-full inset-0 absolute overflow-hidden object-cover transition-all opacity-0 group-hover:blur-sm"
          :alt="data.title" />
      </NuxtLink>
    </div>
  </section>
</template>