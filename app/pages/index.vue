<script setup lang="ts">
usePageSEO({
  title: '首頁',
  path: '/',
})

// 個人介紹
const isToolsExpanded = ref(false);
const isSkillsExpanded = ref(false);
const tools = [
  'Adobe Illustrator', 'Adobe Photoshop', 'Adobe After Effects', 'Skitch', 'WordPress', 'Procreate'
];
const toolsDisplay = computed(() => {
  return isToolsExpanded.value ? tools.join(' / ') : tools.slice(0, 3).join(' / ') + ' / ...';
});
const skills = [
  'HTML', 'CSS', 'Sass', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vue.js ( Nuxt / Vue Test Utils / Vitest ) ', 'Cypress'
];
const skillsDisplay = computed(() => {
  return isSkillsExpanded.value ? skills.join(' / ') : skills.slice(0, 5).join(' / ') + ' / ...';
});


// 文章
const { posts: blog } = await usePosts('blog', 6);
</script>

<template>
  <div>
    <div class="relative c-container lg:flex">
      <div class="pt-30 lg:pt-0 lg:w-5/10">
        <!-- KV -->
        <section class="flex flex-col pb-12 lg:pb-0 lg:h-screen justify-center">
          <h1 class="font-zen-old-mincho font-bold text-4xl pb-6 lg:text-5xl">HI～我是敏佳 Mandy</h1>
          <p class="text-xl">歡迎來到我的小空間，小空間<span
              class="bg-primary-dark text-white mx-2">記錄著我的生活點滴</span>，希望來到這裡的大家能有所收穫，如果沒有也有好心情！</p>
        </section>
        <!-- HomeKV -->
        <div class="w-full flex justify-center pb-20 lg:hidden">
          <HomeKV />
        </div>

        <!-- Profiles -->
        <section class="text-lg flex flex-col pb-20 lg:text-xl lg:h-screen justify-center">
          <div>
            <HomeTitle>個人資料 Profiles</HomeTitle>
            <p class="font-zen-old-mincho text-4xl lg:text-5xl font-bold">敏佳</p>
            <p class="py-4">
              大學畢業後，擔任設計師開始從事網頁設計相關工作，陸續工作中接觸到前端技術並產生興趣，透過線上學習與培訓班轉職前端工程師，轉職後經過了幾年洗禮，持續以自己步調精進中！
            </p>
            <hr class="border-secondary/50 dark:border-secondary-light/50" />
            <div class="py-2">
              <p class="font-bold">- 喜好</p>
              <p>顏色｜淺咖啡、黃、白、淺藍</p>
              <p>興趣｜畫畫、看劇、旅遊</p>
              <p>夢想｜無憂無慮的生活每一天，是我一直的追求。</p>
            </div>
            <div class="py-2">
              <p class="font-bold">- 工具</p>
              <p>{{ toolsDisplay }}</p>
              <BaseButton @click="isToolsExpanded = !isToolsExpanded" variant="outline" size="xs">{{
                isToolsExpanded ? '收合' : '顯示更多' }}</BaseButton>
            </div>
            <div class="py-2">
              <p class="font-bold">- 技能</p>
              <p>{{ skillsDisplay }}</p>
              <BaseButton @click="isSkillsExpanded = !isSkillsExpanded" variant="outline" size="xs">{{
                isSkillsExpanded ? '收合' : '顯示更多' }}</BaseButton>
            </div>
          </div>
        </section>
      </div>

      <!-- HomeKV web -->
      <div
        class="hidden lg:flex lg:w-5/10 lg:sticky lg:pointer-events-none top-0 h-screen ml-auto justify-center items-center">
        <HomeKV />
      </div>
    </div>

    <!-- Posts -->
    <section class="bg-primary/20 rounded-4xl mb-20">
      <div class="c-container py-10">
        <HomeTitle>最新文章 New Posts</HomeTitle>
        <div class="grid grid-cols-1 h-full sm:grid-cols-2 lg:gap-8 lg:grid-cols-3">
          <PostCard v-for="post in blog.list" :key="post.path" v-bind="post" class="pb-4" />
        </div>
        <div class="flex justify-center">
          <BaseLink to="/blog" variant="outline" class="w-60 text-center" size="lg">
            查看更多文章
          </BaseLink>
        </div>
      </div>
    </section>

    <!-- Works -->
    <section class="relative c-container">
      <HomeTitle class="absolute top-10 left-1/2 -translate-x-1/2">作品 Works</HomeTitle>
      <HomeCarousel />
    </section>
  </div>
</template>