<template>
  <div class="flex c-container">
    <div class="w-60 c-sidebar-height sticky top-0">
      <slot name="sidebar" />
    </div>
    <div class="w-7/10">
      <slot />
    </div>
  </div>
</template>