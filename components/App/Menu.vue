<script setup lang="ts">
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
    <div v-if="isOpenModal" class="fixed z-80 top-0 left-0 w-full h-full bg-white ">
      menu
    </div>
  </div>

</template>