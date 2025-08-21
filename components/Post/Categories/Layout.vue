<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const { categories, goToCategoriesPage, refreshCategories } = await useCategory(props.collection);
await refreshCategories();

</script>
<template>
  <div class="flex">
    <div class="w-60 px-4">
      <BaseLink to="/blog/categories" size="xs" class="rounded-t-sm rounded-b-none border-b-0 mr-1"
        :isAction="collection === 'blog'">
        部落格分類</BaseLink>
      <BaseLink to="/notes/categories" size="xs" class="rounded-t-sm rounded-b-none border-b-0"
        :isAction="collection === 'notes'">
        筆記分類</BaseLink>
      <div class="border-b c-border-secondary border-dashed "></div>
      <ul class="py-2">
        <li v-for="category in categories" :key="category">
          <button size="sm" @click="goToCategoriesPage(category)"
            class="py-1 px-2 block w-full text-sm text-left my-1 hover:bg-primary/30">
            <Icon name="solar:folder-bold" size="1rem" class=" align-middle" />
            {{ category }}
          </button>
        </li>
      </ul>
      <div class="border-b c-border-secondary border-dashed "></div>
    </div>
    <div class="w-7/10">
      <NuxtPage />
    </div>
  </div>
</template>