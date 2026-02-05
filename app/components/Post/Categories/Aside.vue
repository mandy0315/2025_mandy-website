<script setup lang="ts">
import { isDesktop } from '@/utils/responsive';

const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const { categories } = await useCategory(props.collection);
const route = useRoute();
const isExpanded = ref(false);
const config = useRuntimeConfig();


const isShowNotesPage = computed(() => config.public.SHOW_NOTES_PAGE);
const currentCategory = computed(() => {
  const category = (route.params?.category) as string || '';
  return decodeURIComponent(category);
});
const isShowSidebar = computed(() => isDesktop.value ? true : isExpanded.value)


const goToCategoriesPage = async (category: string) => {
  await navigateTo(`/${props.collection}/categories/${category}`);
};

const { scrollTo, containerRef, targetRefs } = useScrollToTarget();
onMounted(async () => {
  void containerRef; // 用於模板中的 ref="containerRef"
  void targetRefs; // 用於模板中的 ref="targetRefs"
  await scrollTo(currentCategory.value);
})

</script>

<template>
  <aside class="h-full border-y c-border-secondary lg:border-none">
    <BaseButton @click="isExpanded = !isExpanded" class="py-2 px-4 flex items-center w-full lg:hidden"
      :isAction="isExpanded">
      <p>
        <Icon name="i-solar:hamburger-menu-bold" size="1.2rem" class="align-middle" />
        {{ collection === 'blog' ? '部落格分類' : '筆記分類' }}
      </p>
      <p class="text-lg ml-auto px-3 transition-transform origin-center align-middle cursor-pointer"
        :class="{ 'rotate-45': isExpanded }">
        +
      </p>
    </BaseButton>
    <div v-if="isShowSidebar" class="bg-primary/10 py-2 px-3 lg:bg-transparent lg:pl-0 lg:py-0 lg:pr-4 lg:h-full">
      <div v-if="isDesktop" class="h-8">
        <BaseLink variant="outline" to="/blog/categories" size="xs" class="rounded-t-sm rounded-b-none border-b-0 mr-1"
          :isAction="collection === 'blog'">
          部落格分類</BaseLink>
        <BaseLink v-if="isShowNotesPage" variant="outline" to="/notes/categories" size="xs"
          class="rounded-t-sm rounded-b-none border-b-0" :isAction="collection === 'notes'">
          筆記分類</BaseLink>
        <div class="border-b c-border-secondary border-dashed"></div>
      </div>
      <ul ref="containerRef"
        class="grid grid-cols-2 gap-1 md:grid-cols-3 lg:block lg:overflow-y-auto lg:h-[calc(100%-2rem)]">

        <li ref="targetRefs" v-for="category in categories" :key="category">
          <PostCategoryButton :category :isAction="currentCategory === category"
            @click="goToCategoriesPage(category)" />
        </li>
        <li v-if="isDesktop" class="border-b c-border-secondary border-dashed"></li>
      </ul>
    </div>
  </aside>
</template>