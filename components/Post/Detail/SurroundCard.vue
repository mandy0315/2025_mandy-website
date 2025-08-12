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
  <BaseLink :to="path" class="flex justify-between p-4 rounded c-rounded-btn"
    :class="idx === 0 ? 'flex-row-reverse' : ''">
    <div :class="{ 'text-right': idx === 0 }">
      <p v-if="idx === 0" class="c-text-gray text-sm">上一篇</p>
      <p v-else class="c-text-gray text-sm">下一篇</p>

      <p>{{ title }}</p>
      <p class="text-sm">{{ description }}</p>
    </div>
    <div class="c-text-gray">
      <Icon v-if="idx === 0" name="solar:arrow-left-outline" size="1.5rem" />
      <Icon v-else name="solar:arrow-right-outline" size="1.5rem" />
    </div>
  </BaseLink>
</template>
