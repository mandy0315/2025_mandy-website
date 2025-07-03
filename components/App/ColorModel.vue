<script setup lang="ts">
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
<template>
  <div>
    <ClientOnly>
      <button @click="toggleTheme" class="rounded pt-1">
        <Icon v-if="colorMode.value === 'light'" name="solar:sun-outline" class="align-middle text-xl md:text-lg" />
        <Icon v-else name="solar:moon-outline" class="align-middle text-md md:text-base" />
      </button>
    </ClientOnly>
  </div>
</template>