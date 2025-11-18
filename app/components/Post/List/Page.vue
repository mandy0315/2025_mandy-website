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
const postIndex = computed(() => currentPage.value === 1 ? 1 : 0);

</script>
<template>
  <NuxtLayout name="post">
    <template #default>
      <div v-if="pending">載入中....</div>
      <div v-else class="pb-10">
        <div class="pb-6">
          <BaseTitle>
            <span v-if="collection === 'blog'">部落格</span>
            <span v-else>筆記</span>
          </BaseTitle>
          <p v-if="posts.list.length > 0" class="text-lg text-center ">
            共
            <span class="text-primary font-medium">{{ posts.totalPosts || 0 }}</span>
            篇
          </p>
        </div>

        <BaseSelect class="pb-4" v-model="currentSort" labelTitle="文章排序:"
          :options="[{ label: '新到舊', value: 'DESC' }, { label: '舊到新', value: 'ASC' }]" />

        <div v-if="collection === 'blog'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <template v-for="(post, index) in posts.list" :key="post.title">
            <PostCard v-if="currentPage === 1 && index === 0" v-bind="{ ...post, isHorizontal: true }"
              class="col-span-1 lg:col-span-full" />
            <PostCard v-if="index >= postIndex" v-bind="post" class="col-span-1" />
          </template>
        </div>
        <div v-if="collection === 'notes'" class="border-t border-b c-border-secondary">
          <PostItem v-for="post in posts.list" v-bind="post" :key="post.title"
            class="border-b c-border-secondary last:border-0" />
        </div>


        <BasePagination v-if="posts.totalPage" v-model:current-page="currentPage" :totalPage="posts.totalPage" />

      </div>
    </template>
    <template #sidebar>
      <PostListAside :collection />
    </template>
  </NuxtLayout>
</template>