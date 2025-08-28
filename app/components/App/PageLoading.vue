<script setup lang="ts">
const { isLoading, progress, startLoading, clearLoading, toggleStartLoading, resetRenderStart } = usePageLoading();


onMounted(() => {
  startLoading();
});
onUnmounted(() => {
  clearLoading();
});

watch(toggleStartLoading, async (newValue) => {
  if (newValue) {
    resetRenderStart();
    await nextTick();
    startLoading();
    toggleStartLoading.value = false; // reset flag
  }
});
</script>

<template>
  <div v-if="isLoading" class="fixed inset-0 z-110 bg-white flex flex-col justify-center items-center">
    <span class="text-gray-800">Loading <span>{{ Math.floor(progress) }}</span>% ...</span>
  </div>
</template>