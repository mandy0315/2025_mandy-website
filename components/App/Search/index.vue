<script setup lang="ts">
import { AppSearchItemTitle } from '#components';
import { watchDebounced } from '@vueuse/core';


const { isSearch, keywords, isShowSearchModal, posts, notes, pages, categories_posts, categories_notes, works, updatedKeywords } = await useSearch();
watchDebounced(
  keywords,
  (newVal) => {
    updatedKeywords(newVal);
  },
  { debounce: 400 }
);
onMounted(() => {
  updatedKeywords('');
});

const setCloseModalAndToPage = (path: string) => {
  navigateTo(path);

  setTimeout(() => {
    isShowSearchModal.value = false;
  }, 300);
};

const searchListEl = ref<HTMLElement | null>(null);

const setSearchListHeight = () => {
  if (!searchListEl.value) return;
  searchListEl.value.style.height = 'auto';
  searchListEl.value.style.height = `${searchListEl.value.scrollHeight}px`;
};

const isSearchListNotEmpty = computed(() => {
  return works.value.length > 0 || posts.value.length > 0 || notes.value.length > 0 || pages.value.length > 0 || categories_posts.value.length > 0 || categories_notes.value.length > 0;
});

watch(isSearch, async (value) => {
  if (value) {
    await nextTick();
    setSearchListHeight();
  }
}, {
  immediate: true,
});
</script>

<template>
  <div>
    <button @click="isShowSearchModal = !isShowSearchModal">
      <Icon name="solar:magnifer-linear" size="1rem" class=" align-middle" />
    </button>
    <Teleport to="body">
      <div v-if="isShowSearchModal">
        <div class="w-5/10 fixed top-20 transform -translate-x-1/2 left-1/2 overflow-hidden z-110">
          <button @click="updatedKeywords('')" class="absolute top-3 right-3 text-gray-500 z-20 text-2xl ">
            <Icon name="solar:close-circle-bold" class="dark:hover:text-white" />
          </button>
          <label class="relative w-full h-12 flex bg-white rounded-t border c-border-secondary dark:bg-gray-800">
            <input type="text" v-model="keywords"
              class="px-10 w-full focus:outline-none focus:ring-0 focus:border-0 h-full" placeholder="搜尋網站..." />
            <Icon name="solar:magnifer-linear" class="absolute top-3.5 left-3 text-gray-500 z-10 text-lg" />
          </label>
        </div>

        <div ref="searchListEl"
          class="w-5/10 fixed top-32 transform -translate-x-1/2 left-1/2 bg-white c-border-secondary dark:bg-gray-800 rounded-b border-l border-r shadow-lg z-110 overflow-y-scroll border-b "
          :class="[{ 'p-4 border-0': isSearchListNotEmpty }, { 'max-h-120': isSearch }]">

          <!-- 作品 -->
          <AppSearchItemTitle v-if="works.length > 0" title="作品" />
          <AppSearchItemButton v-for="(work, idx) in works" :key="idx" :keywords="keywords" :title="work.title"
            icon="solar:gallery-round-bold" @handleToPage="setCloseModalAndToPage(`/works/${work.id}`)" />

          <!-- 文章 -->
          <AppSearchItemTitle v-if="posts.length > 0 || categories_posts.length > 0" title="文章" />
          <AppSearchItemButton v-for="(post, idx) in posts" :key="idx" :keywords="keywords" :title="post.title"
            :description="post.description" @handleToPage="setCloseModalAndToPage(post.path)" />
          <div v-if="categories_posts.length > 0" class="pt-1">
            <p class="text-xs ">分類</p>
            <AppSearchItemButton v-for="(posts, idx) in categories_posts" :key="idx" :keywords="keywords" :title="posts"
              @handleToPage="setCloseModalAndToPage(`/categories-posts/${posts}`)" />
          </div>

          <!-- 筆記 -->
          <AppSearchItemTitle v-if="notes.length > 0 || categories_notes.length > 0" title="筆記" />
          <AppSearchItemButton v-for="(note, idx) in notes" :key="idx" :keywords="keywords" :title="note.title"
            :description="note.description" @handleToPage="setCloseModalAndToPage(note.path)" />
          <div v-if="categories_notes.length > 0" class="pt-1">
            <p class="text-xs ">分類</p>
            <AppSearchItemButton v-for="(notes, idx) in categories_notes" :key="idx" :keywords="keywords" :title="notes"
              @handleToPage="setCloseModalAndToPage(`/categories-notes/${notes}`)" />
          </div>

          <!-- 頁面 -->
          <AppSearchItemTitle v-if="pages.length > 0" title="頁面" />
          <AppSearchItemButton v-for="(page, idx) in pages" :key="idx" icon="solar:folder-bold" :keywords="keywords"
            :title="page.title" @handleToPage="setCloseModalAndToPage(page.path)" />
        </div>

        <div @click.stop="isShowSearchModal = false" class="fixed inset-0 w-full h-full bg-black/40 z-100"></div>
      </div>
    </Teleport>
  </div>
</template>