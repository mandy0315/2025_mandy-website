<script setup lang="ts">
const route = useRoute();
const { updatePostsInCategory, posts } = await usePost();
const currentPage = ref(1);
const currentCategory = computed(() => route.params.category as string);

updatePostsInCategory(currentPage.value, currentCategory.value);
</script>
<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <BaseCard v-for="post in posts.list" v-bind="post" :key="post.title" class="col-span-1" />
    </div>

    <BasePagination v-if="posts.totalPage" v-model:current-page="currentPage" :totalPage="posts.totalPage" />
  </div>
</template>