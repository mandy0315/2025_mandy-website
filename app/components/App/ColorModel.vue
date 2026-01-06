<script setup lang="ts">
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
<template>
  <BaseButton @click="toggleTheme" class="relative mt-1 lg:mt-0.5"
    :title="colorMode.value === 'light' ? 'color-mode_light' : 'color-mode_dark'">
    <!-- 太陽圖示 -->
    <Icon name="i-solar:sun-outline"
      class="text-3xl lg:text-2xl align-middle transition-all duration-300 dark:rotate-90 dark:scale-0" />

    <!-- 月亮圖示 -->
    <Icon name="solar:moon-outline"
      class="text-2xl lg:text-lg absolute inset-0 m-auto transition-all duration-300 -rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
  </BaseButton>
</template>