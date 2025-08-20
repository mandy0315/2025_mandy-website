<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to: string;
    target?: '_self' | '_blank';
    external?: boolean;
    variant?: 'outline' | 'solid' | 'underline';
    size?: 'xs' | 'sm' | 'md' | 'lg';
  }>(),
  {
    external: false,
    target: '_self',
    variant: 'outline',
    size: 'md',
  }
);

const linkClasses = computed(() => {
  const base = 'inline-block transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    outline: 'border border-primary text-primary bg-white/20 hover:bg-primary/70 hover:text-white active:bg-primary active:text-white rounded-4xl',
    solid: 'bg-primary/70 text-white hover:bg-primary-dark active:bg-primary active:text-white rounded-4xl',
    underline: 'underline underline-offset-3 hover:text-primary/70 active:text-primary',
  }
  return [
    base,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ].join(' ');
});

</script>

<template>
  <NuxtLink :class="linkClasses" :to :target :external>
    <slot />
  </NuxtLink>
</template>