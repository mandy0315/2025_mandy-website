<template>
  <NuxtLayout name="error">
    <div class="max-w-2xl mx-auto py-10">
      <img class="w-full" src="/images/404-twin.png" alt="404圖">
    </div>
    <h1 class="text-2xl c-text-secondary text-center font-zen-old-mincho font-bold pb-1">
      你迷路了嘛～ <span class="block lg:inline">我們回到" <BaseLink variant="underline" to="/">首頁</BaseLink><span
          class="text-lg pl-2">(Home)</span>
        "吧！</span>
    </h1>
    <p class="text-center c-text-secondary">The page you're looking for was not found,<span class="block lg:inline">go
        back to home.</span>
    </p>
  </NuxtLayout>
</template>