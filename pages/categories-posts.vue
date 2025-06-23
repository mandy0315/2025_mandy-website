<script setup lang="ts">
definePageMeta({
  middleware: ['categories']
})
const route = useRoute();

const { categories, goToCategoriesPage } = await useCategory();
const currentCategory = computed(() => route.params.category || '');
</script>
<template>
  <div>
    <BaseListTitle>分類</BaseListTitle>

    <div class="flex flex-wrap justify-center gap-2 pb-4">
      <BaseTag v-for="category in categories" :key="category" @click="goToCategoriesPage(category)"
        :isAction="currentCategory === category">
        {{ category }}
      </BaseTag>
    </div>

    <NuxtPage />
  </div>
</template>