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
const currentTags = computed(() =>
  tags.value.slice(0, currentCount.value)
);

const isToggleButton = computed(() => tags.value.length > 10);

const hasMore = computed(() => currentCount.value < tags.value.length);

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
      <BaseLink to="/blog/tags" size="xs" class="rounded-t-sm rounded-b-none border-b-0 mr-1"
        :isAction="collection === 'blog'">
        部落格分類</BaseLink>
      <BaseLink to="/notes/tags" size="xs" class="rounded-t-sm rounded-b-none border-b-0"
        :isAction="collection === 'notes'">
        筆記分類</BaseLink>
      <div class="border-b c-border-secondary border-dashed"></div>
    </div>
    <div class="overflow-y-auto h-[calc(100%-2rem)]">
      <div class="py-2 flex flex-wrap gap-1 ">
        <BaseButton v-for="tag in currentTags" :key="tag" size="xs" @click="goToTagsPage(tag)"
          :isAction="currentTag === tag">
          {{ tag }}
        </BaseButton>
      </div>

      <BaseButton v-if="isToggleButton" size="sm" class="w-full rounded-sm mb-2" @click="handleToggle">
        {{ hasMore ? '顯示更多' : '收起' }}
      </BaseButton>
      <div class="border-b c-border-secondary border-dashed mb-2"></div>
    </div>
  </div>
</template>