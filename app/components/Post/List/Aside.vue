<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();
const { refreshCategories, goToCategoriesPage, categories } = await useCategory(props.collection);
await refreshCategories(5);

const { refreshTags, goToTagsPage, tags } = await useTag(props.collection);
await refreshTags(5);
const { isDesktop } = useResponsive();
</script>
<template>
  <div>
    <!-- 基本資料 -->
    <div
      class="grid grid-cols-7 items-center bg-primary/10 p-3 rounded-md mb-3 lg:mb-0 lg:rounded-none lg:px-0 lg:bg-transparent lg:grid-cols-1">
      <div class="w-20 h-25 rounded-t-full overflow-hidden border-2 border-white/50 mx-auto col-span-2 lg:col-span-1">
        <img src="/images/profile-photo.jpg" alt="大頭貼" class="object-cover object-top w-full h-full" />
      </div>
      <div class="col-span-5 lg:col-span-1">
        <p class="lg:text-sm py-4 text-left">
          嗨～我是蔓蒂 Mandy，感謝您來到我的小空間，
          目前是一位前端工程師，也是珍奶們的媽媽，
          對於專業不斷更新，以自己適合步調提升，
          <span class="bg-primary text-white">希望透過小空間能紀錄生活點滴與技術</span>，豐富自己和觀看的大家！
        </p>

        <div class="flex gap-x-2 lg:justify-center lg:gap-x-1">
          <BaseIconLink icon="mdi:email" to="mailto:mandy3152618@gmail.com" external />
          <BaseIconLink icon="mdi:facebook" to="https://www.facebook.com/MandyTsai0315" target="_blank" external />
          <BaseIconLink icon="mdi:github" to="https://github.com/mandy0315" target="_blank" external />
        </div>
      </div>
    </div>
    <!-- 分類 -->
    <div class="bg-primary/10 p-3 rounded-md mb-3 lg:mb-0 lg:rounded-none lg:px-0 lg:bg-transparent lg:grid-cols-1">
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
    </div>
    <!-- 標籤 -->
    <div class="bg-primary/10 p-3 rounded-md mb-3 lg:mb-0 lg:rounded-none lg:px-0 lg:bg-transparent lg:grid-cols-1">
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
    </div>
  </div>
</template>