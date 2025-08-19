<script setup lang="ts">
usePageSEO({
  title: '首頁',
})

</script>

<template>
  <!-- 容器：限制 sticky 的作用範圍 -->
  <div class="relative lg:flex lg:min-h-[200vh]">

    <div class="lg:w-5/10">
      <section class="lg:flex lg:flex-col lg:justify-center lg:h-screen lg:px-16">
        <h1>kv</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing
          elit...</p>
        <div>
          <BaseButton size="lg">線條按鈕</BaseButton>
          <BaseButton>線條按鈕</BaseButton>
          <BaseButton size="sm">線條按鈕</BaseButton>

        </div>
        <div>
          <BaseButton size="lg" variant="solid">實體按鈕</BaseButton>
          <BaseButton variant="solid">實體按鈕</BaseButton>
          <BaseButton size="sm" variant="solid">實體按鈕</BaseButton>
        </div>
      </section>

      <div class="lg:hidden">
        <VisualKV />
      </div>

      <!-- profile 段落 -->
      <section class="lg:flex lg:flex-col lg:h-screen lg:px-16">
        <h2 class="font-zen-old-mincho">profile</h2>
        <p>這裡是 profile 內容...</p>
      </section>
    </div>

    <!-- 右側圖片：sticky 只在這個容器內有效 -->
    <div
      class="hidden lg:flex lg:w-5/10 lg:sticky lg:pointer-events-none top-0 h-screen ml-auto justify-center items-center ">
      <VisualKV />
    </div>
  </div>

  <section class="py-40 relative z-20">
    <h2>topics</h2>
  </section>

  <section class="py-40 relative z-20">
    <h2>works</h2>
  </section>
</template>