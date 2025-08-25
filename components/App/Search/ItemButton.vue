<script setup lang="ts">

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    keywords: string;
    icon?: string;
    category?: string;
  }>(),
  {
    icon: 'solar:file-text-bold',
    description: '',
  }
);
defineEmits<{
  handleToPage: []
}>();

const keywordsHighlight = (keywords: string, text: string) => {
  if (!keywords || keywords.trim() === '') return text;

  // 跳脫特殊正規表達式字元
  const escapedKeywords = keywords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reg = new RegExp(escapedKeywords, 'gi');
  if (!reg.test(text)) return text;

  return text.replace(reg, `<mark>$&</mark>`); // 使用 $& 保留原始匹配的大小寫
};
</script>
<template>
  <button @click="$emit('handleToPage')"
    class="flex group rounded my-1 items-center text-left border-none w-full p-1 hover:bg-primary/20 text-sm">
    <div class="w-4">
      <Icon :name="icon" class="text-gray-500 w-full mt-1 group-hover:dark:text-white" />
    </div>
    <div v-if="category" class="ml-1 text-xs px-1 bg-primary/30 text-primary">{{ category }}</div>
    <p class="pl-2 grow line-clamp-1">
      <span v-html="keywordsHighlight(keywords, title)" class="pr-1"></span>
      <span v-if="description" v-html="keywordsHighlight(keywords, description)" class="c-text-secondary"></span>
    </p>
  </button>
</template>