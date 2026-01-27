<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useWindowSize } from '@vueuse/core'

const currentIndex = ref(0);
const isAutoPlay = ref(true);
const intervalId = ref<number | null>(null);
const isMounted = ref(false);

import { getAssetPath } from '@/utils/assetPath';
const { isDesktop } = useResponsive();
const { width: windowWidth } = useWindowSize();
const { worksByCategory } = await useWorks();

const items = useState('carousel-items', () => {
  const listGroup = []
  for (let list of Object.values(worksByCategory.value)) {
    if (!Array.isArray(list)) continue;
    // 隨機排序並取前3個
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    listGroup.push(shuffled.slice(0, 3));
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
const ACTIVE_WIDTH = computed(() => {
  if (isDesktop.value) {
    return 480; // 桌面版固定寬度
  } else {
    // 手機版：螢幕寬度的 85%（考慮左右留白） Math.min(window.
    return windowWidth.value > 0 ? Math.min(windowWidth.value * 0.85, 480) : 320;
  }
});

const ACTIVE_HEIGHT = computed(() => Math.round(ACTIVE_WIDTH.value * 9 / 16));
const SIDE_WIDTH = 90;
const SIDE_HEIGHT = 160;
const GAP = 32; // 圖片 32px 間距

const getItemClasses = (index: number) => {
  const isActive = index === currentIndex.value;
  const diff = Math.abs(index - currentIndex.value);
  const isVisible = diff <= 2 || diff >= items.value.length - 2;

  if (isDesktop.value) {
    if (isActive) {
      return 'opacity-100'; // 主圖
    } else if (isVisible) {
      return 'opacity-60'; // 旁邊的圖
    } else {
      return 'opacity-0 pointer-events-none';
    }
  } else {
    return isActive ? 'opacity-100' : 'opacity-0 pointer-events-none';
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
  if (isDesktop.value) {
    if (diff === 0) {
      translateX = 0;
    } else if (diff > 0) {
      const firstImageOffset = (ACTIVE_WIDTH.value + SIDE_WIDTH) / 2 + GAP;
      const otherImagesOffset = (diff - 1) * (SIDE_WIDTH + GAP);
      translateX = firstImageOffset + otherImagesOffset;
    } else {
      const firstImageOffset = -(ACTIVE_WIDTH.value + SIDE_WIDTH) / 2 - GAP;
      const otherImagesOffset = (diff + 1) * (SIDE_WIDTH + GAP);
      translateX = firstImageOffset + otherImagesOffset;
    }

  } else {
    translateX = 0;
  }

  return {
    width: isActive ? `${ACTIVE_WIDTH.value}px` : `${SIDE_WIDTH}px`,
    height: isActive ? `${ACTIVE_HEIGHT.value}px` : `${SIDE_HEIGHT}px`,
    transform: `translateX(${translateX}px)`,
  };
};
</script>

<template>
  <div class="relative w-full min-h-180 flex items-center justify-center">
    <div class="flex items-center justify-center relative z-20" @mouseenter="isAutoPlay = false"
      @mouseleave="isAutoPlay = true">
      <div v-for="(item, index) in items" :key="index" class="absolute cursor-pointer rounded">
        <NuxtLink :to="`/works/${item.slug}`" class="block w-full h-full" :aria-label="`前往${item.title}詳情頁面`">
          <Transition name="slide-up">
            <h3 v-if="index === currentIndex"
              class="text-4xl lg:text-5xl font-semibold mb-1 text-primary-dark dark:text-primary text-nowrap absolute -top-16 left-1/2 -translate-x-1/2 px-4 text-center">
              {{ item.title }}
            </h3>
          </Transition>

          <ClientOnly v-if="item.image">
            <div
              class="z-10 object-cover shadow-xl transition-all origin-center duration-300 ease-out relative overflow-hidden group"
              :class="getItemClasses(index)" :style="getItemStyle(index)">
              <BaseHoverMask v-if="index === currentIndex" class="absolute inset-0 z-20" />
              <img :src="getAssetPath(item.image)" :alt="item.title" class="w-full h-full absolute object-cover"
                width="480" height="270" loading="lazy" decoding="async" />
            </div>
            <template #fallback>
              <div
                class="z-10 object-cover shadow-xl relative overflow-hidden w-[320px] h-[180px] lg:w-[480px] lg:h-[270px]">
                <img :src="getAssetPath(item.image)" :alt="item.title" class="w-full h-full absolute object-cover"
                  width="480" height="270" loading="lazy" decoding="async" />
              </div>
            </template>
          </ClientOnly>

          <Transition name="slide-up">
            <p v-if="index === currentIndex"
              class="absolute -bottom-20 left-0 right-0 px-4 text-lg lg:text-xl c-text-secondary line-clamp-2">
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
      <button @click="prevSlide" class="absolute left-0 text-5xl text-white bg-primary hover:bg-primary-dark"
        aria-label="上一張作品">
        <Icon name="mdi:chevron-left" class="align-middle" />
      </button>
      <button @click="nextSlide" class="absolute right-0 text-5xl text-white bg-primary hover:bg-primary-dark"
        aria-label="下一張作品">
        <Icon name="mdi:chevron-right" class="align-middle" />
      </button>
    </div>
    <!-- numbers -->
    <div v-if="items.length > 0"
      class="absolute bottom-4 text-3xl right-0 font-zen-old-mincho font-bold c-text-secondary">
      <div class="relative px-2">
        <p class="px-2 absolute -left-6 -top-12 text-primary">{{ currentIndex + 1 }}</p>
        <div class="border-l c-border-secondary h-16 rotate-45 absolute bottom-2"></div>
        <p class="px-2">{{ items.length }}</p>
      </div>
    </div>
    <div class="bg-primary/20 rounded-t-full z-10 w-full h-full absolute"></div>
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