<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const route = useRoute();
const { refreshArchivePosts, posts } = await usePosts(props.collection);
const currentPage = ref(1);
const currentTag = computed(() => (route.params?.tag || '') as string);
const tagName = computed(() => {
  if (currentTag.value === '') return '';
  return currentTag.value.charAt(0).toUpperCase() + currentTag.value.slice(1);
})

await refreshArchivePosts({ page: currentPage.value, type: 'tags', value: currentTag.value })

</script>
<template>
  <div>
    <div class="pb-4">
      <div class="text-sm text-center font-black font-zen-old-mincho pb-2">
        <span class="px-1">-</span>
        <NuxtLink v-if="collection === 'blog'" to="/blog"
          class="text-sm hover:text-primary pr-1 underline underline-offset-2">部落格</NuxtLink>
        <NuxtLink v-else to="/notes" class="text-sm hover:text-primary pr-1 underline underline-offset-2">筆記
        </NuxtLink>
        <span>標籤總覽</span>
        <span class="px-1">-</span>
      </div>
      <BaseTitle class="text-primary">
        「{{ tagName }}」
      </BaseTitle>
      <p v-if="posts.list.length > 0" class="text-lg text-center ">
        目前有
        <span class="text-primary font-medium">{{ posts.totalPosts || 0 }}</span>
        篇
      </p>
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