<script setup lang="ts">
const props = defineProps<{
  path: string,
  image: string,
  date: string,
  title: string,
  description: string,
}>()

// 圖片處理
const currSrc = ref(props.image);
const handleErrorImage = () => {
  const defaultImgSrc = '/images/default-image.jpg';
  currSrc.value = defaultImgSrc;
}

</script>
<template>
  <NuxtLink :to="path" class="rounded-lg overflow-hidden group">

    <div class="w-full h-0 pb-[56.25%] relative rounded-lg overflow-hidden">
      <img :src="currSrc" :alt="title"
        class="h-full transition object-center object-cover w-full absolute duration-500 ease-in-out group-hover:blur-sm group-hover:scale-110"
        @error="handleErrorImage" />
    </div>
    <div class="p-2">
      <PostDate :date />

      <p class="text-lg"> {{ title }}</p>
      <p class="text-sm c-text-secondary line-clamp-2">{{ description }}</p>
    </div>
  </NuxtLink>
</template>