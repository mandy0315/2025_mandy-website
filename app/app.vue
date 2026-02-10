<script setup lang="ts">
const { isShowSearchModal } = await useSearch();
const isOpenMenu = useState('isOpenMenu', () => false);
const isOpenImgModal = useState<boolean>('isOpenImgModal', () => false);

const isLocked = computed(() => isShowSearchModal.value || isOpenMenu.value || isOpenImgModal.value);
</script>

<template>
  <Body :class="{ 'overflow-hidden': isLocked }">
    <AppPageLoading />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
