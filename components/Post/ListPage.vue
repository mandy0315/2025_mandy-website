<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();
const { refreshCategories, goToCategoriesPage, categories } = await useCategory(props.collection);
await refreshCategories(10);

const currentPage = ref(1);
const { setPosts, refreshPosts, posts, pending, currentSort } = await usePosts(props.collection);
setPosts(currentPage.value);

watch([currentPage, currentSort], async () => {
  await refreshPosts(currentPage.value);
});

</script>
<template>
  <NuxtLayout name="content-with-sidebar">
    <template #content>
      <div v-if="pending">載入中....</div>
      <div v-else>
        <div class="py-4">
          <BaseTitle>
            <span v-if="collection === 'blog'">部落格</span>
            <span v-else>筆記</span>
          </BaseTitle>
          <p v-if="posts.list.length > 0" class="text-lg text-center c-text-gray">
            目前有
            <span class="text-c-light-blue font-medium">{{ posts.totalPosts || 0 }}</span>
            篇
          </p>
        </div>

        <div class="pb-4 ml-auto text-right">
          <p class="c-text-gray inline-block">文章排序：</p>
          <select v-model="currentSort" class="c-rounded-btn rounded py-1 px-2">
            <option value="DESC">新到舊</option>
            <option value="ASC">舊到新</option>
          </select>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <BaseCard v-for="post in posts.list" v-bind="post" :key="post.title" class="col-span-1" />
        </div>

        <BasePagination v-if="posts.totalPage" v-model:current-page="currentPage" :totalPage="posts.totalPage" />

      </div>
    </template>
    <template #right-side>
      <p>分類</p>
      <div class="flex flex-wrap gap-2">
        <BaseTag v-for="category in categories" :key="category" @click="goToCategoriesPage(category)">
          {{ category }}
        </BaseTag>
      </div>
      <NuxtLink class="c-text-link my-4 text-sm block px-2" :to="`/${collection}/categories`">更多分類</NuxtLink>
    </template>
  </NuxtLayout>
</template>