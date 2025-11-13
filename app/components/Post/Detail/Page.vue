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


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <NuxtLayout name="post">
    <template #default>
      <div v-if="post">
        <div class="border-b pb-6 pt-4 border-primary">
          <!-- 麵包屑 -->
          <nav class="">
            <NuxtLink to="/notes" class="hover:text-blue-400">筆記列表</NuxtLink>
            <span class="px-2">></span>
            <span class="text-primary cursor-default">{{ post.title }}</span>
          </nav>


          <h1 class="text-4xl font-bold py-4">{{ post.title }}</h1>
          <div class="pb-2 grid grid-cols-2 gap-x-2">
            <div class="col-span-1">
              <PostDate class="align-middle inline-block" :date="post.date" />
            </div>
            <div class="col-span-1 text-right">
              <BaseButton size="sm" @click="goToCategoriesPage(post.category)">{{ post.category }}</BaseButton>
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
      <button @click="scrollToTop()"
        class="fixed z-100 bottom-6 right-6 w-14 rounded-full bg-primary text-white hover:bg-primary-dark active:bg-primary active:text-white shadow-lg">
        <Icon name="i-solar:alt-arrow-up-linear" size="3rem" />
      </button>
    </template>
    <template #sidebar>
      <PostDetailToc :collection />
    </template>
  </NuxtLayout>
</template>
