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

// 圖片處理
const currSrc = ref(props.image);
const handleErrorImage = () => {
  const defaultImgSrc = '/images/default-image.jpg';
  currSrc.value = defaultImgSrc;
}

</script>
<template>
  <NuxtLink :to="path" class="group">
    <div class="grid" :class="isHorizontal ? 'grid-cols-2' : 'grid-cols-1'">
      <!-- 圖片比例 16:9 -->
      <div class="w-full h-0 pb-[56.25%] relative rounded-lg overflow-hidden col-span-1">
        <BaseHoverMask contentText="進入文章" />
        <span class="absolute top-2 z-10 text-xs bg-primary px-1 text-white">{{ category }}</span>
        <img :src="currSrc" :alt="title"
          class="h-full transition object-center object-cover w-full absolute duration-500 ease-in-out group-hover:blur-sm"
          @error="handleErrorImage" />
      </div>
      <div class="col-span-1" :class="isHorizontal ? 'flex flex-col justify-center p-6' : 'p-2'">
        <PostDate :date />
        <p class="text-lg"> {{ title }}</p>
        <p class="text-sm c-text-secondary" :class="isHorizontal ? 'line-clamp-4' : 'line-clamp-2'">{{
          description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>