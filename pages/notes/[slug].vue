<script setup lang="ts">
const { currSection,
  setNavListener } = useNavListener();
const route = useRoute();
const { goToCategoriesPage } = await useCategory('notes');


// 文章
const { data: note } = await useAsyncData('note', () => {
  return queryCollection('notes').path(`/notes/${route.params.slug}`).first();
})

// 上下篇文章
const { data: prevNote } = await useAsyncData('prevNote', async () => {
  const notes = await queryCollection('notes').select("title", "path", "description").all();
  if (notes.length <= 1) return null;
  const index = notes.findIndex((post) => post.path === route.path);
  if (index === -1) return null;
  // 如果有上一篇文章，返回上一篇，如果沒有，循環到最後一篇
  if (index > 0) {
    return notes[index - 1];
  }
  return notes[notes.length - 1];
});
const { data: nextNote } = await useAsyncData('nextNote', async () => {
  const notes = await queryCollection('notes').select("title", "path", "description").all();
  if (notes.length <= 1) return null;
  const index = notes.findIndex((post) => post.path === route.path);
  if (index === -1) return null;
  if (index < notes.length - 1) {
    return notes[index + 1];
  }
  // 如果沒有下一篇文章，循環到第一篇
  return notes[0];
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
    const allSectionsInNotes = await queryCollectionSearchSections('notes');
    const currNotes = allSectionsInNotes.filter(section =>
      section.id.startsWith(route.path)
    ) || [];
    const thanLevel2Sections = currNotes.filter(section => section.level >= 2);

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
          <BaseSurroundCard v-if="prevNote" class="col-span-1" :path="prevNote.path" :title="prevNote.title" :idx="0"
            :description="prevNote.description" />
          <BaseSurroundCard v-if="nextNote" class="col-span-1" :path="nextNote.path" :title="nextNote.title" :idx="1"
            :description="nextNote.description" />
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
