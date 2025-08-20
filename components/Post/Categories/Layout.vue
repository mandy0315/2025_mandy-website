<script setup lang="ts">
defineProps<{
  collection: 'blog' | 'notes';
}>();
const route = useRoute();

const { categories, goToCategoriesPage, refreshCategories } = await useCategory();
await refreshCategories();
const currentCategory = computed(() => route.params.category || '');


</script>
<template>
  <div>
    <BaseTitle>
      <span v-if="collection === 'blog'">部落格</span>
      <span v-else>筆記</span>分類:
      <span class="text-primary">"{{ currentCategory }}"</span>
    </BaseTitle>

    <NuxtPage />
  </div>
</template>