<script setup lang="ts">
const route = useRoute();

const { currSection,
  setNavListener } = useNavListener();
const { goToCategoriesPage } = await useCategory();
const { prevData, nextData } = await useNavigation('posts', route.path);

// 文章
const { data: post } = await useAsyncData('post', async () => {
  return await queryCollection('posts').path(`/posts/${route.params.slug}`).first();
})

usePageSEO({
  title: post.value?.title || '',
  description: post.value?.description || '',
})

// 右側目錄
type Section = {
  id: string;
  title: string;
  element: HTMLElement | null;
  level: number;
};

const { data: tocInPosts } = await useAsyncData('tocInPosts', () => {
  return queryCollectionSearchSections('posts');
});
const tocInfo = ref<Section[] | null>(null);
const setTocInfo = async () => {
  const currSections = tocInPosts.value?.filter(section =>
    section.id.startsWith(route.path)
  ) || [];
  const thanLevel2Sections = currSections.filter(section => section.level >= 2);

  if (thanLevel2Sections.length > 0) {
    tocInfo.value = thanLevel2Sections.map((section) => {
      const target = section.id.replace('#', '').replace(route.path, '');
      return {
        id: `#${target}`,
        title: section.title,
        element: document.getElementById(target),
        level: section.level
      };
    });
  }
};
const initToc = async () => {
  await setTocInfo();
  if (!tocInfo.value) return;
  setNavListener({
    navs: tocInfo.value.map(section => {
      return {
        title: section.title,
        element: section.element
      }
    }),
  });
}
onMounted(() => {
  initToc();
})
</script>

<template>
  <NuxtLayout name="content-with-sidebar">
    <template #content>
      <div v-if="post">
        <div class="border-b pb-6 pt-4 c-border-gray">
          <!-- 麵包屑 -->
          <nav class="c-text-gray">
            <NuxtLink to="/posts" class="hover:text-blue-400">文章列表</NuxtLink>
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
        <BaseDisqus class="py-6" :id="post.id" :title="post.title" />

        <!-- 上下篇文章 -->
        <div class="grid grid-cols-2 gap-x-4 ">
          <div class="col-span-1">
            <BaseSurroundCard v-if="prevData" :idx="0" :path="prevData.path" :title="prevData.title"
              :description="prevData.description" />
          </div>
          <div class="col-span-1">
            <BaseSurroundCard v-if="nextData" :idx="1" :path="nextData.path" :title="nextData.title"
              :description="nextData.description" />
          </div>
        </div>
      </div>
    </template>
    <template #right-side>
      <BaseSidebarTitle>目錄</BaseSidebarTitle>
      <ul class="c-text-gray">
        <li v-for="section in tocInfo">
          <NuxtLink v-if="section.element" class=" hover:text-blue-400 cursor-pointer"
            :class="[{ 'text-blue-400': currSection === section.title }, { 'pl-4': section.level === 3 }]"
            :to="`${route.path}${section.id}`">
            {{ section.title }}
          </NuxtLink>
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>
