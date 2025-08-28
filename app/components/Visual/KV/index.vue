<script setup>
const colorMode = useColorMode()
const isRotating = ref(false)

const isDarkMode = computed(() => colorMode.value === 'dark')
// 監聽顏色模式變化
watch(colorMode, () => {
  // 觸發動畫
  isRotating.value = true

  // 動畫結束後重置狀態
  setTimeout(() => {
    isRotating.value = false
  }, 2000) // 2秒後重置，對應 CSS 動畫時間
})
</script>
<template>
  <div class="w-90 h-auto flex justify-center items-center relative">
    <NuxtImg src="/images/kv.png" class="object-contain object-center filter dark:contrast-80 relative z-10" />
    <ClientOnly>
      <div class="sky absolute -top-8 w-60 h-75 rounded-t-full overflow-hidden ">

        <div class="sky-night opacity-0 w-full h-full delay-150 duration-700 transition-opacity ease-in-out"
          :class="{ 'opacity-100': isDarkMode }">
        </div>
        <!-- sun -->
        <div class="w-40 h-40 absolute top-12 left-12 transition-transform origin-center"
          :class="{ 'animate-rotating': isRotating }">
          <div class="w-10 h-10 bg-amber-100 rounded-full"></div>
        </div>


        <!-- clouds -->
        <div class="absolute top-0 transition-opacity duration-500 delay-500"
          :class="isDarkMode ? 'opacity-0' : 'opacity-100'">
          <VisualKVCloud size="sm" class="top-15 left-22" />
          <VisualKVCloud class="top-20 left-0" />
          <VisualKVCloud size="lg" class="top-30 left-10" />
          <VisualKVCloud size="sm" class="top-15 left-50" />
        </div>
        <!-- stars -->
        <div class="absolute top-0 transition-opacity duration-500 delay-500"
          :class="isDarkMode ? 'opacity-100' : 'opacity-0'">
          <VisualKVStar size="sm" class="top-10 left-30" />
          <VisualKVStar size="lg" class="top-16 left-45" />
          <VisualKVStar size="sm" class="top-28 left-10" />
          <VisualKVStar class="top-35 left-3" />
          <VisualKVStar size="sm" class="top-45 left-10" />
          <VisualKVStar size="sm" class="top-20 left-55" />
          <VisualKVStar class="top-34 left-50" />
        </div>

      </div>
    </ClientOnly>
  </div>
</template>
<style scoped>
.sky {
  background: linear-gradient(#ffc78f, #fff8cd);
}

.sky-night {
  background: linear-gradient(#4c3f6d, #6c62bb, #93b1ed);
}
</style>