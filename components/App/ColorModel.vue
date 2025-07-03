<script setup lang="ts">
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
<template>
  <div>
    <ClientOnly>
      <button @click="toggleTheme" class="rounded pr-2 lg:pr-0">
        <Icon v-if="colorMode.value === 'light'" size="1.2rem" name="solar:sun-outline" class="align-middle" />
        <Icon v-else size="1.2rem" name="solar:moon-outline" class="align-middle" />
      </button>
    </ClientOnly>
  </div>
</template>