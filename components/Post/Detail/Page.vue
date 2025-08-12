<script setup lang="ts">
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const route = useRoute();

const { goToCategoriesPage } = await useCategory(props.collection);
const { prevData, nextData } = await useNavigation(props.collection, route.path);

// 文章
const { data: post } = await useAsyncData(`${props.collection}-detail`, () => {
  return queryCollection(props.collection).path(`/${props.collection}/${route.params.slug}`).first();
})

usePageSEO({
  title: post.value?.title || '',
  description: post.value?.description || '',
})


</script>

<template>
  <NuxtLayout name="content-with-sidebar">
    <template #content>
      <div v-if="post">
        <div class="border-b pb-6 pt-4 c-border-gray">
          <!-- 麵包屑 -->
          <nav class="c-text-gray">
            <NuxtLink to="/notes" class="hover:text-blue-400">筆記列表</NuxtLink>
            <span class="px-2">></span>
            <span class="text-c-light-blue cursor-default">{{ post.title }}</span>
          </nav>


          <h1 class="text-4xl font-bold py-4">{{ post.title }}</h1>
          <div class="pb-2 grid grid-cols-2 gap-x-2">
            <div class="col-span-1">
              <BaseDate class="align-middle inline-block" :date="post.date" />
            </div>
            <div class="col-span-1 text-right">
              <BaseTag class="mx-1 text-sm" v-for="category in post.categories" :key="category"
                @click="goToCategoriesPage(category)">
                {{ category }}
              </BaseTag>
            </div>
          </div>
          <p>{{ post.description }}</p>
        </div>

        <!-- 文章內容 -->
        <article class="prose prose-primary max-w-full dark:prose-invert">
          <ContentRenderer :value="post" />
        </article>

        <!-- Disqus 留言 -->
        <PostDetailDisqus class="py-6" :id="post.id" :title="post.title" />

        <!-- 上下篇文章 -->
        <div class="grid grid-cols-2 gap-x-4 ">
          <div class="col-span-1">
            <PostDetailSurroundCard v-if="prevData" :idx="0" :path="prevData.path" :title="prevData.title"
              :description="prevData.description" />
          </div>
          <div class="col-span-1">
            <PostDetailSurroundCard v-if="nextData" :idx="1" :path="nextData.path" :title="nextData.title"
              :description="nextData.description" />
          </div>
        </div>
      </div>
    </template>
    <template #right-side>
      <PostDetailToc :collection />
    </template>
  </NuxtLayout>
</template>
