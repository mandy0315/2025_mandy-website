<script setup lang="ts">
import ItemTitle from '@/components/App/Search/ItemTitle.vue';
import ItemButton from '@/components/App/Search/ItemButton.vue';
import { watchDebounced } from '@vueuse/core';

const { isDesktop } = useResponsive();
const { isSearch, keywords, isShowSearchModal, blog, notes, pages, blogCategories, notesCategories, blogTags, notesTags, works, updateSearchList } = await useSearch();
watchDebounced(
  keywords,
  () => {
    updateSearchList();
  },
  { debounce: 400 }
);
onMounted(() => {
  updateSearchList();
});

const setCloseModalAndToPage = async (path: string) => {
  await navigateTo(path);

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

watch(isSearch, async (value) => {
  if (isDesktop.value && value) {
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
        <div class="w-9/10 top-8 lg:w-5/10 fixed lg:top-20 transform -translate-x-1/2 left-1/2 overflow-hidden z-110">
          <button @click="isShowSearchModal = false"
            class="absolute top-3 right-3 c-text-secondary z-20 text-2xl rotate-45 origin-center">
            ＋
          </button>
          <label class="relative w-full h-12 flex bg-[var(--bg-color)] rounded-t border c-border-secondary ">
            <input type="text" v-model="keywords"
              class="px-10 w-full focus:outline-none focus:ring-0 focus:border-0 h-full" placeholder="搜尋網站..." />
            <Icon name="solar:magnifer-linear" class="absolute top-3.5 left-3 text-gray-500 z-10 text-lg" />
          </label>
        </div>

        <div ref="searchListEl"
          class="w-9/10 top-20 lg:w-5/10 fixed lg:top-32 transform -translate-x-1/2 left-1/2 bg-[var(--bg-color)] c-border-secondary rounded-b border-l border-r shadow-lg z-110 overflow-y-scroll border-b h-[calc(100vh-7rem)] lg:max-h-120">

          <!-- 頁面 -->
          <template v-if="pages.length > 0">
            <div class="px-2">
              <ItemTitle titleEn="pages" title="頁面" />
              <ItemButton v-for="(page, idx) in pages" :key="idx" icon="solar:folder-bold" :keywords="keywords"
                :title="page.title" @handleToPage="setCloseModalAndToPage(page.path)" />
            </div>
            <hr class="c-border-secondary">
            </hr>
          </template>

          <!-- 作品 -->
          <template v-if="works.length > 0">
            <div class="px-2">
              <ItemTitle titleEn="works" title="作品" />
              <ItemButton v-for="(work, idx) in works" :key="idx" :keywords="keywords" :title="work.title"
                icon="solar:gallery-round-bold" :category="work.category"
                @handleToPage="setCloseModalAndToPage(`/works/${work.path}`)" />
            </div>

            <hr class="c-border-secondary">
            </hr>
          </template>

          <!-- 部落格 -->
          <template v-if="blog.length > 0 || blogCategories.length > 0 || blogTags.length > 0">
            <div class="px-2">
              <ItemTitle titleEn="blog" title="部落格" />
              <ItemButton v-for="(post, idx) in blog" :key="idx" :keywords="keywords" :title="post.title"
                :description="post.description" @handleToPage="setCloseModalAndToPage(post.path)" />
              <!-- 分類 -->
              <template v-if="blogCategories.length > 0">
                <ItemTitle titleEn="categories" title="分類" class="c-text-secondary" />
                <ItemButton v-for="(category, idx) in blogCategories" :key="idx" icon="solar:folder-bold"
                  :keywords="keywords" :title="category"
                  @handleToPage="setCloseModalAndToPage(`/blog/categories/${category}`)" />
              </template>
              <!-- 標籤 -->
              <template v-if="blogTags.length > 0">
                <ItemTitle titleEn="tags" title="標籤" class="c-text-secondary" />
                <ItemButton v-for="(tag, idx) in blogTags" :key="idx" icon="solar:folder-bold" :keywords="keywords"
                  :title="tag" @handleToPage="setCloseModalAndToPage(`/blog/tags/${tag}`)" />
              </template>
            </div>

            <hr class="c-border-secondary">
            </hr>
          </template>

          <!-- 筆記 -->
          <template v-if="notes.length > 0 || notesCategories.length > 0 || notesTags.length > 0">
            <div class="px-2">
              <ItemTitle titleEn="notes" title="筆記" />
              <ItemButton v-for="(note, idx) in notes" :key="idx" :keywords="keywords" :title="note.title"
                :description="note.description" @handleToPage="setCloseModalAndToPage(note.path)" />

              <!-- 分類 -->
              <template v-if="notesCategories.length > 0">
                <ItemTitle titleEn="categories" title="分類" class="c-text-secondary" />
                <ItemButton v-for="(category, idx) in notesCategories" :key="idx" icon="solar:folder-bold"
                  :keywords="keywords" :title="category"
                  @handleToPage="setCloseModalAndToPage(`/notes/categories/${category}`)" />
              </template>
              <!-- 標籤 -->
              <template v-if="notesTags.length > 0">
                <ItemTitle titleEn="tags" title="標籤" class="c-text-secondary" />
                <ItemButton v-for="(tag, idx) in notesTags" :key="idx" icon="solar:folder-bold" :keywords="keywords"
                  :title="tag" @handleToPage="setCloseModalAndToPage(`/notes/tags/${tag}`)" />
              </template>
            </div>
          </template>
        </div>

        <div @click.stop="isShowSearchModal = false" class="fixed inset-0 w-full h-full bg-black/40 z-100"></div>
      </div>
    </Teleport>
  </div>
</template>