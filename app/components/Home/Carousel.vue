<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const currentIndex = ref(0);
const isAutoPlay = ref(true);
const intervalId = ref<number | null>(null);
const isMounted = ref(false);

const items = [
  {
    id: "indigdtechBusinessCard",
    category: "vision",
    type: "commercial",
    title: "靛藍科技名片",
    description:
      "名片以電腦晶片做構想，色彩以科技感藍色漸層營造空間，並加入晶片的線路、幾何圖形，讓名片正面有層次美感，背面放上個人資訊，設計上以文字排版舒適為主，縮小漸層範圍，讓漸層輔助資訊。",
    link: null,
    image: "/images/works/vision/indigdtechBusinessCard.jpg",
    client: "靛藍科技",
    skills: ["Photoshop", "Illustrator"],
    date: null,
    status: "completed",
  },
  {
    id: "indigdtechDM",
    category: "vision",
    type: "commercial",
    title: "靛藍科技宣傳海報",
    description:
      "宣傳新開電腦維修中心，第一張以電繪清潔電腦的情境，搭配前後差異圖，吸引顧客來店；第二張以維修的情境，讓顧客了解維修項目；背景設計以主色藍、輔助色藍綠的漸層，營造空間感，搭配幾何圖形與裝飾，設計出科技感的海報。",
    link: null,
    image: "/images/works/vision/indigdtechDM.jpg",
    client: "靛藍科技",
    skills: ["Photoshop", "Illustrator"],
    date: null,
    status: "completed",
  },
  {
    id: "rainsInDaejeonBreadStoreDM",
    category: "vision",
    type: "commercial",
    title: "大田雨來麵包店宣傳海報",
    description:
      "宣傳新開的歐式麵包店，標題取自店面大田雨來的「 田 」，與店面附近校區以學生為主，放學後的點心，如同田蜜時刻吸引客群；設計上分為三區，一區視覺廣告推廣說明麵包店，二區放上主打產品、親民價格讓人心動，三區提供地點與資訊來店/電購買；色彩取自店面色系凸顯產品特色。",
    link: null,
    image: "/images/works/vision/rainsInDaejeonBreadStoreDM.jpg",
    client: "大田雨來麵包店",
    skills: ["Photoshop", "Illustrator"],
    date: null,
    status: "completed",
  },
  {
    id: "agriculturalBankDM",
    category: "vision",
    type: "commercial",
    title: "全國農業金庫宣傳海報",
    description:
      "宣傳農業銀行服務項目，設計以舒適草原合成手捧著「 錢符號 + 土壤 」，如同農夫守護著菜芽農業銀行守護著您的金庫；色彩以綠色為主黃色為輔，柔和色彩放入大量文字，能夠讓資訊舒適好易讀。",
    link: null,
    image: "/images/works/vision/agriculturalBankDM.jpg",
    client: "全國農業金庫",
    skills: ["Photoshop", "Illustrator"],
    date: null,
    status: "completed",
  },
  {
    id: "vicFestivalEDM",
    category: "vision",
    type: "commercial",
    title: "維克中秋節賀卡",
    description:
      "中秋節將至，設計以傳說中的「月兔」為主角，融合月亮與團圓意象，透過幽默情節：吃太多月餅導致無法跳回天上，傳達節慶祝福。整體視覺使用維克企業標誌性的藍綠色為背景，搭配黃色強調視覺重點，並以剪影城市、雲朵與小兔子陪襯主角，營造集中且溫馨的視覺焦點。",
    link: null,
    image: "/images/works/vision/vicFestivalEDM.gif",
    client: "維克數位設計",
    skills: ["Photoshop", "Illustrator"],
    date: null,
    status: "completed",
  },
  {
    id: "hellosantaFestivalsBanners",
    category: "vision",
    type: "commercial",
    title: "聖誕老人節慶 FB 行銷廣告",
    description:
      "宣傳新開的歐式麵包店，標題取自店面大田雨來的「 田 」，與店面附近校區以學生為主，放學後的點心，如同田蜜時刻吸引客群；設計上分為三區，一區視覺廣告推廣說明麵包店，二區放上主打產品、親民價格讓人心動，三區提供地點與資訊來店/電購買；色彩取自店面色系凸顯產品特色。",
    link: null,
    image: "/images/works/vision/hellosantaFestivalBanners.jpg",
    client: "聖誕老人網頁設計公司",
    skills: ["Photoshop", "Illustrator"],
    date: null,
    status: "completed",
  },
  {
    id: "pchomeBanners",
    category: "vision",
    type: "commercial",
    title: "PChome FB 行銷廣告",
    description:
      "廣告偏向生活類商品，商品去背、精修與比例優化，提升整體視覺清晰度；價格資訊透過配色與尺寸強化吸睛效果，並結合具廣告主題性的標題設計。",
    link: null,
    image: "/images/works/vision/pchomeBanners.jpg",
    client: "PChome",
    skills: ["Photoshop"],
    date: null,
    status: "completed",
  },
];

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
  currentIndex.value = (currentIndex.value + 1) % items.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + items.length) % items.length;
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
  const isVisible = diff <= 2 || diff >= items.length - 2;

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
  if (diff > items.length / 2) {
    diff -= items.length;
  } else if (diff < -items.length / 2) {
    diff += items.length;
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
    <div class="flex items-center justify-center relative" @mouseenter="isAutoPlay = false"
      @mouseleave="isAutoPlay = true">
      <div v-for="(item, index) in items" :key="index" class="absolute cursor-pointer rounded z-50">
        <a class="block w-full h-full">
          <Transition name="slide-up">
            <h3 v-if="index === currentIndex"
              class="text-5xl font-semibold mb-1 text-primary text-nowrap absolute -top-16 left-1/2 -translate-x-1/2 px-4 text-center">
              {{ item.title }}
            </h3>
          </Transition>

          <div
            class="z-10 object-cover shadow-xl transition-all origin-center duration-300 ease-out relative overflow-hidden group"
            :class="getItemClasses(index)" :style="getItemStyle(index)">
            <BaseHoverMask class="absolute inset-0 z-20" />
            <img :src="item.image" :alt="item.title" class="w-full h-full absolute object-cover" />
          </div>

          <Transition name="slide-up">
            <p v-if="index === currentIndex"
              class="absolute -bottom-20 left-0 right-0 px-4 text-xl text-gray-600 line-clamp-2">
              {{ item.description }}
            </p>
          </Transition>
        </a>
      </div>
    </div>
    <div class="bg-primary/10 rounded-t-full absolute z-10 inset-0 max-w-150 mx-auto">
      <div v-if="items.length > 0" class="absolute bottom-4 text-3xl right-0 font-zen-old-mincho c-text-secondary">
        <div class="relative px-2">
          <p class="px-2 absolute -left-6 -top-12">{{ currentIndex + 1 }}</p>
          <div class="border-l c-border-secondary h-16 rotate-45 absolute bottom-2"></div>
          <p class="px-2">{{ items.length }}</p>
        </div>
      </div>
    </div>
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