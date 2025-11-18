<script setup lang="ts">
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
<template>
  <ClientOnly>
    <BaseButton @click="toggleTheme">
      <Icon v-if="colorMode.value === 'light'" name="solar:sun-line-duotone" class=" align-middle" size="1.3rem" />
      <Icon v-else name="solar:moon-outline" class=" align-middle" size="1rem" />
    </BaseButton>
  </ClientOnly>
</template>