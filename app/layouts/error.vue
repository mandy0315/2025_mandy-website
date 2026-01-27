<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="c-container mt-24 flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>

</template>