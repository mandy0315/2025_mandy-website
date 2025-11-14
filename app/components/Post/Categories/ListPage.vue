<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const route = useRoute();
const { refreshArchivePosts, posts } = await usePosts(props.collection);
const currentPage = ref(1);
const currentCategory = computed(() => (route.params?.category || '') as string);
const categoryName = computed(() => {
  if (currentCategory.value === '') return '';
  return currentCategory.value.charAt(0).toUpperCase() + currentCategory.value.slice(1);
})

await refreshArchivePosts({ page: currentPage.value, type: 'category', value: currentCategory.value })
</script>
<template>
  <div>
    <!-- title -->
    <div class="pb-4">
      <div class="lg:text-sm text-center font-black font-zen-old-mincho pb-2">
        <span class="px-1">-</span>
        <NuxtLink v-if="collection === 'blog'" to="/blog" class=" hover:text-primary pr-1 underline underline-offset-2">
          部落格</NuxtLink>
        <NuxtLink v-else to="/notes" class=" hover:text-primary pr-1 underline underline-offset-2">筆記
        </NuxtLink>
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