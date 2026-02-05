<script setup lang="ts">
import { getAssetPath } from '@/utils/assetPath';
import { isMobile } from '@/utils/responsive';

definePageMeta({
  middleware: async (to) => {
    const workParam = decodeURIComponent(String(to.params?.slug)) || '';
    const { data: work, error } = await useWorkDetail(to.path, workParam);
    if (error.value) {
      console.error("資料查詢錯誤:", error.value);
      await navigateTo('/works');
    }
    if (!work.value) {
      throw createError({
        statusCode: 404,
        statusMessage: `作品未找到：${workParam}`,
        fatal: true,
      });
    }
  },
});

const route = useRoute();
const workParam = decodeURIComponent(String(route.params?.slug)) || '';
const { data: work, pending } = await useWorkDetail(route.path, workParam);

usePageSEO({
  title: work.value?.title || '',
  description: work.value?.description || '',
  path: route.path,
})
</script>
<template>
  <div v-if="pending">載入中...</div>
  <article v-if="work" class="py-10">
    <section class="c-container">
      <nav>
        <BaseLink to="/works">作品列表</BaseLink>
        <span class="px-2">></span>
        <span class="text-primary cursor-default">{{ work.title }}</span>
      </nav>
      <h1 class="text-4xl font-black truncate py-4">{{ work.title }}</h1>
    </section>
    <section class="bg-primary/30">
      <div class="md:p-6 lg:p-10" :class="{ 'c-container': !isMobile }">
        <img v-if="work.image" :src="getAssetPath(work.image)" :alt="work.title" />
      </div>
    </section>
    <section class="flex flex-col-reverse items-center lg:items-start lg:flex-row gap-x-4 mt-6 c-container">
      <div class="lg:w-1/2 c-text-secondary text-center lg:text-left">
        <div v-if="work.date">
          <WorkTitle title="日期" subtitle="Date" />
          <p v-date-format="work.date"></p>
        </div>
        <div class="mt-4">
          <WorkTitle title="分類" subtitle="Category" />
          <p v-if="work.category">{{ work.category.toUpperCase() }}</p>
        </div>
        <div class="mt-4">
          <WorkTitle title="技能" subtitle="Skills" />
          <p v-if="work.skills.length > 0">{{ work.skills.join('、') }}</p>
        </div>
      </div>
      <div class="p-4 lg:p-0 lg:w-1/2 c-text-secondary">
        <div>
          <WorkTitle class="text-center lg:text-left" title="概要" subtitle="Summary" />
          <p v-if="work.description">{{ work.description }}</p>
        </div>
        <div v-if="work.link" class="mt-4 text-center lg:text-left">
          <Icon name="i-material-symbols:link-rounded" size="1.5rem" class="align-middle" />
          <BaseLink variant="underline" size="sm" class="pl-1 font-bold text-primary" :to="work.link" target="_blank">
            {{ work.link }}
          </BaseLink>
        </div>
      </div>
    </section>
  </article>
</template>