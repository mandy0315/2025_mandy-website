<template>
  <div class="my-6 group relative">
    <button class="hidden cursor-pointer p-2 text-xl ml-auto group-hover:inline-block absolute top-0 right-0"
      @click="copyToClipboard">
      <Icon v-if="isCopied" name="solar:clipboard-check-outline" />
      <Icon v-else name="solar:clipboard-text-outline" />
    </button>

    <div v-if="language !== 'plaintext'"
      class="p-2 h-10 bg-gray-200/20 rounded-t border border-gray-300 dark:bg-black/50">
      <Icon v-if="language && LanguageIconList[language]" :name="LanguageIconList[language]"
        class="align-middle text-sm" />
      <span class="pl-2">{{ filename }}</span>
    </div>

    <pre class="!my-0 border-gray-300 block max-h-96 overflow-auto"
      :class="[$props.class, language === 'plaintext' ? 'border text-black dark:text-white' : 'border-b border-l border-r !rounded-t-none']">
      <slot />
    </pre>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  code?: string;
  language?: LanguageIconKey | null;
  filename?: string | null;
  highlights?: number[] | null;
  meta?: string | null;
  class?: string | null;
}>(), {
  code: '',
  language: null,
  filename: null,
  highlights: null,
  meta: null,
  class: null,
})

type LanguageIconKey = keyof typeof LanguageIconList;
const LanguageIconList = {
  plaintext: '',
  javascript: 'logos:javascript',
  typescript: 'logos:typescript-icon',
  html: 'vscode-icons:file-type-html',
  css: 'vscode-icons:file-type-css',
  scss: 'vscode-icons:file-type-scss',
  vue: 'logos:vue',
  react: 'logos:react',
  nodejs: 'logos:nodejs',
} as const;

const isCopied = ref(false);
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    isCopied.value = true;

    // 2秒後重置按鈕狀態
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('無法複製內容: ', err);
  }
};
</script>
