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