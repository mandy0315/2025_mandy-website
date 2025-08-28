<script setup lang="ts">
withDefaults(defineProps<{
  contentText?: string
}>(), {
  contentText: '查看更多'
})
</script>
<template>
  <div class="w-full h-full">
    <!-- 內容 -->
    <div
      class="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:delay-450 group-hover:opacity-100">
      <div
        class="border-2 w-8 h-16 border-white/20 rounded-t-full p-4 flex justify-center items-center font-bold font-zen-old-mincho relative">
        <p class="absolute text-nowrap">{{ contentText }}</p>
      </div>
    </div>
    <!-- 遮罩 -->
    <div
      class="w-6 h-8 rounded-t-full bg-primary/70 
              absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              opacity-0 transition-opacity duration-150 ease-linear
              group-hover:opacity-100 
              group-hover:transition-[width,height,border-radius]
              group-hover:w-[150%] group-hover:h-[150%] group-hover:duration-300 group-hover:delay-150 group-hover:rounded-full">
    </div>
  </div>
</template>