<template>
  <div class="flex c-container">
    <div class="w-60 px-4 c-sidebar-height sticky top-0 overflow-hidden">
      <slot name="sidebar" />
    </div>
    <div class="w-7/10">
      <slot name="content" />
    </div>
  </div>
</template>