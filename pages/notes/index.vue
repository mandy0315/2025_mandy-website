<script setup lang="ts">
usePageSEO({
  title: '筆記',
})
const { refreshCategories, goToCategoriesPage, categories } = await useCategory('notes');
await refreshCategories(10);

const currentPage = ref(1);
const { initPosts, refreshPosts, posts, isLoading, currentSort } = await usePosts('notes');
initPosts(currentPage.value);

watch([currentPage, currentSort], async () => {
  await refreshPosts(currentPage.value);
});

</script>
<template>
  <NuxtLayout name="content-with-sidebar">
    <template #content>
      <div v-if="isLoading">loading....</div>
      <div v-else>
        <BaseListTitle>
          筆記
          <template #directions>
            目前有
            <span class="text-c-light-blue font-medium">"{{ posts.totalPosts || 0 }}"</span>
            篇文章，紀錄著我生活大小事，歡迎閱讀！
          </template>
        </BaseListTitle>

        <div class="pb-4 ml-auto text-right">
          <p class="c-text-gray inline-block">文章排序：</p>
          <select v-model="currentSort" class="c-rounded-btn rounded py-1 px-2">
            <option value="DESC">新到舊</option>
            <option value="ASC">舊到新</option>
          </select>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <BaseCard v-for="note in posts.list" v-bind="note" :key="note.title" class="col-span-1" />
        </div>

        <BasePagination v-if="posts.totalPage" v-model:current-page="currentPage" :totalPage="posts.totalPage" />

      </div>
    </template>
    <template #right-side>
      <BaseSidebarTitle>分類</BaseSidebarTitle>
      <div class="flex flex-wrap gap-2">
        <BaseTag v-for="category in categories" :key="category" @click="goToCategoriesPage(category)">
          {{ category }}
        </BaseTag>
      </div>
      <NuxtLink class="c-text-link my-4 text-sm block px-2" to="/notes/categories">更多分類</NuxtLink>
    </template>
  </NuxtLayout>
</template>