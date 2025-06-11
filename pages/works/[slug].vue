<script setup lang="ts">
import { workDataMap, type WorkItem } from '@/utils/workDataMap'

const allData = [...workDataMap.values()].flat();

definePageMeta({
  middleware: (to) => {
    const currentSlug = to.params.slug || '';
    const data = allData
      .filter((item: WorkItem) => item.id === currentSlug);
    if (data.length === 0) {
      showError({
        statusCode: 404,
        statusMessage: "Work Not Found",
      });
    }
  },
});

const route = useRoute();
const currentWork = computed(() => {
  const currentSlug = route.params.slug || '';
  return allData.find((item: WorkItem) => item.id === currentSlug);
});

</script>
<template>
  <article v-if="currentWork">
    <section>
      <h2>{{ currentWork.title }}</h2>

    </section>
    <section>
      <img v-if="currentWork.image" :src="currentWork.image" :alt="currentWork.title" />
    </section>
    <section>

    </section>
  </article>
</template>