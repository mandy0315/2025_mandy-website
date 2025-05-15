<script setup lang="ts">
const route = useRoute();

const { goToCategoriesPage, getCategories } = useCategory();
const categories = useState<string[]>('categories', () => []);
const currentCategory = computed(() => route.params.category || '');
const categoriesLen = computed(() => categories.value.length || 0);

const checkAndToCategorylist = async () => {
  if (categoriesLen.value > 0 && currentCategory.value === '') {
    await navigateTo('/categories-posts/' + categories.value[0]);
  }
};

onMounted(async () => {
  categories.value = await getCategories();
  checkAndToCategorylist();
});
</script>
<template>
  <div>
    <BaseListTitle>分類</BaseListTitle>

    <div class="flex flex-wrap justify-center gap-2 pb-4">
      <BaseTag v-for="category in categories" :key="category" @click="goToCategoriesPage(category)"
        :isAction="currentCategory === category">
        {{ category }}
      </BaseTag>
    </div>

    <NuxtPage />
  </div>
</template>