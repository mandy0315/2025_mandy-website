<script setup lang="ts">
const route = useRoute();
const { updateBlogInCategory, posts } = await useBlog();
const currentPage = ref(1);
const currentCategory = computed(() => route.params.category as string);

updateBlogInCategory(currentPage.value, currentCategory.value);
</script>
<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <BaseCard v-for="post in posts.list" v-bind="post" :key="post.title" class="col-span-1" />
    </div>

    <BasePagination v-if="posts.totalPage" v-model:current-page="currentPage" :totalPage="posts.totalPage" />
  </div>
</template>