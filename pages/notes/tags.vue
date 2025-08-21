<script setup lang="ts">
const route = useRoute();
const currentTag = computed(() => route.params.tag || '');

definePageMeta({
  middleware: ['tags']
})

usePageSEO({
  title: currentTag.value ? `${currentTag.value} | 筆記標籤` : '筆記標籤',
})
</script>
<template>
  <div>
    <div>歡迎來到標籤頁</div>
    <NuxtPage />
  </div>

</template>