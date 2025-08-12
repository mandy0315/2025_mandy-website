<script setup lang="ts">
// 右側目錄
type Section = {
  id: string;
  title: string;
  element: HTMLElement | null;
  level: number;
};
const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const route = useRoute();
const { currSection,
  setNavListener } = useNavListener();

const { data: tocInNote } = await useAsyncData(`${props.collection}-detail-toc`, () => {
  return queryCollectionSearchSections(props.collection);
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
  <ClientOnly>
    <p class="font-medium pb-2 text-lg">目錄</p>
    <ul class="c-text-gray">
      <li v-for="section in tocInfo">
        <NuxtLink v-if="section.element" class=" hover:text-blue-400 cursor-pointer"
          :class="[{ 'text-blue-400': currSection === section.title }, { 'pl-4': section.level === 3 }]"
          :to="`${route.path}${section.id}`">
          {{ section.title }}
        </NuxtLink>
      </li>
    </ul>
  </ClientOnly>
</template>