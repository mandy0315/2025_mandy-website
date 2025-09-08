<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const { categories, goToCategoriesPage } = await useCategory(props.collection);
const route = useRoute();


const currentCategory = computed(() => (route.params?.category || '') as string);

const { initScrollToTarget, containerRef, targetRefs } = useScrollToTarget(currentCategory);
onMounted(async () => {
  await initScrollToTarget();
})
</script>

<template>
  <div class="h-full pr-4">
    <div class="h-8">
      <BaseLink to="/blog/categories" size="xs" class="rounded-t-sm rounded-b-none border-b-0 mr-1"
        :isAction="collection === 'blog'">
        部落格分類</BaseLink>
      <BaseLink to="/notes/categories" size="xs" class="rounded-t-sm rounded-b-none border-b-0"
        :isAction="collection === 'notes'">
        筆記分類</BaseLink>
      <div class="border-b c-border-secondary border-dashed"></div>
    </div>

    <ul ref="containerRef" class="overflow-y-auto h-[calc(100%-2rem)]">
      <li ref="targetRefs" v-for="category in categories" :key="category">
        <PostCategoryButton :category :isAction="currentCategory === category" @click="goToCategoriesPage(category)" />
      </li>
      <li class="border-b c-border-secondary border-dashed"></li>
    </ul>
  </div>
</template>