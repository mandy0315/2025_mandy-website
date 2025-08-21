<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();
const { refreshCategories, goToCategoriesPage, categories } = await useCategory(props.collection);
await refreshCategories(5);
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
        <BaseLink size="xs" variant="solid" :to="`/${collection}/categories`">到列表
        </BaseLink>
      </div>
      <ul>
        <li class="border-b c-border-secondary" v-for="category in categories" :key="category">
          <button size="sm" @click="goToCategoriesPage(category)"
            class="py-1 px-2 block w-full text-sm text-left my-1 hover:bg-primary/30">
            <Icon name="solar:folder-bold" size="1rem" class=" align-middle" />
            {{ category }}
          </button>
        </li>
      </ul>
    </div>
    <!-- 標籤 -->
    <div>
      <div class="flex justify-between pb-2">
        <p class="font-zen-old-mincho font-black text-sm">
          <span>Tags</span>
          <span class="pl-2">標籤</span>
        </p>
        <!-- <BaseLink size="xs" variant="solid" >到列表
        </BaseLink> -->
      </div>
    </div>
  </div>
</template>