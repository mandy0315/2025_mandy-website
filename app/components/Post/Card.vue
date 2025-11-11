<script setup lang="ts">
const props = withDefaults(defineProps<{
  path: string,
  image: string,
  date: string,
  title: string,
  description: string,
  category: string,
  isHorizontal?: boolean,
}>(), {
  isHorizontal: false,
})


const { getAssetPath } = useAssetPath();
const processedSrc = computed(() => getAssetPath(props.image));

</script>
<template>
  <NuxtLink :to="path" class="group">
    <div class="grid" :class="isHorizontal ? 'grid-cols-7' : 'grid-cols-1'">
      <!-- 圖片比例 16:9 -->
      <div class="w-full h-0 pb-[56.25%] relative rounded-lg overflow-hidden "
        :class="isHorizontal ? 'col-span-3' : 'col-span-1'">
        <BaseHoverMask contentText="進入文章" />
        <span class="absolute top-2 z-10 text-xs bg-primary px-1 text-white">{{ category }}</span>
        <img :src="processedSrc" :alt="title"
          class="h-full transition object-center object-cover w-full absolute duration-500 ease-in-out group-hover:blur-sm" />
      </div>
      <div :class="isHorizontal ? 'flex flex-col px-6 py-4 col-span-4' : 'p-2 col-span-1'">
        <PostDate :date />
        <p class="text-xl"> {{ title }}</p>
        <p class="c-text-secondary" :class="isHorizontal ? 'line-clamp-3' : 'line-clamp-2'">{{
          description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>