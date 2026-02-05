<script setup lang="ts">
import { getAssetPath } from '@/utils/assetPath';

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

const processedSrc = computed(() => getAssetPath(props.src));
const isOpenModal = ref(false);
</script>
<template>
  <div @click="isOpenModal = true" class="my-5">
    <img :src="processedSrc" :alt :width :height class="pb-2 mb-0 mt-0" />
    <span v-if="alt" class="font-bold pl-2">{{ alt }}</span>
  </div>
  <Teleport to="body">
    <div v-if="isOpenModal" @click="isOpenModal = false"
      class="fixed inset-0 z-200 bg-black/60 flex items-center justify-center p-4">
      <div @click.stop class="relative max-w-9/10 lg:max-w-200 max-h-full">
        <button @click="isOpenModal = false"
          class="absolute z-12 -top-2 -right-2 w-8 h-8 bg-primary rounded-full box-border">
          <Icon name="material-symbols:close-rounded" size="1.5rem" class="text-white mx-auto align-middle" />
        </button>
        <img :src="processedSrc" :alt :width :height class="w-full h-auto shadow-lg max-h-[80vh] object-contain" />
        <p v-if="alt" class="font-bold py-2 text-2xl flex justify-center text-white">{{ alt }}</p>
      </div>
    </div>
  </Teleport>
</template>
