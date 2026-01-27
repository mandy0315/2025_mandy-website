<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
  currentPath: string;
}>();

const { data } = await useAsyncData(`navigation-${props.collection}`, () => {
  return queryCollection(props.collection)
    .order("date", "ASC")
    .select("title", "path", "description")
    .all();
});

const currentIndex = computed(() => {
  if (!data.value?.length) return -1;
  return data.value.findIndex(item => item.path === props.currentPath);
});

const prevData = computed(() => {
  const index = currentIndex.value;
  return (index > 0 && data.value) ? data.value[index - 1] : null;
});

const nextData = computed(() => {
  const index = currentIndex.value;
  return (index !== -1 && index < (data.value?.length ?? 0) - 1 && data.value) ? data.value[index + 1] : null;
});
</script>

<template>
  <nav class="grid grid-cols-2 gap-x-4">
    <div class="col-span-1">
      <PostDetailSurroundCard v-if="prevData" :idx="0" :path="prevData.path" :title="prevData.title"
        :description="prevData.description" />
    </div>
    <div class="col-span-1">
      <PostDetailSurroundCard v-if="nextData" :idx="1" :path="nextData.path" :title="nextData.title"
        :description="nextData.description" />
    </div>
  </nav>
</template>