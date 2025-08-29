<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();
const { refreshCategories, goToCategoriesPage, categories } = await useCategory(props.collection);
await refreshCategories(5);

const { refreshTags, goToTagsPage, tags } = await useTag(props.collection);
await refreshTags(5);
</script>
<template>
  <div>
    <!-- 基本資料 -->
    <div class="pb-6 flex items-center flex-col">
      <div class="w-20 h-25 rounded-t-full overflow-hidden border-2 border-white/50 ">
        <img src="/images/profile-photo.jpg" alt="大頭貼" class="object-cover object-top w-full h-full" />
      </div>
      <p class="text-sm py-4 text-left">
        嗨～我是蔓蒂 Mandy<br />
        目前一位前端工程師，我喜歡接受新的挑戰，並且持續追求新刺激與熱情，希望<span class="bg-primary text-white">透過網站紀錄生活點滴與技術</span>，豐富自己和周遭的人，謝謝!
      </p>

      <div class="flex justify-center gap-x-1">
        <BaseIconLink icon="mdi:email" to="mailto:mandy3152618@gmail.com" external />
        <BaseIconLink icon="mdi:facebook" to="https://www.facebook.com/MandyTsai0315" target="_blank" external />
        <BaseIconLink icon="mdi:github" to="https://github.com/mandy0315" target="_blank" external />
      </div>
    </div>
    <!-- 分類 -->
    <div class="pb-6">
      <div class="flex justify-between pb-2">
        <p class="font-zen-old-mincho font-black text-sm">
          <span>Categories</span>
          <span class="pl-2">分類</span>
        </p>
        <BaseLink size="xs" variant="solid" :to="`/${collection}/categories`">總覽
        </BaseLink>
      </div>
      <div class="border-b c-border-secondary" v-for="category in categories" :key="category">
        <PostCategoryButton :category @click="goToCategoriesPage(category)" />
      </div>
    </div>
    <!-- 標籤 -->
    <div>
      <div class="flex justify-between pb-2">
        <p class="font-zen-old-mincho font-black text-sm">
          <span>Tags</span>
          <span class="pl-2">標籤</span>
        </p>
        <BaseLink size="xs" variant="solid" :to="`/${collection}/tags`">總覽
        </BaseLink>
      </div>

      <div class="py-2 flex flex-wrap gap-1 ">
        <BaseButton v-for="tag in tags" :key="tag" size="xs" @click="goToTagsPage(tag)">
          {{ tag }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>