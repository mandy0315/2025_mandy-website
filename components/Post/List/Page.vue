<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const currentPage = ref(1);
const { setPosts, refreshPosts, posts, pending, currentSort } = await usePosts(props.collection);
setPosts(currentPage.value);

watch([currentPage, currentSort], async () => {
  await refreshPosts(currentPage.value);
});

</script>
<template>
  <NuxtLayout name="right-sidebar">
    <template #content>
      <div v-if="pending">載入中....</div>
      <div v-else>
        <div class="py-4">
          <BaseTitle>
            <span v-if="collection === 'blog'">部落格</span>
            <span v-else>筆記</span>
          </BaseTitle>
          <p v-if="posts.list.length > 0" class="text-lg text-center ">
            目前有
            <span class="text-primary font-medium">{{ posts.totalPosts || 0 }}</span>
            篇
          </p>
        </div>

        <div class="pb-4">
          <p class="inline-block text-sm text-secondary-light dark:text-secondary-dark">文章排序：</p>
          <select v-model="currentSort" class="border c-border-secondary rounded py-1 px-2">
            <option value="DESC">新到舊</option>
            <option value="ASC">舊到新</option>
          </select>
        </div>

        <div v-if="collection === 'blog'" class="grid grid-cols-3 gap-4">
          <PostCard v-for="post in posts.list" v-bind="post" :key="post.title" class="col-span-1" />
        </div>
        <div v-if="collection === 'notes'" class="border-t border-b c-border-secondary">
          <PostItem v-for="post in posts.list" v-bind="post" :key="post.title"
            class="border-b c-border-secondary last:border-0" />
        </div>


        <BasePagination v-if="posts.totalPage" v-model:current-page="currentPage" :totalPage="posts.totalPage" />

      </div>
    </template>
    <template #right-side>
      <PostListAside :collection />
    </template>
  </NuxtLayout>
</template>