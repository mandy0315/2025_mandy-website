<script setup lang="ts">
const route = useRoute();
const { updateNotesInCategory, notes } = useNote();
const currentPage = ref(1);
const currentCategory = computed(() => route.params.category as string);

updateNotesInCategory(currentPage.value, currentCategory.value);
</script>
<template>
  <ClientOnly>
    <div>
      <div class="grid grid-cols-3 gap-4">
        <BaseCard v-for="note in notes.list" v-bind="note" :key="note.title" class="col-span-1" />
      </div>

      <BasePagination v-if="notes.totalPage" v-model:current-page="currentPage" :totalPage="notes.totalPage" />
    </div>
  </ClientOnly>
</template>