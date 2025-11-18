<script setup lang="ts">
import { workListGroup } from "@/utils/workListMap/index"

const allData = [...workListGroup.values()].flat();

definePageMeta({
  middleware: (to) => {
    const currentSlug = to.params.slug || '';
    const data = allData
      .filter(item => item.id === currentSlug);
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
  return allData.find(item => item.id === currentSlug);
});

usePageSEO({
  title: currentWork.value?.title || '',
  description: currentWork.value?.description || '',
})

const { isMobile } = useResponsive();
</script>
<template>
  <article v-if="currentWork" class="py-10">
    <section class="c-container">
      <nav>
        <BaseLink to="/works">作品列表</BaseLink>
        <span class="px-2">></span>
        <span class="text-primary cursor-default">{{ currentWork.title }}</span>
      </nav>
      <h1 class="text-4xl font-black truncate py-4">{{ currentWork.title }}</h1>
    </section>
    <section class="bg-primary/30">
      <div class="md:p-6 lg:p-10" :class="{ 'c-container': !isMobile }">
        <img v-if="currentWork.image" :src="currentWork.image" :alt="currentWork.title" />
      </div>
    </section>
    <section class="flex flex-col-reverse items-center lg:items-start lg:flex-row gap-x-4 mt-6 c-container">
      <div class="lg:w-1/2 c-text-secondary text-center lg:text-left">
        <div v-if="currentWork.date">
          <WorkTitle title="日期" subtitle="Date" />
          <p v-date-format="currentWork.date"></p>
        </div>
        <div class="mt-4">
          <WorkTitle title="分類" subtitle="Category" />
          <p v-if="currentWork.category">{{ currentWork.category.toUpperCase() }}</p>
        </div>
        <div class="mt-4">
          <WorkTitle title="技能" subtitle="Skills" />
          <p v-if="currentWork.skills.length > 0">{{ currentWork.skills.join('、') }}</p>
        </div>
      </div>
      <div class="p-4 lg:p-0 lg:w-1/2 c-text-secondary">
        <div>
          <WorkTitle class="text-center lg:text-left" title="概要" subtitle="Summary" />
          <p v-if="currentWork.description">{{ currentWork.description }}</p>
        </div>
        <div v-if="currentWork.link" class="mt-4 text-center lg:text-left">
          <Icon name="i-material-symbols:link-rounded" size="1.5rem" class="align-middle" />
          <BaseLink variant="underline" size="sm" class="pl-1 font-bold text-primary" :to="currentWork.link" external>
            {{ currentWork.link }}
          </BaseLink>
        </div>
      </div>
    </section>
  </article>
</template>