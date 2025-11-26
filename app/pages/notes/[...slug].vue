<template>
  <NuxtLayout name="post">
    <template #default>
      <PostDetail collection="notes" />
    </template>
    <template #sidebar>
      <PostDetailToc collection="notes" />
    </template>
  </NuxtLayout>
</template>
