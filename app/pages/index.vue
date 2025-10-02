<script setup lang="ts">
definePageMeta({
  name: 'home'
})

usePageSEO({
  title: '首頁',
})
const isToolsExpanded = ref(false);
const isSkillsExpanded = ref(false);
const { setPosts: setBlog, posts: blog } = await usePosts('blog');
const { setPosts: setNotes, posts: notes } = await usePosts('notes');
onMounted(() => {
  setBlog(1, 3);
  setNotes(1, 4)
})
</script>

<template>
  <div class="c-container">
    <div class="relative lg:flex ">
      <div class="lg:w-5/10">
        <!-- KV -->
        <section class="flex flex-col h-screen justify-center">
          <h1 class="font-zen-old-mincho font-bold text-5xl pb-6">HI～我是蔓蒂 Mandy</h1>
          <p class="text-xl">歡迎來到我的小空間，小空間<span
              class="bg-primary text-white">記錄著我的生活與技術點滴</span>，<br />希望來到這裡的大家能有所收穫，如果沒有也有好心情！</p>
        </section>

        <!-- Profiles -->
        <section class="text-xl flex flex-col h-screen justify-center">
          <div>
            <h2 class="font-zen-old-mincho font-bold px-1 text-base inline-block bg-primary text-white mb-4">個人資料
              Profiles
            </h2>
            <p class="text-4xl font-bold">蔓蒂 Mandy</p>
            <p class="py-4">
              大學畢業後，擔任設計師開始從事網頁設計相關工作，陸續工作中接觸到前端技術並產生興趣，透過線上學習與培訓班轉職前端工程師，轉職後經過了幾年洗禮，持續以自己步調精進中！
            </p>
            <hr class="c-border-secondary" />
            <div class="py-2">
              <p class="font-bold">- 喜好</p>
              <p>顏色｜淺咖啡、黃、白、淺藍</p>
              <p>興趣｜畫畫、看劇、旅遊</p>
              <p>夢想｜無憂無慮的生活每一天，是我一直的追求。</p>
            </div>
            <div class="py-2">
              <p class="font-bold">- 工具</p>
              <p :class="isToolsExpanded ? 'line-clamp-none' : 'line-clamp-1'">Adobe Illustrator / Adobe Photoshop /
                Adobe
                After Effects /
                Skitch / WordPress /
                Procreate</p>
              <BaseButton @click="isToolsExpanded = !isToolsExpanded" variant="outline" size="xs">{{
                isToolsExpanded ? '收合' : '顯示更多' }}</BaseButton>
            </div>
            <div class="py-2">
              <p class="font-bold">- 技能</p>
              <p :class="isSkillsExpanded ? 'line-clamp-none' : 'line-clamp-1'">HTML / CSS / Sass / JavaScript /
                TypeScript / Tailwind CSS / Node.js / Vue.js
                家族(Nuxt/Vue Test
                Utils/Vitest)
                / Cypress</p>
              <BaseButton @click="isSkillsExpanded = !isSkillsExpanded" variant="outline" size="xs">{{
                isSkillsExpanded ? '收合' : '顯示更多' }}</BaseButton>
            </div>
          </div>
        </section>
      </div>

      <!-- VisualKV -->
      <div
        class="hidden lg:flex lg:w-5/10 lg:sticky lg:pointer-events-none top-0 h-screen ml-auto justify-center items-center ">
        <VisualKV />
      </div>
    </div>

    <!-- Posts -->
    <section class="flex gap-x-2 py-30">
      <div class="w-1/2 h-80">
        <h2 class="font-zen-old-mincho font-bold px-1 inline-block text-base bg-primary text-white mb-4">部落格 Blog</h2>
        <div class="flex flex-col h-full" :class="blog.list.length === 3 ? 'justify-between' : 'justify-start'">
          <PostCard v-for="post in blog.list" :key="post.path" v-bind="{ ...post, isHorizontal: true }"
            class="block pb-4" />
        </div>
      </div>
      <div class="w-1/2 h-80">
        <h2 class="font-zen-old-mincho font-bold px-1 inline-block text-base bg-primary text-white mb-4">筆記 Notes</h2>
        <div class="flex flex-col h-full" :class="notes.list.length === 4 ? 'justify-between' : 'justify-start'">
          <PostItem v-for="post in notes.list" :key="post.path" v-bind="post" class="border-t c-border-secondary" />
        </div>
      </div>
    </section>

    <!-- Works -->
    <section class="relative">
      <h2
        class="font-zen-old-mincho font-bold px-1 text-base bg-primary text-white mb-4 inline-block absolute top-10 left-1/2 -translate-x-1/2">
        作品 Works</h2>
      <HomeCarousel />
    </section>
  </div>
</template>