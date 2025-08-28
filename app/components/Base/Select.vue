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
  <label class="inline-block text-sm text-secondary-light dark:text-secondary-dark select-none">
    <span class="pr-2">{{ labelTitle }}</span>
    <select v-model="value" class="border c-border-secondary rounded py-1 px-2 ">
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
    </select>
  </label>
</template>