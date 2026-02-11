<script setup lang="ts">
import { pageInfo } from "@/utils/pageInfoMap";
import { firstWordToUpper } from "@/utils/formatText";
import { onClickOutside } from '@vueuse/core';

const { isDesktop } = useResponsive();

const route = useRoute()
const isOpenMenu = useState('isOpenMenu', () => false);
const expandedMenus = ref<string[]>([]);
const config = useRuntimeConfig();
const containerRef = ref<HTMLElement | null>(null);

const pageVals = computed(() => {
  if (!config.public.SHOW_NOTES_PAGE) {
    return Array.from(pageInfo.values()).filter(item => item.name !== 'notes');
  }
  return Array.from(pageInfo.values());
});

const toggleSubMenu = (title: string) => {
  const index = expandedMenus.value.indexOf(title);
  if (index > -1) {
    expandedMenus.value.splice(index, 1);
  } else {
    expandedMenus.value = [title];
  }
};

const isExpanded = (title: string) => {
  return expandedMenus.value.includes(title);
};

const closeMenu = () => {
  isOpenMenu.value = false;
  expandedMenus.value = [];
};

const routeName = computed(() => (route.name || '') as string);

const getChildName = (words: string) => {
  return firstWordToUpper(words.split('-')[1] || words);
};

onClickOutside(containerRef, () => {
  if (isDesktop.value) {
    closeMenu();
  }
})

</script>

<template>
  <div>
    <!-- Menu only Web -->
    <nav ref="containerRef" class="lg:flex hidden gap-x-4 items-center">
      <div v-for="item in pageVals" :key="item.title"
        class="text-left font-bold font-zen-old-mincho relative max-w-full">
        <div class="flex items-center">
          <BaseLink :to="item.path" @click="closeMenu" class="cursor-pointer align-middle"
            :isAction="routeName.includes(item.name)">
            {{ item.title }} {{ firstWordToUpper(item.name) }}
          </BaseLink>
          <BaseButton v-if="item.childrens" @click="toggleSubMenu(item.title)"
            class="relative w-6 h-6 flex items-center justify-center transition-transform origin-center cursor-pointer ml-auto hover:text-primary-dark"
            :class="{ 'rotate-45': isExpanded(item.title) }"
            :isAction="routeName.includes(item.name) && routeName.includes('-')">
            +
          </BaseButton>
        </div>
        <div v-if="isExpanded(item.title) && item.childrens"
          class="absolute border c-border-secondary left-0 right-0 bg-(--bg-color) p-2 top-10 rounded z-10 shadow shadow-gray-200 dark:shadow-black">
          <BaseLink v-for="child in item.childrens" :key="child.title" :to="child.path" @click="closeMenu"
            class="py-2 text-sm transition-colors cursor-pointer whitespace-nowrap"
            :isAction="routeName.includes(child.name)">
            <p>{{ child.title }}</p>
            <p class="text-xs">{{ getChildName(child.name) }}</p>
          </BaseLink>
        </div>
      </div>
    </nav>

    <!-- Menu only Mobile -->
    <BaseButton class="block lg:hidden group" @click="isOpenMenu = !isOpenMenu">
      <p class="text-xs font-black">Menu</p>
      <div class="flex flex-col h-5 justify-between transform scale-75 ">
        <div class="w-8 h-0.5 bg-black dark:bg-white transition-all origin-left group-hover:bg-primary"
          :class="{ 'rotate-35 translate-x-2px': isOpenMenu }"></div>
        <div class="w-8 h-0.5 bg-black dark:bg-white transition-all origin-center group-hover:bg-primary"
          :class="{ 'hidden': isOpenMenu }">
        </div>
        <div class="w-8 h-0.5 bg-black dark:bg-white transition-all origin-left group-hover:bg-primary"
          :class="{ '-rotate-35 translate-x-2px': isOpenMenu }"></div>
      </div>
    </BaseButton>
    <Teleport to="body">
      <div
        class="fixed flex items-center justify-start z-100 top-0 left-0 h-full w-full transition-transform duration-700 flex-row pt-0 "
        :class="isOpenMenu ? 'translate-x-0' : 'translate-x-full'">
        <div @click.stop="isOpenMenu = false" class="w-0 md:w-3/10 bg-(--bg-color)/40 backdrop-blur-sm h-screen">
        </div>
        <nav
          class="w-full bg-(--bg-color) h-screen flex justify-center items-center flex-col md:shadow md:w-7/10 md:shadow-black">
          <div v-for="item in pageVals" :key="item.title"
            class="w-full text-left mx-auto font-bold font-zen-old-mincho">
            <div class="flex w-8/10 mx-auto py-3">
              <BaseLink :to="item.path" @click="closeMenu" class=" cursor-pointer" size="lg"
                :isAction="routeName.includes(item.name)">
                {{ item.title }} {{ firstWordToUpper(item.name) }}
              </BaseLink>
              <BaseButton v-if="item.childrens" @click="toggleSubMenu(item.title)"
                class="text-lg pl-6 transition-transform origin-center align-middle cursor-pointer ml-auto hover:text-primary"
                :class="{ 'rotate-45': isExpanded(item.title) }"
                :isAction="routeName.includes(item.name) && routeName.includes('-')">
                +
              </BaseButton>
            </div>

            <div v-if="isExpanded(item.title) && item.childrens" class="flex flex-col">
              <NuxtLink v-for="child in item.childrens" :key="child.title" :to="child.path" @click="closeMenu"
                class="py-3 cursor-pointer c-text-secondary"
                :class="routeName.includes(child.name) ? 'bg-primary/50' : 'hover:bg-primary/20'">
                <p class="w-8/10 mx-auto">{{ child.title }} {{ getChildName(child.name) }}</p>
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>
    </Teleport>
  </div>
</template>