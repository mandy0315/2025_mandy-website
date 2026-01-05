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
    <div class="grid grid-cols-1" :class="isHorizontal ? 'lg:grid-cols-7' : ''">

      <!-- 圖片比例 16:9 -->
      <div class="w-full aspect-video relative rounded-lg overflow-hidden" :class="isHorizontal ? 'lg:col-span-3' : ''">
        <BaseHoverMask contentText="進入文章" />
        <span class="absolute top-2 z-10 text-xs bg-primary px-1 text-white">{{ category }}</span>
        <NuxtImg :src="processedSrc" :alt="title"
          class="h-full transition object-center object-cover w-full absolute inset-0 duration-500 ease-in-out group-hover:blur-sm"
          fetchpriority="high" format="webp" quality="90" />
      </div>

      <!-- 內容區 -->
      <div class="p-2 col-span-1" :class="isHorizontal ? 'lg:flex lg:flex-col lg:px-6 lg:py-4 lg:col-span-4' : ''">
        <PostDate :date />
        <p class="text-xl"> {{ title }}</p>
        <p class="c-text-secondary line-clamp-2" :class="isHorizontal ? 'lg:line-clamp-3' : ''">
          {{ description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>