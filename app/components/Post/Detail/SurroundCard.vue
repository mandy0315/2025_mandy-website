<script setup lang="ts">
withDefaults(defineProps<{
  path: string;
  idx: number;
  title: string;
  description?: string;
}>(), {
  description: '',
})

</script>
<template>
  <NuxtLink :to="path" class="flex justify-between p-4 rounded border c-border-secondary"
    :class="idx === 0 ? 'flex-row-reverse' : ''">
    <div :class="{ 'text-right': idx === 0 }">
      <p v-if="idx === 0" class=" text-sm">上一篇</p>
      <p v-else class=" text-sm">下一篇</p>

      <p>{{ title }}</p>
      <p class="text-sm">{{ description }}</p>
    </div>
    <div class="">
      <Icon v-if="idx === 0" name="solar:arrow-left-outline" size="1.5rem" />
      <Icon v-else name="solar:arrow-right-outline" size="1.5rem" />
    </div>
  </NuxtLink>
</template>
