<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to: string;
    target?: '_self' | '_blank';
    external?: boolean;
    variant?: 'outline' | 'solid' | 'underline' | 'base';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    isAction?: boolean;
  }>(),
  {
    external: false,
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
    outline: 'border border-primary text-primary bg-white/20 hover:bg-primary/70 hover:text-white active:bg-primary active:text-white rounded-4xl',
    solid: 'bg-primary/70 text-white hover:bg-primary-dark active:bg-primary active:text-white rounded-4xl',
    underline: 'underline underline-offset-3 hover:text-primary/70 active:text-primary',
    base: 'hover:text-primary/70 active:text-primary',
  }
  const actionVariantClasses = {
    outline: variantClasses.solid,
    solid: variantClasses.solid,
    underline: 'text-primary underline underline-offset-3',
    base: 'text-primary',
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
  <NuxtLink :class="linkClasses" :to :target :external>
    <slot />
  </NuxtLink>
</template>