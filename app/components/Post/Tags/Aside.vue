<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const { tags, goToTagsPage } = await useTag(props.collection);
const route = useRoute();
const { isDesktop } = useResponsive();
const isExpanded = ref(false);

const currentTag = computed(() => (route.params?.tag || '') as string);
const isShowSidebar = computed(() => isDesktop.value ? true : isExpanded.value)

const { initScrollToTarget, containerRef, targetRefs } = useScrollToTarget(currentTag);
onMounted(async () => {
  await initScrollToTarget();
})
</script>

<template>
  <div class="h-full border-y c-border-secondary lg:border-none">
    <button @click="isExpanded = !isExpanded" class="py-2 px-4 flex items-center w-full lg:hidden">
      <p>
        <Icon name="i-solar:hamburger-menu-bold" size="1.2rem" class="align-middle" />
        {{ collection === 'blog' ? '部落格標籤' : '筆記標籤' }}
      </p>
      <p class="text-lg ml-auto px-3 transition-transform origin-center align-middle cursor-pointer"
        :class="{ 'rotate-45': isExpanded }">
        +
      </p>
    </button>
    <div v-if="isShowSidebar" class="bg-primary/10 py-2 px-3 lg:bg-transparent lg:pl-0 lg:py-0 lg:pr-4 lg:h-full">
      <div v-if="isDesktop" class="h-8">
        <BaseLink variant="outline" to="/blog/tags" size="xs" class="rounded-t-sm rounded-b-none border-b-0 mr-1"
          :isAction="collection === 'blog'">
          部落格標籤</BaseLink>
        <BaseLink variant="outline" to="/notes/tags" size="xs" class="rounded-t-sm rounded-b-none border-b-0"
          :isAction="collection === 'notes'">
          筆記標籤</BaseLink>
        <div class="border-b c-border-secondary border-dashed"></div>
      </div>
      <ul ref="containerRef" class="overflow-y-auto h-[calc(100%-2rem)]">
        <li ref="targetRefs" v-for="tag in tags" :key="tag" class="inline-block mr-1 mb-1">
          <BaseButton :size="isDesktop ? 'xs' : 'sm'" @click="goToTagsPage(tag)" :isAction="currentTag === tag">
            {{ tag }}
          </BaseButton>
        </li>
        <li v-if="isDesktop" class="border-b c-border-secondary border-dashed mb-2"></li>
      </ul>
    </div>
  </div>
</template>