<script setup lang="ts">
import { pageMap } from "@/utils/appMap";

const isOpenMenu = useState('isOpenMenu', () => false);
</script>
<template>
  <div>
    <button @click="isOpenMenu = !isOpenMenu">
      <p class="text-xs">Menu</p>
      <div class="flex flex-col h-5 justify-between transform scale-75">
        <div class="w-8 h-[2px] bg-black dark:bg-white transition-all origin-left"
          :class="{ 'rotate-35 translate-x-[2px]': isOpenMenu }"></div>
        <div class="w-8 h-[1.5px] bg-black dark:bg-white transition-all origin-center"
          :class="{ 'hidden': isOpenMenu }">
        </div>
        <div class="w-8 h-[2px] bg-black dark:bg-white transition-all origin-left"
          :class="{ '-rotate-35 translate-x-[2px]': isOpenMenu }"></div>
      </div>
    </button>
    <Teleport to="body">
      <div
        class="fixed flex items-center flex-col justify-start z-100 top-0 left-0 h-full w-full transition-transform duration-700 pt-20 lg:flex-row lg:pt-0"
        :class="isOpenMenu ? 'translate-x-0' : 'translate-x-full'">
        <div class="w-7/10 bg-[var(--bg-color)]/40 backdrop-blur-sm h-screen"></div>
        <div class="w-3/10 bg-[var(--bg-color)] h-screen flex items-center justify-center flex-col">
          <NuxtLink v-for="(item, index) in pageMap.values()" :key="index" :to="item.path" @click="isOpenMenu = false"
            class="py-4 block">
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </Teleport>
  </div>

</template>