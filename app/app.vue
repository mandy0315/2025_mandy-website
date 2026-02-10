<script setup lang="ts">
const { isShowSearchModal } = await useSearch();
const isOpenMenu = useState('isOpenMenu', () => false);
</script>

<template>
  <Body :class="{ 'overflow-hidden': isShowSearchModal || isOpenMenu }">
    <AppPageLoading />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
