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
  <article v-if="currentWork" class="py-10">
    <section>
      <nav class="c-text-gray">
        <NuxtLink to="/works" class="hover:text-blue-400">作品列表</NuxtLink>
        <span class="px-2">></span>
        <span class="text-c-light-blue cursor-default">{{ currentWork.title }}</span>
      </nav>
      <h2 class="text-3xl py-4">{{ currentWork.title }}</h2>
    </section>
    <section>
      <img v-if="currentWork.image" :src="currentWork.image" :alt="currentWork.title" />
    </section>
    <section class="grid grid-cols-2 gap-x-4 mt-6">
      <div>
        <div>
          <p class="text-sm c-text-gray">日期</p>
          <p v-if="currentWork.date" v-date-format="currentWork.date"></p>
          <p v-else>未紀錄</p>
        </div>
        <div class="mt-4">
          <p class="text-sm c-text-gray">分類</p>
          <p v-if="currentWork.category">{{ currentWork.category.toUpperCase() }}</p>
        </div>
        <div class="mt-4">
          <p class="text-sm c-text-gray">技能</p>
          <p v-if="currentWork.skills.length > 0">{{ currentWork.skills.join('、') }}</p>
        </div>
      </div>
      <div>
        <div>
          <p class="text-sm c-text-gray">作品說明</p>
          <p v-if="currentWork.description">{{ currentWork.description }}</p>
        </div>
        <div v-if="currentWork.link" class="mt-4">
          <NuxtLink :to="currentWork.link" no-rel class=" inline-block c-text-link no-underline">
            外部連結
            <Icon name="solar:link-linear" size="1.2rem" class="align-middle" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </article>
</template>