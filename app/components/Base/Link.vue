<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to: string;
    target?: '_self' | '_blank';
    variant?: 'outline' | 'solid' | 'underline' | 'base';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    isAction?: boolean;
  }>(),
  {
    target: '_self',
    variant: 'base',
    isAction: false,
  }
);

const linkClasses = computed(() => {
  const base = 'inline-block transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeClasses = props.size ? {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }[props.size] : '';

  // 只有 outline 和 solid 需要 padding
  const paddingClasses = props.size && (props.variant === 'outline' || props.variant === 'solid') ? {
    xs: 'px-2 py-1',
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  }[props.size] : '';

  const variantClasses = {
    outline: 'border border-primary-dark dark:border-primary text-primary-dark dark:text-primary hover:bg-primary-dark/70 dark:hover:bg-primary/70 hover:text-white active:bg-primary-dark dark:active:bg-primary active:text-white rounded-4xl',
    solid: 'bg-primary-dark text-white hover:bg-primary-dark/70 active:bg-primary-dark active:text-white rounded-4xl',
    underline: 'underline underline-offset-3 hover:text-primary-dark dark:hover:text-primary active:text-primary-dark dark:active:text-primary',
    base: 'hover:text-primary-dark/70 dark:hover:text-primary/70 active:text-primary-dark dark:active:text-primary',
  }
  const actionVariantClasses = {
    outline: variantClasses.solid,
    solid: variantClasses.solid,
    underline: 'text-primary-dark underline underline-offset-3 dark:text-primary',
    base: 'text-primary-dark dark:text-primary',
  }
  return [
    base,
    sizeClasses,
    paddingClasses,
    props.isAction ? actionVariantClasses[props.variant] : variantClasses[props.variant],
  ].join(' ');
});

</script>

<template>
  <NuxtLink :class="linkClasses" :to :target :rel="target === '_blank'
    ? 'noopener noreferrer'
    : undefined">
    <slot />
  </NuxtLink>
</template>