<script setup lang="ts">
definePageMeta({
  middleware: ['categories']
})
usePageSEO({
  title: '部落格-分類',
})
const route = useRoute();

const { categories, goToCategoriesPage } = await useCategory();
const currentCategory = computed(() => route.params.category || '');
</script>
<template>
  <div>
    <BaseListTitle>分類:部落格</BaseListTitle>

    <div class="flex flex-wrap justify-center gap-2 pb-4">
      <BaseTag v-for="category in categories" :key="category" @click="goToCategoriesPage(category)"
        :isAction="currentCategory === category">
        {{ category }}
      </BaseTag>
    </div>

    <NuxtPage />
  </div>
</template>