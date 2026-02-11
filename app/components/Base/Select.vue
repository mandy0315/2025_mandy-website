<script setup lang="ts">
withDefaults(
  defineProps<{
    labelTitle?: string;
    options: { value: string; label: string }[];
  }>(),
  {
    labelTitle: '',
  }
);
const value = defineModel<string>({
  required: true
})
</script>
<template>
  <label class="inline-block text-lg lg:text-sm text-secondary dark:text-secondary-dark select-none">
    <span class="pr-2">{{ labelTitle }}</span>
    <select v-model="value" class="border border-secondary/50 dark:border-secondary-light/50 rounded py-1 px-4 lg:px-2">
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
    </select>
  </label>
</template>