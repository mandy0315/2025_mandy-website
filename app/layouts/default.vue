<script setup lang="ts">
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="lg:flex-1 mt-24">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>