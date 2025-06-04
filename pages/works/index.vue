<script setup lang="ts">
const images = Array(10).fill('/images/default-image.jpg') // 例如 3 組

const getGridClass = (index: number) => {
  const groupIndex = index % 6 // 每組6個，取得在這組中的位置（0~5）
  if (groupIndex === 1 || groupIndex === 3) {
    return 'col-span-2 row-span-2'
  }
  return 'col-span-1'
}
</script>
<template>
  <div>
    <h1>Works</h1>
    <p>Welcome to the works page!</p>
    <ul class="col-start-2 col-end-6 grid grid-cols-3">
      <li v-for="(image, index) in images" :key="index" class="w-full h-0 pb-[56.25%] relative bg-gray-100"
        :class="[getGridClass(index)]">
        <img :src="image" class="w-full h-full absolute overflow-hidden object-contain" alt="image" />
      </li>
    </ul>
  </div>

</template>