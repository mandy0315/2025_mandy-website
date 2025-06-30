<script setup lang="ts">
const route = useRoute();

const { currSection,
  setNavListener } = useNavListener();
const { goToCategoriesPage } = await useCategory('notes');
const { prevData, nextData } = await useNavigation('notes', route.path);

// 文章
const { data: note } = await useAsyncData('note', () => {
  return queryCollection('notes').path(`/notes/${route.params.slug}`).first();
})

usePageSEO({
  title: note.value?.title || '',
  description: note.value?.description || '',
})

// 右側目錄
type Section = {
  id: string;
  title: string;
  element: HTMLElement | null;
  level: number;
};

const { data: tocInNote } = await useAsyncData('tocInNote', () => {
  return queryCollectionSearchSections('notes');
});
const tocInfo = ref<Section[] | null>(null);
const setTocInfo = async () => {
  const currSections = tocInNote.value?.filter(section =>
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
      <div v-if="note">
        <div class="border-b pb-6 pt-4 c-border-gray">
          <!-- 麵包屑 -->
          <nav class="c-text-gray">
            <NuxtLink to="/notes" class="hover:text-blue-400">筆記列表</NuxtLink>
            <span class="px-2">></span>
            <span class="text-c-light-blue cursor-default">{{ note.title }}</span>
          </nav>


          <h1 class="text-4xl font-bold py-4">{{ note.title }}</h1>
          <div class="pb-2 grid grid-cols-2 gap-x-2">
            <div class="col-span-1">
              <BaseDate class="align-middle inline-block" :date="note.date" />
            </div>
            <div class="col-span-1 text-right">
              <BaseTag class="mx-1 text-sm" v-for="category in note.categories" :key="category"
                @click="goToCategoriesPage(category)">
                {{ category }}
              </BaseTag>
            </div>
          </div>
          <p>{{ note.description }}</p>
        </div>

        <!-- 文章內容 -->
        <article class="prose prose-primary max-w-full dark:prose-invert">
          <ContentRenderer :value="note" />
        </article>

        <!-- Disqus 留言 -->
        <BaseDisqus class="py-6" :id="note.id" :title="note.title" />

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
