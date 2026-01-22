<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const route = useRoute()
const { goToCategoriesPage } = await useCategory(props.collection);
const { prevData, nextData } = await useNavigation(props.collection, route.path);

const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection(props.collection).path(route.path).first()
})

usePageSEO({
  title: post.value?.title || '',
  description: post.value?.description || '',
  path: route.path,
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div>
    <article v-if="post">
      <!-- 麵包屑 -->
      <nav class="pt-4">
        <BaseLink :to="collection === 'blog' ? '/blog' : '/notes'">{{ collection === 'blog' ?
          '部落格' : '筆記' }}列表
        </BaseLink>
        <span class="px-2">></span>
        <span class="text-primary cursor-default">{{ post.title }}</span>
      </nav>

      <!-- 標題 ＆ 說明 -->
      <section class="border-b pb-6 border-primary">
        <h1 class="text-4xl font-bold py-4">{{ post.title }}</h1>
        <div class="pb-2 lg:flex lg:flex-wrap lg:justify-between lg:gap-x-2">
          <div class="pb-3 lg:pb-0 ">
            <PostDate class="align-middle inline-block" :date="post.date" />
          </div>
          <div class="pb-3 lg:pb-0 lg:text-right">
            <BaseButton variant="outline" class="text-sm px-2 py-1 lg:text-xs"
              @click="goToCategoriesPage(post.category)">{{
                post.category }}
            </BaseButton>
          </div>
        </div>
        <p>{{ post.description }}</p>
      </section>

      <!-- 文章內容 -->
      <section class="prose max-w-full dark:prose-invert">
        <ContentRenderer :value="post" />
      </section>

      <!-- Disqus 留言 -->
      <section class="py-6">
        <PostDetailDisqus :id="post.id" :title="post.title" />
      </section>

      <!-- 上下篇文章 -->
      <nav class="grid grid-cols-2 gap-x-4 ">
        <div class="col-span-1">
          <PostDetailSurroundCard v-if="prevData" :idx="0" :path="prevData.path" :title="prevData.title"
            :description="prevData.description" />
        </div>
        <div class="col-span-1">
          <PostDetailSurroundCard v-if="nextData" :idx="1" :path="nextData.path" :title="nextData.title"
            :description="nextData.description" />
        </div>
      </nav>
    </article>
    <BaseButton variant="solid" @click="scrollToTop()" class="fixed z-100 bottom-6 right-6 w-14 rounded-full shadow-lg">
      <Icon name="i-solar:alt-arrow-up-linear" size="3rem" />
    </BaseButton>
  </div>
</template>
