<script setup lang="ts">

const { currSection,
  setNavListener } = useNavListener();
const route = useRoute();
const { goToCategoriesPage } = await useCategory();

// 文章
const { data: post } = await useAsyncData('post', () => {
  return queryCollection('posts').path(`/posts/${route.params.slug}`).first();
})

// 上下篇文章
const { data: prevPost } = await useAsyncData('prevPost', async () => {
  const posts = await queryCollection('posts').select("title", "path", "description").all();
  if (posts.length <= 1) return null;
  const index = posts.findIndex((post) => post.path === route.path);
  if (index === -1) return null;
  // 如果有上一篇文章，返回上一篇，如果沒有，循環到最後一篇
  if (index > 0) {
    return posts[index - 1];
  }
  return posts[posts.length - 1];
});
const { data: nextPost } = await useAsyncData('nextPost', async () => {
  const posts = await queryCollection('posts').select("title", "path", "description").all();
  if (posts.length <= 1) return null;
  const index = posts.findIndex((post) => post.path === route.path);
  if (index === -1) return null;
  if (index < posts.length - 1) {
    return posts[index + 1];
  }
  // 如果沒有下一篇文章，循環到第一篇
  return posts[0];
});

// 右側目錄
type Section = {
  title: string;
  element: HTMLElement | null;
  level: number;
};
const sectionsInfo = ref<Section[] | null>(null);
const handleScrollToSection = (section: Section) => {
  const MARGIN_TOP = 10;
  if (section?.element) {
    window.scrollTo({
      top: section?.element.offsetTop - MARGIN_TOP,
      behavior: 'smooth',
    });
  };
}
const setSectionsInfo = async () => {
  try {
    const allSectionsInPosts = await queryCollectionSearchSections('posts');
    const currPosts = allSectionsInPosts.filter(section =>
      section.id.startsWith(route.path)
    ) || [];
    const thanLevel2Sections = currPosts.filter(section => section.level >= 2);

    if (thanLevel2Sections.length > 0) {
      sectionsInfo.value = thanLevel2Sections.map((section) => {
        const target = section.id.replace('#', '').replace(route.path, '');
        return {
          title: section.title,
          element: document.getElementById(target),
          level: section.level
        };
      });
    }

  } catch (error) {
    console.error('取得文章段落錯誤', error);
  }
};

const initRightSide = async () => {
  await setSectionsInfo();
  if (!sectionsInfo.value) return;
  setNavListener({
    navs: sectionsInfo.value.map(section => {
      return {
        title: section.title,
        element: section.element
      }
    }),
  });
}
onMounted(() => {
  initRightSide();
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
          <BaseSurroundCard v-if="prevPost" class="col-span-1" :path="prevPost.path" :title="prevPost.title" :idx="0"
            :description="prevPost.description" />
          <BaseSurroundCard v-if="nextPost" class="col-span-1" :path="nextPost.path" :title="nextPost.title" :idx="1"
            :description="nextPost.description" />
        </div>
      </div>
    </template>
    <template #right-side>
      <BaseSidebarTitle>目錄</BaseSidebarTitle>
      <ul class="c-text-gray">
        <li v-for="section in sectionsInfo">
          <div v-if="section.element" class=" hover:text-blue-400 cursor-pointer"
            :class="[{ 'text-blue-400': currSection === section.title }, { 'pl-4': section.level === 3 }]"
            @click="handleScrollToSection(section)">
            {{ section.title }}
          </div>
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>
