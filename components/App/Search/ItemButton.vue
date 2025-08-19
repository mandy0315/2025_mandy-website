<script setup lang="ts">

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    keywords: string;
    icon?: string;
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
  <button @click="$emit('handleToPage')" class="flex group items-start text-left c-rounded-btn border-none w-full">
    <Icon :name="icon" size="1rem" class="text-gray-500 mt-1 group-hover:dark:text-white" />
    <div class="pl-2 w-8/10">
      <p v-html="keywordsHighlight(keywords, title)"></p>
      <p v-if="description" v-html="keywordsHighlight(keywords, description)" class="text-sm "></p>
    </div>
  </button>
</template>