<script setup lang="ts">
import { AppSearchItemTitle } from '#components';
import { useDebounceFn } from '@vueuse/core';

const { keywords, isShowSearchModal, posts, notes, pages, clearAllSearchList, updatedKeywords } = useSearch();
const debouncedSearch = useDebounceFn((newKeywords: string) => {
  updatedKeywords(newKeywords);
}, 1000);
watch(keywords, (newVal) => {
  debouncedSearch(newVal);
});
onMounted(() => {
  updatedKeywords('');
});

const setCloseModalAndToPage = (path: string) => {
  navigateTo(path);

  setTimeout(() => {
    isShowSearchModal.value = false;
  }, 300);
};

const isShowSearchList = computed(() => {
  return posts.value.length > 0 || pages.value.length > 0;
});

const searchListEl = ref<HTMLElement | null>(null);

const setSearchListHeight = () => {
  if (!searchListEl.value) return;
  searchListEl.value.style.height = 'auto';
  searchListEl.value.style.height = `${searchListEl.value.scrollHeight}px`;
};
watch([posts, pages], async () => {
  await nextTick();
  setSearchListHeight();
}, {
  immediate: true,
});
</script>

<template>

  <button @click="isShowSearchModal = !isShowSearchModal"
    class="w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-100/20 rounded">
    <Icon name="solar:magnifer-linear" class="align-middle" size="1.2rem" />
  </button>
  <Teleport to="body">
    <div v-if="isShowSearchModal">
      <div class="w-5/10 fixed top-20 transform -translate-x-1/2 left-1/2 overflow-hidden z-110">
        <button @click="updatedKeywords('')" class="absolute top-3 right-3 text-gray-500 z-20 text-2xl ">
          <Icon name="solar:close-circle-bold" class="dark:hover:text-white" />
        </button>
        <label
          class="relative w-full h-12 flex bg-white rounded-t border border-gray-300 dark:border-gray-500 dark:bg-gray-800">
          <input type="text" v-model="keywords" @input="clearAllSearchList"
            class="px-10 w-full focus:outline-none focus:ring-0 focus:border-0 h-full" placeholder="搜尋網站..." />
          <Icon name="solar:magnifer-linear" class="absolute top-3.5 left-3 text-gray-500 z-10 text-lg" />
        </label>
      </div>

      <div ref="searchListEl"
        class="w-5/10 fixed top-32 transform -translate-x-1/2 left-1/2 bg-white dark:bg-gray-800 rounded-b border-l border-r border-gray-300 shadow-lg z-110  dark:border-gray-500  overflow-y-scroll border-b"
        :class="{ 'p-4 border-b': isShowSearchList }">

        <!-- 文章 -->
        <AppSearchItemTitle v-if="posts.length > 0" title="文章" />
        <AppSearchItemButton v-for="(post, idx) in posts" :key="idx" :keywords="keywords" :title="post.title"
          :description="post.description" @handleToPage="setCloseModalAndToPage(post.path)" />

        <!-- 筆記 -->
        <AppSearchItemTitle v-if="notes.length > 0" title="筆記" />
        <AppSearchItemButton v-for="(note, idx) in notes" :key="idx" :keywords="keywords" :title="note.title"
          :description="note.description" @handleToPage="setCloseModalAndToPage(note.path)" />

        <!-- 頁面 -->
        <AppSearchItemTitle v-if="pages.length > 0" title="頁面" />
        <AppSearchItemButton v-for="(page, idx) in pages" :key="idx" icon="solar:folder-bold" :keywords="keywords"
          :title="page.title" @handleToPage="setCloseModalAndToPage(page.path)" />
      </div>

      <div @click.stop="isShowSearchModal = false" class="fixed inset-0 w-full h-full bg-black/40 z-100"></div>
    </div>
  </Teleport>


</template>