<script setup lang="ts">

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    keywords: string;
    icon?: 'solar:file-text-bold' | 'solar:folder-bold';
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
  const reg = new RegExp(keywords, 'g');
  if (!reg.test(text)) return text;
  return text.replace(reg, `<mark>${keywords}</mark>`);
};
</script>
<template>
  <button @click="$emit('handleToPage')" class="flex group items-start text-left c-rounded-btn border-none w-full">
    <Icon :name="icon" class="text-gray-500 text-lg mt-1 group-hover:dark:text-white" />
    <div class="ml-2">
      <p v-html="keywordsHighlight(keywords, title)"></p>
      <p v-if="description" v-html="keywordsHighlight(keywords, description)" class="text-sm c-text-gray"></p>
    </div>
  </button>
</template>