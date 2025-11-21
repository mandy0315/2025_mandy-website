<script setup lang="ts">
const { progress, isLoading, closeLoading } = usePageLoading();

onUnmounted(() => {
  closeLoading();
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-110 bg-white flex flex-col justify-center items-center">
      <span class="text-gray-800">Loading <span>{{ Math.floor(progress) }}</span>% ...</span>
    </div>
  </Transition>
</template>