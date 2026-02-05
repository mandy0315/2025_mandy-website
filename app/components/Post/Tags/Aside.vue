<script setup lang="ts">
import { isDesktop } from '@/utils/responsive';

const props = defineProps<{
  collection: 'blog' | 'notes';
}>();

const { tags } = await useTag(props.collection);
const route = useRoute();

const isExpanded = ref(false);
const config = useRuntimeConfig();

const isShowNotesPage = computed(() => config.public.SHOW_NOTES_PAGE);
const currentTag = computed(() => {
  const tag = (route.params?.tag) as string || '';
  return decodeURIComponent(tag);
});
const isShowSidebar = computed(() => isDesktop.value ? true : isExpanded.value)

const goToTagsPage = async (tag: string) => {
  await navigateTo(`/${props.collection}/tags/${tag}`);
};
const { scrollTo, containerRef, targetRefs } = useScrollToTarget();
onMounted(async () => {
  void containerRef; // 用於模板中的 ref="containerRef"
  void targetRefs; // 用於模板中的 ref="targetRefs"
  await scrollTo(currentTag.value);
})
</script>

<template>
  <aside class="h-full border-y c-border-secondary lg:border-none">
    <BaseButton @click="isExpanded = !isExpanded" class="py-2 px-4 flex items-center w-full lg:hidden"
      :isAction="isExpanded">
      <p>
        <Icon name="i-solar:hamburger-menu-bold" size="1.2rem" class="align-middle" />
        {{ collection === 'blog' ? '部落格標籤' : '筆記標籤' }}
      </p>
      <p class="text-lg ml-auto px-3 transition-transform origin-center align-middle cursor-pointer"
        :class="{ 'rotate-45': isExpanded }">
        +
      </p>
    </BaseButton>
    <div v-if="isShowSidebar" class="bg-primary/10 py-2 px-3 lg:bg-transparent lg:pl-0 lg:py-0 lg:pr-4 lg:h-full">
      <div v-if="isDesktop" class="h-8">
        <BaseLink variant="outline" to="/blog/tags" size="xs" class="rounded-t-sm rounded-b-none border-b-0 mr-1"
          :isAction="collection === 'blog'">
          部落格標籤</BaseLink>
        <BaseLink v-if="isShowNotesPage" variant="outline" to="/notes/tags" size="xs"
          class="rounded-t-sm rounded-b-none border-b-0" :isAction="collection === 'notes'">
          筆記標籤</BaseLink>
        <div class="border-b c-border-secondary border-dashed"></div>
      </div>
      <ul ref="containerRef" class="overflow-y-auto h-[calc(100%-2rem)]">
        <li ref="targetRefs" v-for="tag in tags" :key="tag" class="inline-block mr-1 mb-1">
          <BaseButton variant="outline" class="text-sm px-2 py-1 lg:text-xs" @click="goToTagsPage(tag)"
            :isAction="currentTag === tag">
            {{ tag }}
          </BaseButton>
        </li>
        <li v-if="isDesktop" class="border-b c-border-secondary border-dashed mb-2"></li>
      </ul>
    </div>
  </aside>
</template>