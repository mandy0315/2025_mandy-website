<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();
const { refreshCategories, goToCategoriesPage, categories } = await useCategory(props.collection);
await refreshCategories(5);

const { refreshTags, goToTagsPage, tags } = await useTag(props.collection);
await refreshTags(5);


// 3D 翻轉卡片觸控事件（手機版）
const { isMobile } = useResponsive();
const isFlipped = ref(false);
const startX = ref(0);
const isDragging = ref(false);

const handleTouchStart = (e: TouchEvent) => {
  if (!isMobile.value) return;
  startX.value = e.touches[0]?.clientX || 0;
  isDragging.value = true;
};

const handleTouchEnd = (e: TouchEvent) => {
  const threshold = 50;
  if (!isMobile.value || !isDragging) return;

  const endX = e.touches[0]?.clientX || 0;
  const diff = endX - startX.value;

  if (Math.abs(diff) > threshold) {
    isFlipped.value = !isFlipped.value;
  }

  isDragging.value = false;
};


const card3DAnimationClass = computed(() =>
  `${isMobile.value
    ? (isFlipped.value ? 'rotate-y-180' : '')
    : 'group-hover:rotate-y-180'
  }`
);
</script>
<template>
  <aside>
    <!-- 基本資料 -->
    <section
      class="grid grid-cols-7 items-center bg-primary/10 p-3 rounded-md mb-3 lg:mb-0 lg:rounded-none lg:px-0 lg:bg-transparent lg:grid-cols-1">
      <div class="relative w-26 h-32 mx-auto col-span-2 lg:col-span-1">
        <!-- 3D 圖示 -->
        <div class="bg-primary absolute w-6 h-6 rounded-full right-1 bottom-1 flex justify-center items-center z-10">
          <Icon name="i-material-symbols:3d-rotation" size="1.3rem" class="align-middle text-white" />
        </div>
        <!-- card scene -->
        <div
          class="w-full h-full perspective-normal rounded-t-full overflow-hidden border-2 border-white/50 mx-auto col-span-2 group"
          @touchstart="handleTouchStart" @touchend="handleTouchEnd">
          <!-- card -->
          <div class="w-full h-full transform-3d transition-transform duration-300 ease-in-out relative"
            :class="card3DAnimationClass">
            <!-- front image -->
            <img src="/images/profile-photo.jpg" alt="大頭貼"
              class="absolute inset-0 backface-hidden object-cover object-top w-full h-full" />
            <!-- back image -->
            <img src="/images/profile-photo-back.jpg" alt="大頭貼"
              class="absolute inset-0 backface-hidden object-cover object-top w-full h-full rotate-y-180" />
          </div>
        </div>
      </div>
      <div class="col-span-5 pl-3 lg:pl-0 lg:col-span-1">
        <p class="lg:text-sm py-4 text-left">
          嗨～我是敏佳 Mandy，感謝您來到我的小空間，
          目前是一位前端工程師，也是珍奶們的媽媽，
          對於專業不斷更新，以自己適合步調提升，
          <span class="bg-primary text-white">希望透過小空間能紀錄生活點滴與技術</span>，豐富自己和觀看的大家！
        </p>

        <div class="flex gap-x-2 lg:justify-center lg:gap-x-1">
          <BaseIconLink icon="mdi:email" to="mailto:mandy3152618@gmail.com" />
          <BaseIconLink icon="mdi:facebook" to="https://www.facebook.com/MandyTsai0315" target="_blank" />
          <BaseIconLink icon="mdi:github" to="https://github.com/mandy0315" target="_blank" />
        </div>
      </div>
    </section>
    <!-- 分類 -->
    <section class="bg-primary/10 p-3 rounded-md mb-3 lg:mb-0 lg:rounded-none lg:px-0 lg:bg-transparent lg:grid-cols-1">
      <div class="flex pb-2">
        <p class="font-zen-old-mincho font-black text-lg lg:text-sm">
          <span class="pr-2">分類</span>
          <span>Categories</span>
        </p>
        <BaseLink variant="solid" class="ml-auto text-sm px-3 py-1 lg:text-xs" :to="`/${collection}/categories`">總覽
        </BaseLink>
      </div>
      <div class="border-b c-border-secondary" v-for="category in categories" :key="category">
        <PostCategoryButton :category @click="goToCategoriesPage(category)" />
      </div>
    </section>
    <!-- 標籤 -->
    <section class="bg-primary/10 p-3 rounded-md mb-3 lg:mb-0 lg:rounded-none lg:px-0 lg:bg-transparent lg:grid-cols-1">
      <div class="flex justify-between pb-2">
        <p class="font-zen-old-mincho font-black text-lg lg:text-sm">
          <span class="pr-2">標籤</span>
          <span>Tags</span>
        </p>
        <BaseLink variant="solid" class="ml-auto text-sm px-3 py-1 lg:text-xs" :to="`/${collection}/tags`">總覽
        </BaseLink>
      </div>

      <div class="py-2 flex flex-wrap gap-1 ">
        <BaseButton v-for="tag in tags" :key="tag" variant="outline" class="text-sm px-2 py-1 lg:text-xs"
          @click="goToTagsPage(tag)">
          {{ tag }}
        </BaseButton>
      </div>
    </section>
  </aside>
</template>