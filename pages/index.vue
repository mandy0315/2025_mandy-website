<script setup lang="ts">
usePageSEO({
  title: '首頁',
})

const kvDirectionsRef = ref<HTMLElement | null>(null);
</script>

<template>
  <section
    class="flex flex-col justify-center w-8/10 min-h-[30vh] mx-auto lg:w-4/10 lg:min-h-screen lg:pl-16 lg:mx-0 lg:mr-auto">
    <h1>kv</h1>
    <p ref="kvDirectionsRef">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quia inventore deserunt sint
      quaerat
      praesentium,
      blanditiis nam unde. Repellendus et sapiente voluptates laborum omnis earum ullam quaerat, molestiae neque
      laudantium.</p>
  </section>
  <div
    class="w-full min-h-[65vh] bg-c-image-gray lg:fixed lg:top-0 lg:right-[var(--spacing-c-web-header-width)] lg:m-h-auto lg:h-screen lg:w-5/10 lg:z-10">
    image
  </div>
  <section class="py-40">
    <h2>profile</h2>
  </section>
  <section class="py-40 bg-[var(--bg-color)] relative z-20">
    <h2>topics</h2>
  </section>
  <section class="py-40 bg-[var(--bg-color)] relative z-20">
    <h2>works</h2>
  </section>
</template>