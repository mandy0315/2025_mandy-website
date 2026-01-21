<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const route = useRoute();

const categoryName = computed(() => {
  const category = (route.params?.category) as string || '';
  const decodedCategory = decodeURIComponent(category);
  return decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
})

const { posts, currentPage, refreshPosts, currentSort } = await useArchivePosts({
  type: 'category',
  collection: props.collection,
});

watch(currentPage, async () => {
  await refreshPosts();
});
watch([currentSort, categoryName], async () => {
  currentPage.value = 1;
  await refreshPosts();
});
</script>
<template>
  <div>
    <!-- title -->
    <div class="pb-4">
      <div class="lg:text-sm text-center font-bold font-zen-old-mincho pb-2">
        <span class="px-1">-</span>
        <BaseLink variant="underline" :to="collection === 'blog' ? '/blog' : '/notes'" class="pr-2">{{ collection ===
          'blog' ? '部落格'
          : '筆記' }}
        </BaseLink>
        <span>分類總覽</span>
        <span class="px-1">-</span>
      </div>
      <BaseTitle class="text-primary">
        「{{ categoryName }}」
      </BaseTitle>
      <p v-if="posts.list.length > 0" class="text-lg text-center ">
        共
        <span class="text-primary font-medium">{{ posts.totalPosts || 0 }}</span>
        篇
      </p>
    </div>

    <BaseSelect class="pb-4" v-model="currentSort" labelTitle="文章排序:"
      :options="[{ label: '新到舊', value: 'DESC' }, { label: '舊到新', value: 'ASC' }]" />

    <!-- content -->
    <div class="pb-20 lg:pb-0">
      <div v-if="collection === 'blog'" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        <PostCard v-for="post in posts.list" v-bind="post" :key="post.title" class="col-span-1" />
      </div>
      <div v-if="collection === 'notes'" class="border-t border-b c-border-secondary">
        <PostItem v-for="post in posts.list" v-bind="post" :key="post.title"
          class="border-b c-border-secondary last:border-0" />
      </div>

      <BasePagination v-if="posts.totalPage" v-model:current-page="currentPage" :totalPage="posts.totalPage" />
    </div>
  </div>
</template>