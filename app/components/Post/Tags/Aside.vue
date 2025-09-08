<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const { tags, goToTagsPage } = await useTag(props.collection);
const route = useRoute();

const LIMIT_COUNT = 10;
const currentCount = ref(0);
currentCount.value = LIMIT_COUNT;

const currentTag = computed(() => (route.params?.tag || '') as string);

const { initScrollToTarget, containerRef, targetRefs } = useScrollToTarget(currentTag);
onMounted(async () => {
  await initScrollToTarget();
})
</script>

<template>
  <div class="h-full pr-4">
    <div class="h-8">
      <BaseLink to="/blog/tags" size="xs" class="rounded-t-sm rounded-b-none border-b-0 mr-1"
        :isAction="collection === 'blog'">
        部落格分類</BaseLink>
      <BaseLink to="/notes/tags" size="xs" class="rounded-t-sm rounded-b-none border-b-0"
        :isAction="collection === 'notes'">
        筆記分類</BaseLink>
      <div class="border-b c-border-secondary border-dashed"></div>
    </div>
    <ul ref="containerRef" class="overflow-y-auto h-[calc(100%-2rem)]">
      <li ref="targetRefs" v-for="tag in tags" :key="tag" class="inline-block mr-1 mb-1">
        <BaseButton size="xs" @click="goToTagsPage(tag)" :isAction="currentTag === tag">
          {{ tag }}
        </BaseButton>
      </li>
      <li class="border-b c-border-secondary border-dashed mb-2"></li>
    </ul>
  </div>
</template>