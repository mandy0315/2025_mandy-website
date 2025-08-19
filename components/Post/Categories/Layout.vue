<script setup lang="ts">
defineProps<{
  collection: 'blog' | 'notes';
}>();
const route = useRoute();

const { categories, goToCategoriesPage } = await useCategory();
const currentCategory = computed(() => route.params.category || '');
</script>
<template>
  <div>
    <BaseTitle>分類: <span v-if="collection === 'blog'">部落格</span>
      <span v-else>筆記</span>
    </BaseTitle>

    <div class="flex flex-wrap justify-center gap-2 pb-4">
      <BaseButton v-for="category in categories" :key="category" size="sm" @click="goToCategoriesPage(category)"
        :isAction="currentCategory === category">
        {{ category }}
      </BaseButton>
    </div>

    <NuxtPage />
  </div>
</template>