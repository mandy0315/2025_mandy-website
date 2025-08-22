<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const { categories, goToCategoriesPage } = await useCategory(props.collection);
const route = useRoute();

const LIMIT_COUNT = 10;
const currentCount = ref(0);
currentCount.value = LIMIT_COUNT;

const currentCategory = computed(() => (route.params?.category || '') as string);
const currentCategories = computed(() =>
  categories.value.slice(0, currentCount.value)
);

const isToggleButton = computed(() => categories.value.length > 10);

const hasMore = computed(() => currentCount.value < categories.value.length);

const handleToggle = () => {
  if (hasMore.value) {
    currentCount.value += LIMIT_COUNT;
  } else {
    currentCount.value = LIMIT_COUNT;
  }
};
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

    <div class="overflow-y-auto h-[calc(100%-2rem)]">
      <PostCategoryButton v-for="category in currentCategories" :key="category" :category
        :isAction="currentCategory === category" @click="goToCategoriesPage(category)" />

      <BaseButton v-if="isToggleButton" size="sm" class="w-full rounded-sm mb-2" @click="handleToggle">
        {{ hasMore ? '顯示更多' : '收起' }}
      </BaseButton>
      <div class="border-b c-border-secondary border-dashed "></div>
    </div>
  </div>
</template>