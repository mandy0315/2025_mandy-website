<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    variant?: 'outline' | 'solid' | 'base';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    isAction?: boolean;
  }>(),
  {
    disabled: false,
    variant: 'base',
    isAction: false,
  }
);

const buttonClasses = computed(() => {
  const base = 'disabled:opacity-30 disabled:cursor-not-allowed';

  const sizeClasses = props.size ? {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }[props.size] : '';
  const paddingClasses = props.size && (props.variant === 'outline' || props.variant === 'solid') ? {
    xs: 'px-2 py-1',
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  }[props.size] : '';

  const variantClasses = {
    outline: 'border border-primary-dark dark:border-primary text-primary-dark dark:text-primary hover:bg-primary-dark/70 dark:hover:bg-primary/70 hover:text-white active:bg-primary-dark dark:active:bg-primary active:text-white rounded-4xl',
    solid: 'bg-primary-dark text-white hover:bg-primary-dark rounded-4xl',
    base: 'hover:text-primary-dark/70 dark:hover:text-primary/70 active:text-primary-dark dark:active:text-primary'
  }

  const actionVariantClasses = {
    outline: variantClasses.solid,
    solid: variantClasses.solid,
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
  <button :class="buttonClasses" :disabled>
    <slot />
  </button>
</template>