<script setup lang="ts">
import { pageMap } from "@/utils/appMap";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const isOpenModal = ref(false);
</script>
<template>
  <div>
    <button @click="isOpenModal = !isOpenModal"
      class="focus:outline-none  fixed top-1.5 right-2 z-100 scale-75 sm:scale-100 sm:right-3 sm:top-3 lg:right-3.5">
      <p class="text-[12px]">menu</p>
      <div class="flex flex-col h-[20px] justify-between">
        <div class="w-[32px] h-[1px] bg-black dark:bg-white transition-all origin-left"
          :class="{ 'rotate-35 translate-x-[2px]': isOpenModal }"></div>
        <div class="w-[32px] h-[1px] dark:bg-white bg-black transition-all origin-center"
          :class="{ 'opacity-0': isOpenModal }"></div>
        <div class="w-[32px] h-[1px] bg-black dark:bg-white transition-all origin-left"
          :class="{ '-rotate-35 translate-x-[2px]': isOpenModal }"></div>
      </div>
    </button>
    <div
      class="fixed flex items-center flex-col justify-start z-80 top-0 left-0 h-full w-full transition-transform duration-700 bg-[var(--bg-color)] pt-20 lg:flex-row lg:pt-0 "
      :class="isOpenModal ? 'translate-x-0' : 'translate-x-full'">
      <div class="w-7/10 h-50 bg-c-image-gray mb-6 lg:h-full lg:mb-0">image</div>
      <div class="lg:mx-auto">
        <NuxtLink v-for="(item, index) in pageMap.values()" :key="index" :to="item.path" @click="isOpenModal = false"
          class="py-4 block">
          {{ capitalize(item.title) }}
        </NuxtLink>
      </div>
    </div>
  </div>

</template>