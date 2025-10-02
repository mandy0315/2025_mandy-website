<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { workListGroup } from "@/utils/workListMap/index"

const currentIndex = ref(0);
const isAutoPlay = ref(true);
const intervalId = ref<number | null>(null);
const isMounted = ref(false);

const items = computed(() => {
  const listGroup = []
  for (let list of workListGroup.values()) {
    if (Array.isArray(list)) listGroup.push(list.slice(0, 3)); // 每個分類取前3個作品
  }
  return listGroup.flat();
});

const startAutoPlay = () => {
  stopAutoPlay();
  if (isMounted.value && isAutoPlay.value) {
    intervalId.value = window.setInterval(() => nextSlide(), 2500);
  }
};

const stopAutoPlay = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  isMounted.value = true;
  startAutoPlay();
});

onBeforeUnmount(() => {
  stopAutoPlay();
});

watch(isAutoPlay, () => {
  startAutoPlay();
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % items.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + items.value.length) % items.value.length;
};

// 可自由調整的圖片尺寸配置 16:9
const ACTIVE_WIDTH = 480;
const ACTIVE_HEIGHT = 270;
const SIDE_WIDTH = 90;
const SIDE_HEIGHT = 160;
const GAP = 32; // 圖片 32px 間距

const getItemClasses = (index: number) => {
  const isActive = index === currentIndex.value;
  const diff = Math.abs(index - currentIndex.value);
  const isVisible = diff <= 2 || diff >= items.value.length - 2;

  if (isActive) {
    return 'opacity-100'; // 主圖
  } else if (isVisible) {
    return 'opacity-60'; // 旁邊的圖
  } else {
    return 'opacity-0 pointer-events-none';
  }
};

const getItemStyle = (index: number) => {
  const activeIndex = currentIndex.value;
  const isActive = index === activeIndex;

  // 計算相對位置
  let diff = index - activeIndex;

  // 處理循環（當差距超過一半時，從另一邊算比較近）
  if (diff > items.value.length / 2) {
    diff -= items.value.length;
  } else if (diff < -items.value.length / 2) {
    diff += items.value.length;
  }

  let translateX = 0;

  if (diff === 0) {
    // 當前圖片（主圖）在中心
    translateX = 0;
  } else if (diff > 0) {
    // 在右邊：先移到主圖右邊，再加上前面圖片的寬度
    const firstImageOffset = (ACTIVE_WIDTH + SIDE_WIDTH) / 2 + GAP;  // 第一張圖的位置
    const otherImagesOffset = (diff - 1) * (SIDE_WIDTH + GAP);   // 後面圖片累積的距離
    translateX = firstImageOffset + otherImagesOffset;
  } else {
    // 在左邊：先移到主圖左邊，再減去前面圖片的寬度
    const firstImageOffset = -(ACTIVE_WIDTH + SIDE_WIDTH) / 2 - GAP; // 第一張圖的位置
    const otherImagesOffset = (diff + 1) * (SIDE_WIDTH + GAP);   // 後面圖片累積的距離
    translateX = firstImageOffset + otherImagesOffset;
  }

  return {
    width: isActive ? `${ACTIVE_WIDTH}px` : `${SIDE_WIDTH}px`,
    height: isActive ? `${ACTIVE_HEIGHT}px` : `${SIDE_HEIGHT}px`,
    transform: `translateX(${translateX}px)`,
  };
};
</script>

<template>
  <div class="relative w-full min-h-180 flex items-center justify-center">
    <div class="flex items-center justify-center relative z-20" @mouseenter="isAutoPlay = false"
      @mouseleave="isAutoPlay = true">
      <div v-for="(item, index) in items" :key="index" class="absolute cursor-pointer rounded">
        <NuxtLink :to="`works/${item.id}`" class="block w-full h-full">
          <Transition name="slide-up">
            <h3 v-if="index === currentIndex"
              class="text-5xl font-semibold mb-1 text-primary text-nowrap absolute -top-16 left-1/2 -translate-x-1/2 px-4 text-center">
              {{ item.title }}
            </h3>
          </Transition>

          <div v-if="item.image"
            class="z-10 object-cover shadow-xl transition-all origin-center duration-300 ease-out relative overflow-hidden group"
            :class="getItemClasses(index)" :style="getItemStyle(index)">
            <BaseHoverMask v-if="index === currentIndex" class="absolute inset-0 z-20" />
            <img :src="item.image" :alt="item.title" class="w-full h-full absolute object-cover" />
          </div>

          <Transition name="slide-up">
            <p v-if="index === currentIndex"
              class="absolute -bottom-20 left-0 right-0 px-4 text-xl text-gray-600 line-clamp-2">
              {{ item.description }}
            </p>
          </Transition>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div class="absolute inset-0 max-w-150 mx-auto">
    <!-- arrows -->
    <div class="absolute top-1/2 -translate-y-1/2 w-full z-30">
      <button @click="prevSlide" class="absolute left-0 text-5xl text-white bg-primary/80">
        <Icon name="mdi:chevron-left" class="align-middle" />
      </button>
      <button @click="nextSlide" class="absolute right-0 text-5xl text-white bg-primary/80">
        <Icon name="mdi:chevron-right" class="align-middle" />
      </button>
    </div>
    <!-- numbers -->
    <div v-if="items.length > 0" class="absolute bottom-4 text-3xl right-0 font-zen-old-mincho c-text-secondary">
      <div class="relative px-2">
        <p class="px-2 absolute -left-6 -top-12 text-primary">{{ currentIndex + 1 }}</p>
        <div class="border-l c-border-secondary h-16 rotate-45 absolute bottom-2"></div>
        <p class="px-2">{{ items.length }}</p>
      </div>
    </div>
    <div class="bg-primary/10 rounded-t-full z-10 w-full h-full absolute"></div>
  </div>
</template>
<style scoped>
.slide-up-enter-active {
  transition: all 1.2s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(4rem);
}

.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>