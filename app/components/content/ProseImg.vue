<template>
  <img :src="processedSrc" :alt :width :height />
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const { getAssetPath } = useAssetPath();
const processedSrc = computed(() => getAssetPath(props.src));
</script>