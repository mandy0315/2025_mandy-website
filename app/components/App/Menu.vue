<script setup lang="ts">
import { pageInfo } from "@/utils/pageInfoMap";
import { firstWordToUpper } from "@/utils/formatText";
import { onClickOutside } from '@vueuse/core'

const route = useRoute()
const isOpenMenu = useState('isOpenMenu', () => false);
const expandedMenus = ref<string[]>([]);

const menuRefs = ref<Record<string, HTMLElement | null>>({});
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

const setMenuRef = (title: string, el: HTMLElement | null) => {
  if (el) {
    menuRefs.value[title] = el;
    onClickOutside(el, () => {
      // 點擊外部時關閉該選單
      const index = expandedMenus.value.indexOf(title);
      if (index > -1) {
        expandedMenus.value.splice(index, 1);
      }
    });
  }
};
</script>

<template>
  <div>
    <div class="lg:flex hidden gap-x-4 items-center">
      <div v-for="item in pageInfo.values()" :key="item.title"
        class="text-left font-bold font-zen-old-mincho relative max-w-full"
        :ref="(el) => setMenuRef(item.title, el as HTMLElement)">
        <div class="flex items-center">
          <NuxtLink :to="item.path" @click="closeMenu" class="cursor-pointer hover:text-primary align-middle"
            :class="{ 'text-primary': routeName.includes(item.name) }">
            {{ item.title }} {{ firstWordToUpper(item.name) }}
          </NuxtLink>
          <button v-if="item.childrens" @click="toggleSubMenu(item.title)"
            class="relative w-6 h-6 flex items-center justify-center transition-transform origin-center cursor-pointer ml-auto hover:text-primary"
            :class="[{ 'rotate-45': isExpanded(item.title) }, { 'text-primary': routeName.includes(item.name) && routeName.includes('-') }]">
            +
          </button>
        </div>
        <div v-if="isExpanded(item.title) && item.childrens"
          class="absolute border c-border-secondary left-0 right-0 backdrop-blur-xs dark:bg-white/10 bg-white/60 p-2 top-10 rounded z-10">
          <NuxtLink v-for="child in item.childrens" :key="child.title" :to="child.path" @click="closeMenu"
            class="block py-2 text-sm hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
            :class="{ 'text-primary': routeName.includes(child.name) }">
            <p>{{ child.title }}</p>
            <p class="text-xs">{{ getChildName(child.name) }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <button class="block lg:hidden" @click="isOpenMenu = !isOpenMenu">
      <p class="text-xs">Menu</p>
      <div class="flex flex-col h-5 justify-between transform scale-75">
        <div class="w-8 h-[2px] bg-black dark:bg-white transition-all origin-left"
          :class="{ 'rotate-35 translate-x-[2px]': isOpenMenu }"></div>
        <div class="w-8 h-[1.5px] bg-black dark:bg-white transition-all origin-center"
          :class="{ 'hidden': isOpenMenu }">
        </div>
        <div class="w-8 h-[2px] bg-black dark:bg-white transition-all origin-left"
          :class="{ '-rotate-35 translate-x-[2px]': isOpenMenu }"></div>
      </div>
    </button>
    <Teleport to="body">
      <div
        class="fixed flex items-center justify-start z-100 top-0 left-0 h-full w-full transition-transform duration-700 flex-row pt-0"
        :class="isOpenMenu ? 'translate-x-0' : 'translate-x-full'">
        <div @click.stop="isOpenMenu = false" class="w-0 md:w-3/10 bg-[var(--bg-color)]/40 backdrop-blur-sm h-screen">
        </div>
        <nav class="w-full md:w-7/10 bg-[var(--bg-color)] h-screen flex justify-center items-center flex-col">
          <div v-for="item in pageInfo.values()" :key="item.title"
            class="w-8/10 text-left mx-auto py-3 font-bold font-zen-old-mincho">
            <div class="flex">
              <NuxtLink :to="item.path" @click="closeMenu" class="text-lg cursor-pointer hover:text-primary"
                :class="{ 'text-primary': routeName.includes(item.name) }">
                {{ item.title }} {{ firstWordToUpper(item.name) }}
              </NuxtLink>
              <button v-if="item.childrens" @click="toggleSubMenu(item.title)"
                class="text-lg px-3 transition-transform origin-center align-middle cursor-pointer ml-auto hover:text-primary"
                :class="[{ 'rotate-45': isExpanded(item.title) }, { 'text-primary': routeName.includes(item.name) && routeName.includes('-') }]">
                +
              </button>
            </div>

            <div v-if="isExpanded(item.title) && item.childrens" class="pl-2">
              <NuxtLink v-for="child in item.childrens" :key="child.title" :to="child.path" @click="closeMenu"
                class="block py-2 hover:text-primary transition-colors cursor-pointer"
                :class="{ 'text-primary': routeName.includes(child.name) }">
                {{ child.title }} {{ getChildName(child.name) }}
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>
    </Teleport>
  </div>
</template>