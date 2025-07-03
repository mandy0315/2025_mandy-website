<script setup lang="ts">
const isOpenModal = ref(false);
</script>
<template>
  <button @click="isOpenModal = !isOpenModal" class="focus:outline-none">
    <p class="text-[12px]">menu</p>
    <div class="flex flex-col h-[20px] justify-between scale-75 sm:scale-80 lg:scale-100">
      <div class="w-[32px] h-[1px] bg-black dark:bg-white transition-all origin-left"
        :class="{ 'rotate-35 translate-x-[2px]': isOpenModal }"></div>
      <div class="w-[32px] h-[1px] dark:bg-white bg-black transition-all origin-center"
        :class="{ 'opacity-0': isOpenModal }"></div>
      <div class="w-[32px] h-[1px] bg-black dark:bg-white transition-all origin-left"
        :class="{ '-rotate-35 translate-x-[2px]': isOpenModal }"></div>
    </div>
  </button>

</template>