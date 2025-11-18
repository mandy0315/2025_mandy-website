<script setup lang="ts">
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
<template>
  <BaseButton @click="toggleTheme" class="relative">
    <!-- 太陽圖示 -->
    <Icon name="solar:sun-line-duotone" class="align-middle transition-all duration-300 dark:rotate-90 dark:scale-0"
      size="1.3rem" />

    <!-- 月亮圖示 -->
    <Icon name="solar:moon-outline"
      class="absolute inset-0 m-auto transition-all duration-300 -rotate-90 scale-0 dark:rotate-0 dark:scale-100"
      size="1rem" />
  </BaseButton>
</template>