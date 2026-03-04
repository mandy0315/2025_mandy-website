<script setup lang="ts" generic="T extends { id: string; title: string; slug: string; image: string }">
import { getAssetPath } from '@/utils/assetPath';

const { isMobile } = useResponsive();

const props = defineProps<{
  works: T[];
}>();

const emit = defineEmits<{
  resetFilters: [];
}>();

const getGridClass = (index: number) => {
  if (isMobile.value) return 'col-span-1';
  const groupIndex = index % 6;
  if (groupIndex === 1 || groupIndex === 3) {
    return 'col-span-2 row-span-2';
  }
  return 'col-span-1';
};

// 無限加載方式
const itemsPerPage = 9; // 每次加載的數量
const displayedCount = ref(itemsPerPage); // 當前顯示的數量

const allWorkLen = computed(() => props.works.length);
// 顯示的項目
const displayedWorks = computed(() => {
  return props.works.slice(0, Math.min(displayedCount.value, allWorkLen.value));
});

// 是否有更多項目
const hasMore = computed(() => displayedCount.value < allWorkLen.value);

// 加載更多
const loadMore = () => {
  if (hasMore.value) {
    displayedCount.value += itemsPerPage;
  }
};

// 滾動監聽器
const observer = ref<IntersectionObserver>();
const loadMoreEl = ref<HTMLElement>();

const onLoadMoreIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && hasMore.value) {
      loadMore();
    }
  });
};

// 圖片懶加載
const loadedImages = ref<Set<number>>(new Set());
const imageObserver = ref<IntersectionObserver>();

const loadImage = (img: HTMLImageElement, src: string, index: number) => {
  if (loadedImages.value.has(index)) return;

  img.src = src;
  img.style.opacity = '1';
  loadedImages.value.add(index);
};

const onImageIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      const src = img.dataset.src;
      const index = Number(img.dataset.index);

      if (src) {
        loadImage(img, src, index);
      }
    }
  });
};

const setupImageObserver = async (img: HTMLImageElement) => {
  if (img && imageObserver.value) {
    imageObserver.value.observe(img);
  }
};

// 重置狀態
watch(() => props.works, () => {
  loadedImages.value.clear();
  displayedCount.value = itemsPerPage;
});

onMounted(() => {
  // 滾動加載觀察器
  observer.value = new IntersectionObserver(onLoadMoreIntersect, {
    threshold: 0.1 // 當元素至少有10%可見時觸發
  });

  // 圖片懶加載觀察器
  imageObserver.value = new IntersectionObserver(onImageIntersect, {
    rootMargin: '100px'
  });

  if (loadMoreEl.value) {
    observer.value?.observe(loadMoreEl.value);
  }
});

onUnmounted(() => {
  observer.value?.disconnect();
  imageObserver.value?.disconnect();
});
</script>

<template>
  <section>
    <article v-if="works.length === 0" class="w-full min-h-80 flex items-center justify-center flex-col">
      <p class="text-center text-xl">
        <Icon name="mdi:emoticon-cry-outline" class="text-3xl align-middle" />
        <span class="align-middle">沒有符合條件的作品</span>
      </p>
      <BaseButton class="mt-4" variant="solid" size="md" @click="$emit('resetFilters')">重置篩選</BaseButton>
    </article>
    <template v-else>
      <div class="col-start-2 col-end-6 grid grid-cols-1 md:grid-cols-3">
        <article v-for="(data, index) in displayedWorks" :key="data.id" :class="[getGridClass(index)]">
          <NuxtLink class="w-full h-auto aspect-video relative bg-transparent overflow-hidden group block"
            :to="`/works/${data.slug}`" :aria-label="`前往${data.title}詳情頁面`">
            <BaseHoverMask :contentText="data.title" />
            <img :ref="(el) => setupImageObserver(el as HTMLImageElement)" :data-src="getAssetPath(data.image)"
              :data-index="index"
              class="w-full h-full inset-0 absolute overflow-hidden object-cover transition-all opacity-0 group-hover:blur-sm"
              :alt="data.title" />
          </NuxtLink>
        </article>
      </div>

      <!-- 加載 -->
      <div v-if="hasMore" ref="loadMoreEl" class="col-span-full h-10 flex items-center justify-center">
        <div class="animate-pulse text-gray-500">
          加載更多作品...
        </div>
      </div>
    </template>
  </section>
</template>