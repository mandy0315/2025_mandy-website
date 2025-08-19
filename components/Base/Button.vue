<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    variant?: 'outline' | 'solid';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    disabled: false,
    variant: 'outline',
    size: 'md',
  }
);

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-4xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    outline: 'border border-primary text-primary bg-white/20 hover:bg-primary/70 hover:text-white active:bg-primary active:text-white',
    solid: 'bg-primary/70 text-white hover:bg-primary-dark active:bg-primary active:text-white',
  }
  return [
    base,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ].join(' ');
});

</script>

<template>
  <button :class="buttonClasses" :disabled>
    <slot />
  </button>
</template>