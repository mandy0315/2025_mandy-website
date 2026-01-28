<template>
  <div class="my-6 relative group">
    <button
      class="cursor-pointer p-2 text-xl ml-auto absolute top-0 right-0 block lg:hidden lg:group-hover:inline-block"
      @click="copyToClipboard">
      <Icon v-if="isCopied" name="solar:clipboard-check-outline" />
      <Icon v-else name="solar:clipboard-text-outline" />
    </button>

    <div v-if="language !== 'plaintext'"
      class="p-2 h-10 bg-white rounded-t border border-gray-300 dark:bg-neutral-900 flex items-center ">
      <Icon v-if="language && LanguageIconList[language]" :name="LanguageIconList[language]" class="align-middle" />
      <span class="pl-2">{{ filename }}</span>
    </div>

    <pre class="mt-0 mb-0 border-gray-300 bg-neutral-100 dark:bg-neutral-800 flex items-center min-h-12"
      :class="[$props.class, language === 'plaintext' ? 'border text-black dark:text-white' : 'border-b border-l border-r rounded-t-none!']">
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
  md: 'mdi:language-markdown',
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
