<script setup>
import KVImage from '@/assets/images/home/kv.png'
const colorMode = useColorMode()
const isRotating = ref(false)

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
  <ClientOnly>
    <div class="w-90 h-auto flex justify-center items-center relative">
      <img :src="KVImage" class="object-contain object-center filter dark:contrast-80 relative z-10" />
      <div class="sky absolute -top-8 w-60 h-75 rounded-t-full overflow-hidden ">
        <div class="sky-night opacity-0 w-full h-full delay-150 duration-700 transition-opacity ease-in-out"
          :class="{ 'opacity-100': colorMode.value === 'dark' }">
        </div>
        <!-- sun -->
        <div class="w-40 h-40 absolute top-12 left-12 transition-transform origin-center"
          :class="{ 'animate-rotating': isRotating }">
          <div class="w-10 h-10 bg-amber-100 rounded-full"></div>
        </div>

      </div>
    </div>
  </ClientOnly>


</template>
<style scoped>
.sky {
  background: linear-gradient(#ffc78f, #fff8cd);
}

.sky-night {
  background: linear-gradient(#4c3f6d, #6c62bb, #93b1ed);
}
</style>