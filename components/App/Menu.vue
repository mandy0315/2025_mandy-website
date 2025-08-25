<script setup lang="ts">
import { pageInfo } from "@/utils/pageInfoMap";

const route = useRoute()
const isOpenMenu = useState('isOpenMenu', () => false);
const expandedMenus = ref<string[]>([]);

const toggleSubMenu = (title: string) => {
  const index = expandedMenus.value.indexOf(title);
  if (index > -1) {
    expandedMenus.value.splice(index, 1);
  } else {
    expandedMenus.value.push(title);
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

const firstWordToUpperCase = (words: string) => {
  if (words.length < 1) return words;
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const getChildName = (words: string) => {
  return firstWordToUpperCase(words.split('-')[1] || words);
};
</script>
<template>
  <div>
    <button @click="isOpenMenu = !isOpenMenu">
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
        class="fixed flex items-center justify-start z-100 top-0 left-0 h-full w-full transition-transform duration-700  flex-row pt-0"
        :class="isOpenMenu ? 'translate-x-0' : 'translate-x-full'">
        <button @click="isOpenMenu = false" class="w-7/10 bg-[var(--bg-color)]/40 backdrop-blur-sm h-screen"></button>
        <nav class="w-3/10 bg-[var(--bg-color)] h-screen flex  justify-center items-center flex-col">
          <div v-for="item in pageInfo.values()" :key="item.title"
            class="w-8/10 text-left mx-auto py-3 font-bold font-zen-old-mincho">
            <div class="flex">
              <NuxtLink :to="item.path" @click="closeMenu" class=" cursor-pointer hover:text-primary"
                :class="{ 'text-primary': routeName.includes(item.name) }">
                {{ firstWordToUpperCase(item.name) }} {{ item.title }}
              </NuxtLink>
              <button v-if="item.childrens" @click="toggleSubMenu(item.title)"
                class="text-lg px-3 transition-transform origin-center align-middle cursor-pointer ml-auto hover:text-primary"
                :class="[{ 'rotate-45': isExpanded(item.title) }, { 'text-primary': routeName.includes(item.name) && routeName.includes('-') }]">
                +
              </button>
            </div>

            <div v-if="isExpanded(item.title) && item.childrens" class="pl-2">
              <NuxtLink v-for="child in item.childrens" :key="child.title" :to="child.path" @click="closeMenu"
                class="block py-2 text-sm hover:text-primary transition-colors cursor-pointer"
                :class="{ 'text-primary': routeName.includes(child.name) }">
                {{ getChildName(child.name) }} {{ child.title }}
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>
    </Teleport>
  </div>

</template>